// React/Redux/API imports
var React = require('react');
var {connect} = require('react-redux');
var ohwtAPI = require('ohwtAPI');
var actions = require('actions');

// Component Imports
var FeatureDetails = require('FeatureDetails').default;

// UI imports
import { StickyContainer, Sticky } from 'react-sticky';
var Modal = require('react-modal');

var Walkthru = React.createClass({
    // Authentication
    componentWillMount : function() {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },
    // More authentication
    componentWillUpdate : function(nextProps, nextState) {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },

    // As list is dynamic, need to get height of page, so styles can
    // be applied correctly
    componentDidMount : function() {
        const height = document.getElementById('needHeight').clientHeight;
        var modalOpen = this.state.modalOpen;
        // update state with proper values
        this.setState({height : height, modalOpen : modalOpen});
    },
    // Set the initial values of state
    getInitialState : function() {
        return {height : 0, modalOpen : false};
    },
    openModal : function() {
        var height = this.state.height;
        var feature = this.refs.feature;
        // if they typed in a feature, open the modal, otherwise focus on the input box
        if (feature.value.length > 0) {
            this.setState({height : height, modalOpen : true, featureValue : feature.value});
            feature.value = '';
        } else {
            feature.focus();
        }
    },
    closeModal: function() {
        // if they click outside the modal, or hit close button, close the modal
        var height = this.state.height;
        this.setState({height : height, modalOpen: false});
    },
    render: function(){
        var {houses, dispatch} = this.props;
        var id = this.props.params.id;
        // find the current house, so you can create links for it
        var house = ohwtAPI.findHouseById(houses, id);
        const HOUSE_URL = "/houseprofile/" + id;
        var checklist = house.checklist;
        var heightObject = this.state;
        var height = 0;
        // for when they update the priority of the added feature
        var priorityChanged = (e) => {
            var priority = e.currentTarget.value;
            var feature = this.state.featureValue;
            dispatch(actions.startAddChecklist(id, feature, priority));
            this.closeModal();
        };
        const customStyles = {
          content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
          }
        };
        if (heightObject != null) {
            height = heightObject.height;
        }
        return(
            <div className='walkthru columns'>
                <StickyContainer className="columns" style={{height : height}}>
                    <div className='small-9 columns' id="needHeight">
                        <div className="row small-up-2 medium-up-3">
                            <h1>Walkthru for {house.address}</h1>
                            {/*A for loop for all features related to that house*/}
                            {checklist.map((feature) => {
                                return (
                                    <FeatureDetails key={feature.id} checklistId={feature.id} houseId={id} rating={feature.rating} priority={feature.priority} feature={feature.feature} comments={feature.comments} picture={feature.picture} numPics={feature.numPics} house={house}/>
                                )
                            })}
                        </div>
                    </div>
                    {/*Modal content*/}
                    <div className="small-3 columns">
                        <Sticky topOffset={40}>
                            <div className='columns' style={{"marginTop" : "1.5rem"}}>
                                <div className="cardFloat">
                                  <div className="content">
                                    <span className="title">Add a feature</span>
                                  </div>
                                  <div className="action">
                                      <input type="text" ref="feature"/>
                                  </div>
                                  <div className="action">
                                      <button className="button alert" onClick={this.openModal}>Add</button>
                                        <Modal
                                          isOpen={this.state.modalOpen}
                                          onAfterOpen={this.afterOpenModal}
                                          onRequestClose={this.closeModal}
                                          style = {customStyles}
                                          contentLabel="Example Modal"
                                        >   
                                            <h3 ref="subtitle" style={{textAlign : 'center'}}>Priority</h3>
                                            <p>Please choose the priority (how important) this feature is to you.</p>
                                            <div className="priority row">
                                                <div className="small-9 small-centered columns" style={{marginLeft : "6rem"}}>
                                                    <ul className="button-group round toggle" data-toggle="buttons-radio">
                                                      <li>
                                                        <input type="radio" id="r1" name="r-group" data-toggle="button" value="1" onChange={(e) => priorityChanged(e)}/>
                                                        <label className="button" htmlFor="r1" style={{"borderTopLeftRadius": "5rem", "borderBottomLeftRadius": "5rem"}}>Low</label>
                                                      </li>
                                                      <li>
                                                        <input type="radio" id="r2" name="r-group" data-toggle="button" value="2" onChange={(e) => priorityChanged(e)}/>
                                                        <label className="button" htmlFor="r2">Medium</label>
                                                      </li>
                                                      <li>
                                                        <input type="radio" id="r3" name="r-group" data-toggle="button" value="3" onChange={(e) => priorityChanged(e)}/>
                                                        <label className="button" htmlFor="r3" style={{"borderTopRightRadius": "5rem", "borderBottomRightRadius": "5rem"}}>High</label>
                                                      </li>
                                                    </ul>
                                                 </div>
                                            </div>
                                        </Modal>
                                  </div>
                                </div>
                            </div>
                        </Sticky>
                    </div>
                </StickyContainer>
            </div>
        )
    }
});

export default connect(
    (state) => {
        return {
            houses : state.houses,
            loggedIn : state.loggedIn
        }
    }
)(Walkthru);

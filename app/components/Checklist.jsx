var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var ohwtAPI = require('ohwtAPI');
var {Link} = require('react-router');

var Checklist = React.createClass({

    addFeature : function(e) {
        e.preventDefault(); 
        var newFeature = this.refs.newFeature.value;
        var id = this.props.params.id;
        if (newFeature.length > 0) {
            this.refs.newFeature.value = '';
            var {dispatch} = this.props;
            dispatch(actions.startAddChecklist(id, newFeature));
        } else {
            this.refs.newFeature.focus();
        }
    },
    render : function() {
        var key = 0;
        var {houses, dispatch} = this.props;
        var id = this.props.params.id;
        var house = ohwtAPI.findHouseById(houses, id);
        const HOUSE_URL = "/houseprofile/" + id;
        var checklist = house.checklist;
        return (
            <div className="checklist-main row">
                <div className="small-8 large-8 small-centered large-centered columns">
                	<div className="checklist-container card">
		        			<table>
		        			<tbody>
		                    {checklist.map((feature) => {
                                var ratingChanged = (e) => {
                                    var rating = e.currentTarget.value;
                                    dispatch(actions.startUpdateRating(id, feature.id, rating));
                                };
                                var rating = parseInt(feature.rating);
                                return (
		                        	<tr className="feature row card-section" key={feature.id}>
		                        	<td>
			                            <div>
			                                <div className="small-4 columns">
			                                    {feature.feature}
			                                </div>

			                                <div className="priority row">
												<div className="small-9 small-centered columns">
												    <ul className="button-group round toggle" data-toggle="buttons-radio">
                                                        <input type="radio" id={feature.id + "1"} data-toggle="button" name={feature.id + "1"} value="1" checked={rating === 1} onChange={(e) => ratingChanged(e)}/><label className="priorityLabel" htmlFor={feature.id + "1"} >Low</label>
                                                        <input type="radio" id={feature.id + "2"} data-toggle="button" name={feature.id + "2"} value="2" checked={rating === 2} onChange={(e) => ratingChanged(e)}/><label className="priorityLabel" htmlFor={feature.id + "2"} >Medium</label>
                                                        <input type="radio" id={feature.id + "3"} data-toggle="button" name={feature.id + "3"} value="3" checked={rating === 3} onChange={(e) => ratingChanged(e)}/><label className="priorityLabel" htmlFor={feature.id + "3"} >High</label>
												    </ul>
											 	</div>
											</div>

			                                <div className="small-2 columns">
			                                    <button className="alert button"onClick={() => {dispatch(actions.startDeleteFeature(id, feature.id))}}>Delete</button>
			                                </div>
			                            </div>
		                            </td>
		                            </tr>
		                        )
		                    })}
		                    </tbody>
		                	</table>
		                

		                <br/>
		                <div className="checklistButtons">
		                    <form onSubmit={this.addFeature} className="sameLine">
		                        <input type="text" ref="newFeature" placeholder ="Enter a feature for tracking"/>
		                        <button className="button primary"> Add Feature </button>
		                    </form>
		                     <Link to={HOUSE_URL} activeClassName="active-link">
		                        <button className="back button secondary">Go back</button>
		                     </Link>
		                </div>
	                </div>
                </div>
            </div>
        );
    }
})

export default connect(
    (state) => {
        return {
            houses : state.houses
        }
    }
)(Checklist);
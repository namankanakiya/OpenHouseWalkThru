// React imports
var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var ohwtAPI = require('ohwtAPI');
var {Link} = require('react-router');

// UI imports
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

var Checklist = React.createClass({
    //Function called to add a new feature to a specific house
    addFeature : function(e) {
        // prevent refresh
        e.preventDefault(); 
        // get values
        var newFeature = this.refs.newFeature.value;
        var id = this.props.params.id;
        if (newFeature.length > 0) {
            // reset input field, and dispatch action
            this.refs.newFeature.value = '';
            var {dispatch} = this.props;
            dispatch(actions.startAddChecklist(id, newFeature));
        } else {
            // there was nothing in there
            this.refs.newFeature.focus();
        }
    },
    //authentication
    componentWillMount : function() {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },
    //more authentication to check for login
    componentWillUpdate : function(nextProps, nextState) {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },
    //render function
    render : function() {
        var key = 0;
        var {houses, dispatch} = this.props;
        var id = this.props.params.id;
        var house = ohwtAPI.findHouseById(houses, id);
        const HOUSE_URL = "/houseprofile/" + id;
        var checklist = house.checklist;
        
        return (
            <Paper className="checklist-main" zDepth={3}>
                <Table>
                    <TableBody
                        stripedRows={false}
                        displayRowCheckbox = {false}>
                        {
                            /*maps each feature of that is in the checklist of the specific house
                            to its own table row*/
                            checklist.map((feature) => {
                                /*callback function that is called after change in the SelectField,
                                takes the provided parameters from the react component and calls the 
                                redux action in order to update the store to the new priority value*/
                                var priorityChanged = (event, index, value) => {
                                    dispatch(actions.startUpdatePriority(id, feature.id, value));
                                };
                                var priority = parseInt(feature.priority);

                                return (
                                    <TableRow className="feature" key={feature.id}>
                                        <TableRowColumn>
                                            {feature.feature}
                                        </TableRowColumn>

                                        <TableRowColumn className="priority row">
                                            <SelectField value={priority} onChange={priorityChanged}>
                                                <MenuItem value={1} primaryText="Low" />
                                                <MenuItem value={2} primaryText="Medium" />
                                                <MenuItem value={3} primaryText="High" />
                                            </SelectField>
                                        </TableRowColumn>
                                        {/*Button with anonymous function called that will call the delete feature redux action*/}
                                        <TableRowColumn>
                                            <RaisedButton secondary={true} 
                                                onClick={() => {dispatch(actions.deleteFeature(id, feature.id))}}>Delete
                                            </RaisedButton>
                                        </TableRowColumn>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

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
            </Paper>
        );
    }
})

export default connect(
    (state) => {
        return {
            houses : state.houses,
            loggedIn : state.loggedIn
        }
    }
)(Checklist);

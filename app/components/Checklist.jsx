var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var ohwtAPI = require('ohwtAPI');
var {Link} = require('react-router');
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



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
                	<Paper className="checklist-main" zDepth={3}>
		        			<Table>
		        			<TableBody
		        				stripedRows={false}
		        				displayRowCheckbox = {false}
		        			>

		                    {

		                    	checklist.map((feature) => {
		                    	var ratingChanged = (event, index, value) => {
	                    			console.log(value);
                            	    dispatch(actions.startUpdateRating(id, feature.id, value));
                               	};
                             	var rating = parseInt(feature.rating);

		                        return (
		                        	<TableRow className="feature" key={feature.id}>
			                                <TableRowColumn>
			                                    {feature.feature}
			                                </TableRowColumn>

			                                <TableRowColumn className="priority row">
				                                <SelectField value={rating} onChange={ratingChanged}>
										          <MenuItem value={1} primaryText="Low" />
										          <MenuItem value={2} primaryText="Medium" />
										          <MenuItem value={3} primaryText="High" />
										        </SelectField>
											</TableRowColumn>

			                                <TableRowColumn>
			                                    <RaisedButton secondary={true} className="alert button"onClick={() => {dispatch(actions.deleteFeature(id, feature.id))}}>Delete</RaisedButton>
			                                </TableRowColumn>
		                            </TableRow>
		                        )
		                    })}
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
            houses : state.houses
        }
    }
)(Checklist);
var React = require('react');
import SyncValidationForm from './SyncValidationForm';
var uuid = require('human-readable-ids').hri;
var {connect} = require('react-redux');
var actions = require('actions');
var {Link} = require('react-router');
var ohwtAPI = require('ohwtAPI');

var AddHouse = React.createClass({
    addHouse : function(e) {
        var {address, city, state, zipcode, description, imageurl} = e;
        var {dispatch} = this.props;
        var checklistArray = ohwtAPI.addChecklistItem([],'Big Garage');
        checklistArray = ohwtAPI.addChecklistItem(checklistArray, 'Great Lighting');
        checklistArray = ohwtAPI.addChecklistItem(checklistArray, 'Wooden Floors');
        checklistArray = ohwtAPI.addChecklistItem(checklistArray, 'Basement');
        var house = {
            id : uuid.random(),
            address : address,
            city : city,
            state : state,
            zipcode : zipcode,
            description : description,
            imageurl : imageurl,
            score : -1,
            checklist : checklistArray
        }
        dispatch(actions.addHouse(house));
        this.props.router.push('/');
    },
    render: function() {
        return (
          
            <SyncValidationForm onSubmit={this.addHouse}/>
            
        )
    }
});

module.exports = connect()(AddHouse);

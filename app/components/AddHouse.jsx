var React = require('react');
import SyncValidationForm from './SyncValidationForm';
var uuid = require('node-uuid');
var {connect} = require('react-redux');
var actions = require('actions');
var {Link} = require('react-router');

var AddHouse = React.createClass({
    addHouse : function(e) {
        var {address, city, state, zipcode, description, imageurl} = e;
        var {dispatch} = this.props;
        var house = {
            id : uuid(),
            address : address,
            city : city,
            state : state,
            zipcode : Number(zipcode),
            description : description,
            imageurl : imageurl,
            score : -1,
            checklist : [{
                    id : uuid(),
                    feature : 'Big Garage'
                },{
                    id : uuid(),
                    feature : 'Great Lighting'
                },{
                    id : uuid(),
                    feature : 'Wooden Floors'
                },{
                    id : uuid(),
                    feature : 'Wooden Floors'
                }]
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

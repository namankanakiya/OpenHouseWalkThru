var React = require('react');
import SyncValidationForm from './SyncValidationForm';
var uuid = require('human-readable-ids').hri;
var {connect} = require('react-redux');
var actions = require('actions');
var {Link} = require('react-router');

var AddHouse = React.createClass({
    addHouse : function(e) {
        var {address, city, state, zipcode, description, imageurl} = e;
        var {dispatch} = this.props;
        var house = {
            address : address,
            city : city,
            state : state,
            zipcode : zipcode,
            description : description || null,
            imageurl : imageurl || null,
            score : -1,
        }
        dispatch(actions.startAddHouse(house,2));
        this.props.router.push('/');
    },
    render: function() {
        return (
            <SyncValidationForm onSubmit={this.addHouse}/>
        )
    }
});

export default connect()(AddHouse);

var React = require('react');
import SyncValidationForm from './SyncValidationForm';
var {connect} = require('react-redux');
var actions = require('actions');
var {Link} = require('react-router');
var ImageUpload = require('ImageUpload').default;

var AddHouse = React.createClass({
    addHouse : function(e) {
        var {address, city, state, zipcode, description} = e;
        var {dispatch, photo} = this.props;
        var house = {
            address : address,
            city : city,
            state : state,
            zipcode : zipcode,
            description : description || null,
            imageurl : photo || null,
            score : -1,
        }
        var userId = 1;
        dispatch(actions.startAddHouse(house, userId));
        this.props.router.push('/');
        console.log(photo);
    },
    render: function() {
        return (
            <div>
            <SyncValidationForm onSubmit={this.addHouse}/>
            <p> <ImageUpload/></p>
            </div>
        )
    }
});

export default connect((state) => {
        return {
            photo : state.photo
        }
    })(AddHouse);

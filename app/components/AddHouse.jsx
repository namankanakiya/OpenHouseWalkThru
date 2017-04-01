// Imports
var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var {Link} = require('react-router');
var ImageUpload = require('ImageUpload').default;

import SyncValidationForm from './SyncValidationForm';

// React component
var AddHouse = React.createClass({
    // On form submission function to dispatch add house
    addHouse : function(e) {
        // values from form
        var {address, city, state, zipcode, description} = e;
        var {dispatch, photo} = this.props;
        // create new house object
        var house = {
            address : address,
            city : city,
            state : state,
            zipcode : zipcode,
            description : description || null,
            imageurl : photo || null,
            score : -1,
        }
        // assign house to current user
        var {loggedIn} = this.props;
        var userId = loggedIn.userId;
        dispatch(actions.startAddHouse(house, userId));
        // redirect to dashboard
        this.props.router.push('/');
    },
    componentWillMount : function() {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },
    componentWillUpdate : function(nextProps, nextState) {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },
    render : function() {
        return (
            <div>
                <SyncValidationForm onSubmit={this.addHouse} />
                <p><ImageUpload /></p>
            </div>
        )
    }
});

export default connect((state) => {
    return {
        photo : state.photo,
        loggedIn : state.loggedIn
    }
})(AddHouse);

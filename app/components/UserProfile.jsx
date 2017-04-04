var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');

import RaisedButton from 'material-ui/RaisedButton';

/*
 * This component represents the user profile page of the website where the user
 * can see their account information and manage points of interest.
 */
var UserProfile = React.createClass({
    /*
     * This function verifies that a user is logged in, and if no user is logged
     * in, then the website will redirect to the login page.
     */
    componentWillMount : function() {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },

    /*
     * This function verifies that a user is logged in, and if no user is logged
     * in, then the website will redirect to the login page.
     */
    componentWillUpdate : function(nextProps, nextState) {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },

    /*
     * Loads the web scripts (HTML, CSS, JavaScript, etc.).
     */
    render : function() {
        var hello = "hi"
        return (
            <div>
                <div>
                    <p>User Profile {hello}</p>
                </div>
                <div>
                    <Link to="/poi"><RaisedButton style={{marginBottom : "10px"}} primary label="Points of Interest" /></Link>
                </div>
            </div>
        )
    }
});

export default connect((state) => {
    return {
        loggedIn : state.loggedIn
    }
})(UserProfile);

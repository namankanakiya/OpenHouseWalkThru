var React = require('react');
var {Link} = require('react-router');
var $ = require('jquery');
var {connect} = require('react-redux'); // Redux
var actions = require('actions');

import firebase, {firebaseRef} from 'app/firebase';

{/* This is supposed to go inside the createClass() function
componentDidUpdate : function() {
    $(document).foundation();
    return(
        <div></div>
    );
},*/}

/*
 * This component manages the top navigation bar that occurs throughout the
 * website. Let's us use <Nav />.
 */
var Nav = React.createClass({
    /*
     * Manages the logout button on the navigation bar.
     */
    logout : function(e) {
        var {dispatch} = this.props;
        firebase.auth().signOut().then(()=>{
            dispatch(actions.logoutUser());
        })
        console.log("Logout button clicked");
    },

    /*
     * This function renders the right side of the navigation bar differently
     * depending on whether a user is logged in or not. If not logged in, only a
     * link called "Login" will appear. If a user is logged in, the links to go
     * to the user profile page, and the settings page appear, as well as a link
     * to logout.
     */
    renderLogoutLogin : function() {
        var {loggedIn} = this.props;
        if (loggedIn.loggedIn) {
            return (
                <div className="top-bar-right">
                    {/*menu*/}
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li><Link to="/userprofile">Profile</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><Link to="/login"><button onClick={this.logout}>Logout</button></Link></li>
                    </ul>
                </div>
                )
        } else {
            return (
                <div className="top-bar-right">
                    {/*menu*/}
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
                )
        }
    },

    /*
     * This function will render the left side of the navigation bar differently
     * depending on whether a user is logged in or not. If a user is not logged
     * in, the navigation bar will only have the name of the website, Open House
     * Walk Through along with its logo. If a user is logged in, a link to the
     * Dashboard page will also show.
     */
    renderLogoutLoginLeft : function() {
        var {loggedIn} = this.props;
        if (loggedIn.loggedIn) {
            return (
                <div className="top-bar-left">
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li className="menu-text">Open House Walk Thru</li>
                        <li><Link to="/">Dashboard</Link></li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="top-bar-left">
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li className="menu-text">Open House Walk Thru</li>
                    </ul>
                </div>
            );
        }
    },

    /*
     * Loads the web scripts (HTML, CSS, JavaScript, etc.).
     */
    render : function() {
        {/*var menu = (true)?
            <ul className="dropdown menu" data-dropdown-menu>
                <li>
                    <a href="#">Menu</a>
                    <ul className="menu vertical">
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Settings</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </li>
            </ul>
        : null;*/}
        return (
            <nav className="top-bar">
                <div className="logo"><img src="http://i.imgur.com/2jW8gL5.png" width="64" height="40"/></div>
                {this.renderLogoutLoginLeft()}
                {this.renderLogoutLogin()}
            </nav>
        );
    }
});

export default connect((state) => {
    return {
        loggedIn : state.loggedIn
    }
})(Nav);

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

var Nav = React.createClass({
    logout : function(e) {
        var {dispatch} = this.props;
        firebase.auth().signOut().then(()=>{
            dispatch(actions.logoutUser());
        })
        console.log("Logout button clicked");
    },
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

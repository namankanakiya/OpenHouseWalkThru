var React = require('react');
var {Link} = require('react-router');

var NavMenu = React.createClass({
    getDefaultProps : function() {
        return {
            isOpen : false
        };
    },

    render : function() {
        if (this.props.isOpen) {
            return (
                <div className="dropdown">
                    <ul>
                        <li><Link to="/userprofile">Profile</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
            );
        }
        return null;
    }
});

var NavMenuButton = React.createClass({

    getInitialState : function() {
        return {
            isOpen : false
        };
    },

    handleClick : function(e) {
        e.stopPropagation();
        console.log("button click", this.state.isOpen);
        this.setState({isOpen: !this.state.isOpen});
    },

    componentDidMount : function() {},

    componentWillUnmount : function() {},

    handleBodyClick : function(e) {
        this.setState({isOpen : false});
    },

    render : function() {
        return (
            <div onClick={this.handleBodyClick}>
                <a onClick={this.handleClick}>Menu</a>
                <NavMenu isOpen={this.state.isOpen} />
            </div>
        );
    }

});

var Nav = React.createClass({
    render : function() {
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li className="menu-text">Open House Walk Thru</li>
                        <li><Link to="/">Dashboard</Link></li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    <NavMenuButton />
                </div>
            </div>
        );
    }
});

module.exports = Nav;

var React = require('react');

var Nav = React.createClass({
    render : function() {
        return (
            <div className="top-bar">
              <div className="top-bar-left">
                <ul className="dropdown menu" data-dropdown-menu>
                  <li className="menu-text">Open House Walk Thru</li>
                  <li><a href="/#/userprofile">User Profile</a></li>
                  <li><a href="#">Messages</a></li>
                  <li><a href="#">Settings</a></li>
                </ul>
              </div>
              <div className="top-bar-right">
                <ul className="menu">
                  <li><input type="search" placeholder="Search"/></li>
                  <li><button type="button" className="button">Search</button></li>
                </ul>
              </div>
            </div>
        );
    }
});

module.exports = Nav;
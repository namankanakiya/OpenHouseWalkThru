var React = require('react');

var Logout = React.createClass({
    render : function() {
        return (
            <div>
                <p>You've been logged out.</p>
                <p>Go back to <a href="/#/">main page</a></p>
            </div>
        )
    }
});

module.exports = Logout;
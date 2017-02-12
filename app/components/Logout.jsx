var React = require('react');
var {Link} = require('react-router');

var Logout = React.createClass({
    render : function() {
        return (
            <div>
                <p>You've been logged out.</p>
                <p>Go back to <Link to="/">main page</Link></p>
            </div>
        )
    }
});

module.exports = Logout;
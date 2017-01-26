var React = require('react');

var UserProfile = React.createClass({
    render : function() {
        var hello = "hi"
        return (
            <p>User Profile {hello}</p>
        )
    }
});

module.exports = UserProfile;
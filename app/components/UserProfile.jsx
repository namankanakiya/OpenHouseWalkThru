var React = require('react');
var {Link} = require('react-router');

import RaisedButton from 'material-ui/RaisedButton';

var UserProfile = React.createClass({
    render : function() {
        var hello = "hi"
        return (
            <div>
                <div>
                    <p>User Profile {hello}</p>
                </div>
                <div>
                    <Link to="/addpoi"><RaisedButton style={{marginBottom : "10px"}} primary label="Add POI" /></Link>
                </div>
            </div>
        )
    }
});

export default UserProfile;

var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');

import RaisedButton from 'material-ui/RaisedButton';

var UserProfile = React.createClass({
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

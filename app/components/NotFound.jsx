// React and Redux imports
var React = require('react');
var {connect} = require('react-redux');

// React class
var NotFound = React.createClass({
    // Authentication
    componentWillMount : function() {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },
    // More Authentication
    componentWillUpdate : function(nextProps, nextState) {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },
    render : function() {
        // Depending on where they wanted to go, we want to display different messages
        var renderNotFound = () => {
            var locationState = this.props.location.state;
            if (locationState) {
                var prevLoc = locationState.notFound;
                if (prevLoc === 'houseprofile' || prevLoc ==='walkthru') {
                    // if they wanted to go to a house page, display the following
                    return <p>The requested House was not found</p>
                } else if (prevLoc === 'checklist') {
                    // likewise with checklist
                    return <p>The requested Checklist was not found</p>
                } else {
                    // otherwise default 404 error
                    return <p>404 Not Found</p>
                }
            } else {
                return <p>404 Not Found</p>
            }
        }
        return (
            <div>
                {renderNotFound()}
            </div>
        )
    }
});

// Need to have access to login status for auth
export default connect((state => {
    return {
        loggedIn : state.loggedIn
    }
}))(NotFound);

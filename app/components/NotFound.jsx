var React = require('react');
var {connect} = require('react-redux');

var NotFound = React.createClass({
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
        var renderNotFound = () => {
            var locationState = this.props.location.state;
            if (locationState) {
                var prevLoc = locationState.notFound;
                if (prevLoc === 'houseprofile' || prevLoc ==='walkthru') {
                    return <p>The requested House was not found</p>
                } else if (prevLoc === 'checklist') {
                    return <p>The requested Checklist was not found</p>
                } else {
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

export default connect((state => {
    return {
        loggedIn : state.loggedIn
    }
}))(NotFound);

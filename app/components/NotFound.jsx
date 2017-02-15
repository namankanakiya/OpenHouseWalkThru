var React = require('react');

var NotFound = React.createClass({
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

module.exports = NotFound;
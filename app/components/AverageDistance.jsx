var React = require('react');

// Simple component which renders the distance it is inputted with.
// If distance doesn't exit, return that
var AverageDistance = React.createClass({
    getDefaultProps : function() {
        return {
            avgDistance : -1
        };
    },
    propTypes : {
        avgDistance : React.PropTypes.number.isRequired
    },
    render : function() {
        var {avgDistance} = this.props; 
        var renderDistance = () => {
            if (avgDistance >= 0) {
                return <p>{avgDistance} Miles</p> // show the avgerage distance in miles
            } else {
                return <p>Distance Not Known</p>
            }
        };
        return (
            <div>
                {renderDistance()}
            </div>
        )
    }
});

export default AverageDistance;
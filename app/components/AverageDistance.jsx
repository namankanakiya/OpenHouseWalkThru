var React = require('react');

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
                return <p>{avgDistance}</p>
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

module.exports = AverageDistance;
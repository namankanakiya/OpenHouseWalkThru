var React = require('react');

var Score = React.createClass({
    getDefaultProps : function() {
        return {
            score : -1
        };
    },
    propTypes : {
        score : React.PropTypes.number.isRequired
    },
    render : function() {
        var {score} = this.props; 
        var renderScore = () => {
            if (score >= 0) {
                return <p>{score}</p>
            } else {
                return <p>Not Rated yet</p>
            }
        };
        return (
            <div>
                {renderScore()}
            </div>
        )
    }
});

module.exports = Score;
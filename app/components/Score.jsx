var React = require('react');

var Score = React.createClass({
	getDefaultProps : function() {
		score : 0
	},
	propTypes : {
		score : React.PropTypes.number
	},
	render : function() {
		var {score} = this.props; 
		var renderScore = () => {
			if (score != 0) {
				return <p>{score}</p>
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
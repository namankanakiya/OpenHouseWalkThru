var React = require('react');
var Score = require('Score');

var Dashboard = React.createClass({
	render : function() {
		return (
			<div>
				<h1 className="page-title">Dashboard</h1>
				<p>Map goes here</p>
				<Score score={5}/>
			</div>
		);
	}
});

module.exports = Dashboard;
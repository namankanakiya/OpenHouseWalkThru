var React = require('react');


var Checklist = React.createClass({
	getInitialState : function() {
		return {
			features : ["Bedroom", "Driveway", "Kitchen"]
		};
	},

	render : function() {
		return (
			<div>
				<ul>
					{this.state.features.map((feature) => {
						return <li>{feature}</li>
					})}
				</ul>
			</div>
		);
	}
})

module.exports = Checklist;
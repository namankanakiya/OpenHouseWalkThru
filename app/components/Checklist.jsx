var React = require('react');


var Checklist = React.createClass({
	getInitialState : function() {
		return {
			features : ["Bedroom", "Driveway", "Kitchen"]
		};
	},

	addFeature : function() {
		console.log("It Works: " + this.refs.newFeature.value);
	},

	render : function() {
		return (
			<div>
				<ul>
					{this.state.features.map((feature) => {
						return <li>{feature}</li>
					})}
				</ul>
				<br/>
				<input type="text" ref="newFeature" placeholder ="Enter a feature for tracking"/>
				<button onClick={this.addFeature}> Add Feature </button>
			</div>
		);
	}
})

module.exports = Checklist;
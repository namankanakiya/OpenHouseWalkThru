var React = require('react');


var Checklist = React.createClass({
	getInitialState : function() {
		return {
			features : ["Bedroom", "Driveway", "Kitchen"]
		};
	},

	addFeature : function() {
		var newFeature = this.refs.newFeature.value;
		console.log("It Works: " + newFeature);
		this.setState({features : this.state.features.concat([newFeature])});
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
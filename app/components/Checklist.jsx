var React = require('react');


var Checklist = React.createClass({
	getInitialState : function() {
		return {
			features : ["Bedroom", "Driveway", "Kitchen"]
		};
	},

	addFeature : function() {
		var newFeature = this.refs.newFeature.value;
		if (newFeature.length > 0) {
			this.refs.newFeature.value = '';
			this.setState(
				{features : this.state.features.concat([newFeature])});
		}
	},

	render : function() {
		var key = 0;
		return (
			<div>
				<ul>
					{this.state.features.map((feature) => {
						return <li key={key++}>{feature}</li>
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
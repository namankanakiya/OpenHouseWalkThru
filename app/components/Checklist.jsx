var React = require('react');


var Checklist = React.createClass({
	getInitialState : function() {
		return {
			features : ["Bedroom", "Driveway", "Kitchen"]
		};
	},

	addFeature : function(e) {
		e.preventDefault();	
		var newFeature = this.refs.newFeature.value;
		if (newFeature.length > 0) {
			this.refs.newFeature.value = '';
			this.setState(
				{features : [...this.state.features, newFeature]});
		}
	},

	render : function() {
		var key = 0;
		return (
			<div className="checklist-main">
				<ul>
					{this.state.features.map((feature) => {
						return <li key={key++}>{feature}</li>
					})}
				</ul>
				<br/>
				<div>
					<form onSubmit={this.addFeature} className="sameLine">
						<input type="text" ref="newFeature" placeholder ="Enter a feature for tracking"/>
						<button className="button primary"> Add Feature </button>
					</form>
					<a href="/#/houseprofile"><button className="back button secondary">Go back</button></a>
				</div>
			</div>
		);
	}
})

module.exports = Checklist;
var React = require('react');
var Score = require('Score');
var AverageDistance = require('AverageDistance');

var HouseProfile = React.createClass({
    getDefaultProps : function() {
		return {
			score : -1,
			imageURL : '',
			address : '',
			description: '',
			avgDist : ''
		};
	},
	propTypes : {
		address : React.PropTypes.object.isRequired,
		score : React.PropTypes.number,
		imageURL : React.PropTypes.string,
		avgDist : React.PropTypes.number,
		description : React.PropTypes.string
	},
	render : function() {
		var {address, score, imageURL, avgDist, description} = this.props;
		var {streetAddress, city, state} = address;
		return (
			  <div className="column">
			    <div className="card callout secondary">
			      <img src='https://s-media-cache-ak0.pinimg.com/originals/15/21/65/152165c63cb91cd3a0181b387203aee9.jpg' alt="No Image"/>
			      <div className="card-section">
			        <h4>Score: 89</h4>
			        <h4>Average Distance: 9.3 miles</h4>
			        <h4>267, 26th St, New York, NY</h4>
			        <h4>One of the classiest penthouses in the city of glamor!</h4>
			      </div>
			    </div>
			  </div>
		);
	}
});

module.exports = HouseProfile;
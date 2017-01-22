var React = require('react');
var Faker = require('faker');
var HouseSummary = require('HouseSummary');

var Dashboard = React.createClass({
	getInitialState : function() {
		return {
			houses : []
		};
	},
	randomIntFromInterval : function(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	},
	generateFakeData : function() {
		var num = this.randomIntFromInterval(5, 10)
		var houseArray = []
		for (var x = 0; x < num; x++) {
			var address = new Object();
			address.streetAddress = Faker.address.streetAddress();
			address.city = Faker.address.city();
			address.state = Faker.address.state();
			var house = new Object();
			house.address = address;
			house.imageURL = Faker.image.image();
			var score = this.randomIntFromInterval(60, 100);
			house.score = score;
			house.id = Faker.random.uuid();
			var houseJSON = JSON.stringify(house);
			houseArray.push(houseJSON);
		}
		this.setState({houses : houseArray});
	},
	componentDidMount : function() {
		this.generateFakeData();
	},
	render : function() {
		return (
			<div>
				<h1 className="page-title">Dashboard</h1>
				<p>Map goes here</p>
				<div className="row small-up-2 medium-up-3">
					{this.state.houses.map((house) => {
						{var houseJSON = JSON.parse(house);}
						{var {id, address, score, imageURL} = houseJSON;}
						return <HouseSummary key={id} address={address} score={score} imageURL={imageURL}/>
					})}
				</div>
			</div>
		);
	}
});

module.exports = Dashboard;
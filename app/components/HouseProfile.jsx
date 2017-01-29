var React = require('react');
var Faker = require('faker');
var HouseInfo = require('HouseInfo');
var Score = require('Score');
var AverageDistance = require('AverageDistance');

var HouseProfile = React.createClass({
    getDefaultProps : function() {
        return {
            score : -1,
            avgDist : ''
        };
    },
    propTypes : {
        score : React.PropTypes.number,
        avgDist : React.PropTypes.number,
    },
    render : function() {
        var {score, avgDist} = this.props;
        var pictureDummy = Faker.image.image();
        var addressDummy = new Object();
        addressDummy.streetAddress= Faker.address.streetAddress();
        addressDummy.city = Faker.address.city();
        addressDummy.state = Faker.address.state();
        return (
            <div className="column">
                <div className="card callout secondary">
                    <div className="card-section">
                        <HouseInfo
                         picture={pictureDummy}
                         address={addressDummy}
                         description="One of the finest houses in the city" />
                        <h4>Score: 89 (derived value)</h4>
                        <div className="card-map">
                            <p>MAP GOES HERE (coming soon)...</p>
                        </div>
                        <h4>Average Distance: 9.3 miles</h4>
                        <h4><a href="/#/checklist">Checklist:</a></h4>
                        <ul>
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                            <li>...</li>
                        </ul>
                        <h4>Pictures:</h4>
                        <div className="card-slideshow">
                            <p>PICTURES SLIDESHOW GOES HERE (coming soon)...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HouseProfile;

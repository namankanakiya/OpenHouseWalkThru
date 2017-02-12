var React = require('react');
var HouseInfo = require('HouseInfo');
var Score = require('Score');
var AverageDistance = require('AverageDistance');
var ohwtAPI = require('ohwtAPI')
var {Link} = require('react-router');

//Redux
var {connect} = require('react-redux');

var HouseProfile = React.createClass({
    getDefaultProps : function() {
        return {
            score : -1,
            avgDist : -1
        };
    },
    propTypes : {
        score : React.PropTypes.number,
        avgDist : React.PropTypes.number,
    },
    render : function() {
        var {score, avgDist, checklist, houses} = this.props;
        var id = this.props.params.id;
        var house = ohwtAPI.findHouseById(houses, id);
        var addressDummy = new Object();
        addressDummy.streetAddress= house.address;
        addressDummy.city = house.city;
        addressDummy.state = house.state;
        const CHECKLIST_URL = "/checklist/" + id;
        return (
            <div className="column">
                <div className="card callout secondary">
                    <div className="card-section">
                        <HouseInfo
                         picture={house.imageurl}
                         address={addressDummy}
                         description="One of the finest houses in the city" />
                        <h4><Score score={house.score}/></h4>
                        <div className="card-map">
                            <p>MAP GOES HERE (coming soon)...</p>
                        </div>
                        <h4>Average Distance: <AverageDistance avgDistance={5}/></h4>
                        <Link to={CHECKLIST_URL} activeClassName="active-link">
                            <h4>Checklist:</h4>
                        </Link>
                        <ul>
                            {house.checklist.map((feature) => {
                                return <li key={feature.id}>{feature.feature}</li>
                            })}
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

module.exports = connect(
    (state) => {
        return {
            checklist : state.checklist,
            houses : state.houses
        }
    }
)(HouseProfile);

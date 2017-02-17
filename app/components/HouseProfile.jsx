var React = require('react');
var HouseInfo = require('HouseInfo');
var Score = require('Score');
var AverageDistance = require('AverageDistance');
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
        var mainContainer = {
            backgroundImage: "url(https://s-media-cache-ak0.pinimg.com/originals/41/2f/6c/412f6c9f290bdaff0fdb5af49e139adb.jpg)",
            backgroundSize: "100% 100%",
            opacity: 0.8
        };

        var box = {
            backgroundColor: "white",
            marginLeft: "12%",
            width: "75%",
            border: "1px solid black",
            opacity: 0.9
        };

        var {score, avgDist, house} = this.props;
        var id = this.props.params.id;
        var addressDummy = new Object();
        addressDummy.streetAddress= house.address;
        addressDummy.city = house.city;
        addressDummy.state = house.state;
        const CHECKLIST_URL = "/checklist/" + id;
        const WALKTHRU_URL = "/walkthru/" + id;
        return (
            <div className="column" style={mainContainer}>
                {/*<Link to={WALKTHRU_URL} activeClassName="active-link">
                    <h4>Begin Walkthru</h4>
                </Link>*/}
                <div className="card callout secondary" style={box}>
                    <div className="card-section">
                        <HouseInfo
                         picture={house.imageurl}
                         address={addressDummy}
                         description="One of the finest houses in the city" />
                        <h4><Score score={house.score}/></h4>
                        <Link to={CHECKLIST_URL} activeClassName="active-link">
                            <h4>Checklist:</h4>
                        </Link>
                        <ul>
                            {house.checklist.map((feature) => {
                                return <li key={feature.id}>{feature.feature}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = connect(
    (state) => {
        return {
            house : state.house
        }
    }
)(HouseProfile);

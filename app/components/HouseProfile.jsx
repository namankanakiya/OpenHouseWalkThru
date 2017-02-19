var React = require('react');
var HouseInfo = require('HouseInfo');
var Score = require('Score');
var AverageDistance = require('AverageDistance');
var {Link} = require('react-router');

// general styles
import 'style!css!react-responsive-carousel/lib/styles/main.css';

// carousel styles
import 'style!css!react-responsive-carousel/lib/styles/carousel.css';


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
            marginTop: "2%",
            marginLeft: "12%",
            width: "75%",
            border: "1px solid black"
        };

        var leftCard = {
            float: "left",
            width: "50%"
        };

        var rightCard = {
            float: "right",
            width: "50%"
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
                    <HouseInfo
                     address={addressDummy}
                     description="One of the finest houses in the city" />
                    <div style={leftCard}>
                        <h4>Features</h4>
                        <ul>
                            {house.checklist.map((feature) => {
                                return <li key={feature.id}>{feature.feature}</li>
                            })}
                        </ul>
                    </div>
                    <div style={rightCard}>
                        <h4><Score score={house.score}/></h4>
                        <p><Link to={WALKTHRU_URL} activeClassName="active-link">
                            <button className="button">Begin Walkthru</button>
                        </Link></p>
                        <p><Link to={CHECKLIST_URL} activeClassName="active-link">
                            <button className="button">Edit Checklist</button>
                        </Link></p>
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

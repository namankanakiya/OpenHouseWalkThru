var React = require('react');
var HouseInfo = require('HouseInfo').default;
var Score = require('Score').default;
var AverageDistance = require('AverageDistance').default;
var {Link} = require('react-router');

// general styles
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/main.css';

// carousel styles
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.css';


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
            border: "1px solid black",
            overflow: "auto",
            height: "auto"
        };

        var leftCard = {
            paddingRight: "1%",
            float: "left",
            width: "75%"
        };

        var rightCard = {
            paddingLeft: "1%",
            float: "right",
            width: "25%"
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
                <div className="card callout secondary" style={box}>
                    <HouseInfo
                     address={addressDummy}
                     description="One of the finest houses in the city" />
                    <div style={leftCard}>
                        <img src="http://cdn.newsapi.com.au/image/v1/0a0ceda4bda18e664ffac1a8fa86a7d1" />
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

export default connect(
    (state) => {
        return {
            house : state.house
        }
    }
)(HouseProfile);

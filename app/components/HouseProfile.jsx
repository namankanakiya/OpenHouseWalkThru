var React = require('react');
var HouseInfo = require('HouseInfo').default;
var Score = require('Score').default;
var AverageDistance = require('AverageDistance').default;
var {Link} = require('react-router');
var actions = require('actions');
var Maps = require('Maps').default;
var {connect} = require('react-redux'); // Redux

import 'style-loader!css-loader!react-responsive-carousel/lib/styles/main.css'; // general styles
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.css'; // carousel styles

/*
 * House Profile
 * This component represents the page in the website that shows a house profile,
 * a page containing the pictures, address, score, a map with a marker showing
 * the location of the house, as well as containing links to edit the feature
 * checklist for the house, go through the walkthrough of the house, and delete
 * the house.
 */
var HouseProfile = React.createClass({
    /*
     * This function initializes the basic properties of the house, score and
     * avgDist. score represents a numeric score that is calculated and given to
     * a house based on multiple factors, mainly the ratings given to the
     * features of the house. avgDist represents the average distance from the
     * house to all of the points of interest of the user.
     */
    getDefaultProps : function() {
        return {
            score : -1,
            avgDist : -1
        };
    },

    /*
     * This code block define the data types of the properties. Both score and
     * avgDist are defined to be numbers.
     */
    propTypes : {
        score : React.PropTypes.number,
        avgDist : React.PropTypes.number,
    },

    /*
     * This function is called when the user clicks the 'Delete House' button
     * and it starts the process for deleting the house from the Firebase
     * database. To do this, the startDeleteHouse method from the actions.jsx
     * component is called.
     */
    delete : function() {
        var {dispatch} = this.props;
        var id = this.props.params.id;
        var userId = 1;
        dispatch(actions.startDeleteHouse(userId, id));
    },

    /*
     * Loads the web scripts (HTML, CSS, JavaScript, etc.).
     */
    render : function() {
        // styles the background of the page.
        var mainContainer = {
            backgroundImage: "url(https://s-media-cache-ak0.pinimg.com/originals/41/2f/6c/412f6c9f290bdaff0fdb5af49e139adb.jpg)",
            backgroundSize: "100% 100%",
            opacity: 0.8
        };

        // styles the box containing all of the information to be displayed.
        var box = {
            backgroundColor: "white",
            marginTop: "2%",
            marginLeft: "12%",
            width: "75%",
            border: "1px solid black",
            overflow: "auto",
            height: "auto"
        };

        // styles the bottom left half of the box containing the map.
        var leftCard = {
            paddingRight: "1%",
            float: "left",
            width: "75%"
        };

        // styles the bottom right half of the box containing the buttons.
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
        var picture = house.imageurl;
        const CHECKLIST_URL = "/checklist/" + id;
        const WALKTHRU_URL = "/walkthru/" + id;
        return (
            <div className="column" style={mainContainer}>
                <div className="card callout secondary" style={box}>
                    <HouseInfo
                     address={addressDummy}
                     description="One of the finest houses in the city" picture={picture} />
                    <div style={leftCard}>
                        <Maps address={house.address} city={house.city} state={house.state} />
                    </div>
                    <div style={rightCard}>
                        <h4><Score score={house.score}/></h4>
                        <p><Link to={WALKTHRU_URL} activeClassName="active-link">
                            <button className="button">Begin Walkthru</button>
                        </Link></p>
                        <p><Link to={CHECKLIST_URL} activeClassName="active-link">
                            <button className="button">Edit Checklist</button>
                        </Link></p>
                        <p><Link to="/" activeClassName="active-link">
                            <button className="button" onClick={this.delete}>Delete House</button>
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

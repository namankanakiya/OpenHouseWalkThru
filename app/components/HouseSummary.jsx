var React = require('react');
var Score = require('Score');
var {Link} = require('react-router');

var HouseSummary = React.createClass({
    getDefaultProps : function() {
        return {
            score : -1,
            imageURL : ''
        };
    },
    propTypes : {
        address : React.PropTypes.string.isRequired,
        city : React.PropTypes.string.isRequired,
        state : React.PropTypes.string.isRequired,
        zipcode : React.PropTypes.string.isRequired,
        score : React.PropTypes.number,
        imageurl : React.PropTypes.string
    },
    render : function() {
        var {id, address, city, state, zipcode, score, imageurl} = this.props;
        const IMAGE_NOT_FOUND = "https://cdn.browshot.com/static/images/not-found.png";
        const HOUSE_URL = "/houseprofile/" + id;
        return (
            <div className="column">
                <div className="card callout secondary small">
                    <Link to={HOUSE_URL} activeClassName="active-link">
                        <img src={imageurl} alt="No Image" style={{width:640, height:240}} onError={(e) => {e.target.src=IMAGE_NOT_FOUND}}/>
                        <div className="card-section">
                            <h4>{address}, {city}, {state} {zipcode}</h4>
                            <div>
                                Score: <Score score={score}/>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
});

module.exports = HouseSummary;

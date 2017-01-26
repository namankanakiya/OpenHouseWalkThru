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
        address : React.PropTypes.object.isRequired,
        score : React.PropTypes.number,
        imageURL : React.PropTypes.string
    },
    render : function() {
        var {address, score, imageURL} = this.props;
        var {streetAddress, city, state} = address;
        return (
              <div className="column">
                <div className="card callout secondary">
                  <Link to="/houseprofile" activeClassName="active-link">
                      <img src={imageURL} alt="No Image"/>
                      <div className="card-section">
                        <h4>{streetAddress}, {city}, {state}</h4>
                        <div>Score: <Score score={score}/></div>
                      </div>
                  </Link>
                </div>
              </div>
        );
    }
});

module.exports = HouseSummary;
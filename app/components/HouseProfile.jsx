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
                    <h4>Address: 267, 26th St, New York, NY</h4>
                    <h4>Description: One of the classiest penthouses in the city of glamor!</h4>
                    <h4>Score: 89 (derived value)</h4>
                    <p>MAP GOES HERE (coming soon)...</p>
                    <h4>Average Distance: 9.3 miles</h4>
                    <h4><a href="/#/checklist">Checklist:</a></h4>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                        <li>...</li>
                    </ul>
                    <h4>Pictures:</h4>
                    <p>PICTURES SLIDESHOW GOES HERE (coming soon)...</p>
                  </div>
                </div>
              </div>
        );
    }
});

module.exports = HouseProfile;
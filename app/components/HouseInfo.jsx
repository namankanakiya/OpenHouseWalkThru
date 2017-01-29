var React = require('react');

/*
 * House Info
 * Lets us use <HouseInfo />
 */

var HouseInfo = React.createClass({
    getDefaultProps : function() {
        return {
            picture : '',
            description : ''
        };

    },

    propTypes : {
        picture : React.PropTypes.string,
        address : React.PropTypes.object.isRequired,
        description : React.PropTypes.string
    },

    render : function() {
        var {picture, address, description} = this.props;
        var {streetAddress, city, state} = address;
        return (
            <div className="house-info">
                <img src={picture} alt="No Image" />
                <h4>{streetAddress}, {city}, {state}</h4>
                <p>{description}</p>
            </div>
        )
    }
});

module.exports = HouseInfo;

var React = require('react');
import {Carousel} from 'react-responsive-carousel';

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
                <Carousel showArrows={true} showThumbs={false} dynamicHeight>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/1/" />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/2/" />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/3/" />
                        <p className="legend">Legend 3</p>
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/4/" />
                        <p className="legend">Legend 4</p>
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/5/" />
                        <p className="legend">Legend 5</p>
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/6/" />
                        <p className="legend">Legend 6</p>
                    </div>
                </Carousel>
                <h4>{streetAddress}, {city}, {state}</h4>
                <p>{description}</p>
            </div>
        )
    }
});

module.exports = HouseInfo;

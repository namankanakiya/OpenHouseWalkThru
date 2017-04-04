var React = require('react');
import {Carousel} from 'react-responsive-carousel';

/*
 * House Info
 * This component represents the part of the UI on the House Profile page where
 * a carousel of images, address, and description of the house are shown. Lets
 * us use <HouseInfo />
 */
var HouseInfo = React.createClass({
    /* 
     * This function initializes the properties of a House, picture and
     * description, with empty strings so they can be used later on in the code.
     * The picture property will be a string containing the link to the image
     * stored on an external data storage (Cloudinary). The description is just
     * a string containing any description that the user might have given to the
     * house.
     */
    getDefaultProps : function() {
        return {
            picture : '',
            description : ''
        };
    },

    /*
     * This block defines the data type of properties of the house, this time
     * introducing the address property. The address property is of type Object
     * that represents the address of a house. It contains the street address,
     * city, and state of the house's address. This is a required property
     * because a house cannot be identified without its address. picture and
     * description are defined to be strings.
     */
    propTypes : {
        picture : React.PropTypes.string,
        address : React.PropTypes.object.isRequired,
        description : React.PropTypes.string
    },

    /*
     * Loads the web scripts (HTML, CSS, JavaScript, etc.).
     */
    render : function() {
        // define variables to manage the properties
        var {picture, address, description} = this.props;
        // define the address property
        var {streetAddress, city, state} = address;
        return (
            <div className="house-info">
                <Carousel showArrows={true} showThumbs={false} dynamicHeight>
                    <div>
                        <img src={picture} />
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/2/" />
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/3/" />
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/4/" />
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/5/" />
                    </div>
                    <div>
                        <img src="http://lorempixel.com/900/500/sports/6/" />
                    </div>
                </Carousel>
                <h4>{streetAddress}, {city}, {state}</h4>
                <p>{description}</p>
            </div>
        )
    }
});

export default HouseInfo;

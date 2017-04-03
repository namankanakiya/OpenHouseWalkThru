var React = require('react');
var {connect} = require('react-redux');

// initial location consisting of latitute and logitude set to Atlanta
var INITIAL_LOCATION = {
    address: 'Atlanta, GA',
    position: {
        latitude: 33.7490,
        longitude: -84.3880
    }
};

// this controls the zoom level of the map
var INITIAL_MAP_ZOOM_LEVEL = 14;

// Coordinates of the Atlantic Ccean
var ATLANTIC_OCEAN = {
    latitude: 29.532804,
    longitude: -55.491477
};

/*
    This class creates a Map, which is used in the application to mark properties
    on a map. The map is generated using the Google Maps API, and uses the method 
    geocode which translates an address into appropriate latitute/longitude for mapping
*/
var Maps = React.createClass({

    // set initial address to Atlanta
    getInitialState: function () {
        return {
            isGeocodingError: false,
            foundAddress: INITIAL_LOCATION.address
        };
    },

    // this method translates the address into coordinates that can be uses to mark locations
    // on the map. It also checks if the provided address is valid
    geocodeAddress: function (address) {

        // call method geocode from Google API
        this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

            // check if the passes address is valid
            if (status === google.maps.GeocoderStatus.OK) {

                // store the address in the state in foundAddress
                this.setState({
                    foundAddress: results[0].formatted_address,
                    isGeocodingError: false
                });

                // set the marker to the found address
                this.map.setCenter(results[0].geometry.location);
                this.marker.setPosition(results[0].geometry.location);

                

                return;
            }

            // if provided address is not valid, then update the state to contain "null" address
            // and set the map location to initial location set previously.
            this.setState({
                foundAddress: null,
                isGeocodingError: true
            });

            this.map.setCenter({
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            });

            this.marker.setPosition({
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            });
        }.bind(this));
    },

    // Handles form submission. Useful when the user enters a location to look up on the map
    handleFormSubmit: function (submitEvent) {
        submitEvent.preventDefault();
        var address = this.searchInputElement.value;
        this.geocodeAddress(address);
    },

    // creates the map 
    componentDidMount: function () {
        var mapElement = this.mapElement;

        // initial map setup
        this.map = new google.maps.Map(mapElement, {
            zoom: INITIAL_MAP_ZOOM_LEVEL,
            center: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        });

        // sets the marker for the map
        this.marker = new google.maps.Marker({
            map: this.map,
            position: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        });

        // calls the geocodeAddress() method with the property address as an input
        this.geocoder = new google.maps.Geocoder();
        var address = this.props.address;
        var city = this.props.city;
        var state = this.props.state;
        if (address && city && state) {
            var fullAddress = address + ", " + city + ", " + state;
            this.geocodeAddress(fullAddress);
        }
    },
    
    setSearchInputElementReference: function (inputReference) {
        this.searchInputElement = inputReference;
    },

    setMapElementReference: function (mapElementReference) {
        this.mapElement = mapElementReference;
    },

    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                    {/*}
                        <form className="form-inline" onSubmit={this.handleFormSubmit}>
                        <div className="row">
                        <div className="col-xs-8 col-sm-10">
                        <div className="form-group">
                        <label className="sr-only" htmlFor="address">Address</label>
                        <input type="text" className="form-control input-lg" id="address" placeholder="London, United Kingdom" ref={this.setSearchInputElementReference} required />
                        </div>

                        </div>
                        <div className="col-xs-4 col-sm-2">

                        <button type="submit" className="btn btn-default btn-lg">
                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                        </button>

                        </div>
                        </div>
                        </form>
                    */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="map" ref={this.setMapElementReference}></div>
                        {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p></p> }
                    </div>
                </div>
            </div>
        );
    }
});

export default connect()(Maps);

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
            foundAddress: INITIAL_LOCATION.address,
            poiMarkers : [],
            addressLoc : false
        };
    },

    addMarker : function(address, name) {
        this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                this.newMarker = new google.maps.Marker({
                    map: this.map,
                    position: results[0].geometry.location
                });
                var newMarker2 = this.newMarker;
                this.setState({poiMarkers : [...this.state.poiMarkers, this.newMarker]})
                var homeLoc = this.state.addressLoc;
                var newDist = false;
                if (homeLoc) {
                    var rad = function(x) {
                      return x * Math.PI / 180;
                    };

                    var getDistance = function(p1, p2) {
                      var R = 6378137; // Earth’s mean radius in meter
                      var dLat = rad(p2.lat() - p1.lat());
                      var dLong = rad(p2.lng() - p1.lng());
                      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
                        Math.sin(dLong / 2) * Math.sin(dLong / 2);
                      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                      var d = (R * c) / 1609.34;
                      return d.toFixed(2); // returns the distance in miles
                    };
                    newDist = getDistance(homeLoc, results[0].geometry.location);
                }
                

                this.bounds.extend(this.newMarker.getPosition());
                this.map.fitBounds(this.bounds);
                google.maps.event.addListener(this.newMarker, 'click', function() {
                    if (newDist) {
                        var html = "<div> <h4>" + name + "</h4>" + "<p>" + address + "</p> <p>" + newDist + " miles away from house </p></div>"
                    } else {
                        var html = "<div> <h4>" + name + "</h4>" + "<p>" + address + "</p> </div>"
                    }
                    if (this.oldIw) {
                        this.oldIw.close();
                    }
                    var iw = new google.maps.InfoWindow({
                        content : html
                    });
                    iw.open(this.map, newMarker2);
                    this.oldIw = iw;
                })
            }
        }.bind(this));
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
                    isGeocodingError: false,
                    title : "hello"
                });

                // set the marker to the found address
                this.map.setCenter(results[0].geometry.location);
                this.marker.setPosition(results[0].geometry.location);
                this.setState({addressLoc : results[0].geometry.location});
                this.bounds.extend(this.marker.getPosition());
                this.map.fitBounds(this.bounds)
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
        this.oldIw = false;
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
            icon : "https://maps.google.com/mapfiles/ms/icons/blue.png",
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
        this.bounds = new google.maps.LatLngBounds()
        var {poi} = this.props;
        if (address && city && state) {
            var fullAddress = address + ", " + city + ", " + state;
            this.geocodeAddress(fullAddress);
        }
        poi.map((poi) => {
            this.addMarker(poi.address, poi.name);
        });
        this.map.fitBounds(this.bounds);
    },

    componentWillUnmount : function () {

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

export default connect((state) => {
        return {
            poi : state.poi
        }
    })(Maps);

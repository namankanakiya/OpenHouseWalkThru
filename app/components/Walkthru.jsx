var React = require('react');
var {connect} = require('react-redux');
var ohwtAPI = require('ohwtAPI');
var FeatureDetails = require('FeatureDetails');

var Walkthru = React.createClass({
    render: function(){
        var {houses, dispatch} = this.props;
        var id = this.props.params.id;
        var house = ohwtAPI.findHouseById(houses, id);
        const HOUSE_URL = "/houseprofile/" + id;
        var checklist = house.checklist;
        return(
            <div className='walkthru'>
                <div className="row small-up-2 medium-up-3">
                    <h1>Walkthru for {house.address}</h1>
                    {checklist.map((feature) => {
                        return (
                            <FeatureDetails key={feature.id} checklistId={feature.id} houseId={id} rating={feature.rating} priority={feature.priority} feature={feature.feature} comments={feature.comments}/>
                        )
                    })}
                </div>
            </div>
        )
    }
});

module.exports = connect(
    (state) => {
        return {
            houses : state.houses
        }
    }
)(Walkthru);    
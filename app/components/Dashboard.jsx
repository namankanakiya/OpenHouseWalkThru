var React = require('react');
var HouseSummary = require('HouseSummary');
var {connect} = require('react-redux');
var {Link} = require('react-router');

var Dashboard = React.createClass({
    render : function() {
        var {houses} = this.props;
        return (
            <div>
                <h1 className="page-title">Dashboard</h1>
                <div className="card-map">
                    <p>MAP GOES HERE (coming soon)...</p>
                </div>
                <p><Link to="/addhouse">Add House</Link></p>
                <div className="row small-up-2 medium-up-3">
                    {houses.map((house) => {
                        {var {id, address, city, state, zipcode, score, imageurl} = house;}
                        {}
                        return <HouseSummary key={id} id={id} address={address} city={city} state={state} zipcode={zipcode} score={score} imageurl={imageurl}/>
                    })}
                </div>
            </div>
        );
    }
});

module.exports = connect(
    (state) => {
        return {
            houses : state.houses
        }
    }
)(Dashboard);

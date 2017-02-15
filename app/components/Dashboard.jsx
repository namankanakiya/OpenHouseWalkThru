var React = require('react');
var HouseSummary = require('HouseSummary');
var {connect} = require('react-redux');
var {Link} = require('react-router');

var Dashboard = React.createClass({
    render : function() {
        var {houses} = this.props;

        var heading = {
        	position: "relative",
    		left: "40%",
    		width: 30,
    		height:18,
    		marginBottom: 40,
    		marginRight: -18, /*set to a negative number 1/2 of your width*/
    		font: "Courier New"
        };

        var headerStyle = {
        	marginLeft: "90%" 
        };

        return (
            <div>
                <h1 className="page-title" style={heading}>Dashboard</h1>
                <Link to="/addhouse" className="button secondary" style={headerStyle}>Add House</Link>
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

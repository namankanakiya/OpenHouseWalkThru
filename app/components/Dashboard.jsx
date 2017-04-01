var React = require('react');
var HouseSummary = require('HouseSummary').default;
var {connect} = require('react-redux');
var {Link} = require('react-router');
var ohwtAPI = require('ohwtAPI');

import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import {GridList, GridTile} from 'material-ui/GridList';

var Dashboard = React.createClass({
    componentWillMount : function() {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },
    componentWillUpdate : function(nextProps, nextState) {
        var {loggedIn} = this.props;
        if (!loggedIn.loggedIn) {
            this.props.router.push('/login');
        }
    },
    doSomething : function(isChecked) {
        this.setState({sort : !this.state.sort});
    },
    getInitialState : function() {
        return {sort : false};
    },
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

        if (this.state.sort) {
            houses = ohwtAPI.sortHouses(houses);
        }

        return (
            <div>
                <h1 className="page-title" style={heading}>Dashboard</h1>
                <div className="row">
                    <div className="small-3 medium-2 columns">    
                        <Toggle label="Sort by Score" toggled={this.state.sort} onToggle={(event, checked) => this.doSomething(checked)} />
                    </div>
                    <div className="small-3 medium-3 columns">
                        <Link to="/addhouse"><RaisedButton style={{marginBottom : "10px"}} primary label="Add House" /></Link>
                    </div>
                </div>
                <GridList style={{marginTop : "1rem"}} cols="4" padding>
                    {houses.map((house) => {
                        {var {id, address, city, state, zipcode, score, imageurl} = house;}
                        return <HouseSummary key={id} id={id} address={address} city={city} state={state} zipcode={zipcode} score={score} imageurl={imageurl} />
                    })}
                </GridList>
            </div>
        );
    }
});

export default connect(
    (state) => {
        return {
            houses : state.houses,
            loggedIn : state.loggedIn
        }
    }
)(Dashboard);

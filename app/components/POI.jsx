// React imports
var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var ohwtAPI = require('ohwtAPI');
var {Link} = require('react-router');

// UI imports
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/*
 * This component represents the page that shows the points of interest of the
 * user where you can add, edit, or remove points of interest.
 */
var POI = React.createClass({
    addPOI : function(e) {
        e.preventDefault();

        var poiName = this.refs.POIName.value;
        var poiAddr = this.refs.POIAddr.value;

        var {dispatch} = this.props;
        var {loggedIn} = this.props;
        dispatch(actions.startAddPOI(poiName, poiAddr, loggedIn.userId));

        console.log(poiName);
        console.log(poiAddr);
    },

    /*
     * Loads the web scripts (HTML, CSS, JavaScript, etc.).
     */
    render : function() {
        var {POI, loggedIn, dispatch} = this.props;
        var renderStuff = ""
        if (POI.length == 0) {
            renderStuff = (
                <h1>Add your first Point of Interest!</h1>
            )
        }
        return (
            <Paper zDepth={3}>
                {renderStuff}
                <Table>
                    <TableBody
                        stripedRows={false}
                        displayRowCheckbox = {false}>
                        {
                            POI.map((poi) => {
                                return (
                                    <TableRow key={poi.id}>
                                        <TableRowColumn>
                                            <p>{poi.name}</p>
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            <p>{poi.address}</p>
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            <RaisedButton onClick={() => 
                                            {dispatch(actions.startDeletePOI(loggedIn.userId, poi.id))}}>
                                                Delete
                                            </RaisedButton>
                                        </TableRowColumn>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

                <br/>
                <div>
                    <form onSubmit={this.addPOI}>
                        <input type="text" ref="POIName" placeholder="Name of POI (ex. Work, Mall)" />
                        <input type="text" ref="POIAddr" placeholder="Address of POI"/>
                        <button className="button primary">Add POI</button>
                    </form>
                    <Link to="/userprofile" activeClassName="active-link">
                        <button>Go back</button>
                    </Link>
                </div>
            </Paper>
        );
    }
});

export default connect((state) => {
    return {
        loggedIn : state.loggedIn,
        POI : state.poi
    }
})(POI);

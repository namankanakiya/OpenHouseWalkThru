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

var POI = React.createClass({
    render : function() {
        return (
            <Paper zDepth={3}>
                <Table>
                    <TableBody
                        stripedRows={false}
                        displayRowCheckbox = {false}>
                        <TableRow>
                            <TableRowColumn>
                                <p>Work</p>
                            </TableRowColumn>
                            <TableRowColumn>
                                <p>266 Ferst Dr NW, Atlanta, GA 30332</p>
                            </TableRowColumn>
                            <TableRowColumn>
                                <RaisedButton>Delete</RaisedButton>
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>
                                <p>Walmart</p>
                            </TableRowColumn>
                            <TableRowColumn>
                                <p>1801 Howell Mill Rd NW, Atlanta, GA 30318</p>
                            </TableRowColumn>
                            <TableRowColumn>
                                <RaisedButton>Delete</RaisedButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>

                <br/>
                <div>
                    <form>
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

export default POI;

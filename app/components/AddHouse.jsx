var React = require('react');
import SyncValidationForm from './SyncValidationForm';
var uuid = require('node-uuid');
var {connect} = require('react-redux');
var actions = require('actions');
var {Link} = require('react-router');

var AddHouse = React.createClass({
    addHouse : function(e) {
        var {address, city, state, zipcode, description, imageurl} = e;
        var {dispatch} = this.props;
        var house = {
            id : uuid(),
            address : address,
            city : city,
            state : state,
            zipcode : Number(zipcode),
            description : description,
            imageurl : imageurl,
            score : -1,
            checklist : [{
                    id : uuid(),
                    feature : 'Big Garage'
                },{
                    id : uuid(),
                    feature : 'Great Lighting'
                },{
                    id : uuid(),
                    feature : 'Wooden Floors'
                },{
                    id : uuid(),
                    feature : 'Wooden Floors'
                }]
        }
        dispatch(actions.addHouse(house));
        this.props.router.push('/');
    },
    render: function() {
        var oldBody = (<div>
                <form onSubmit={this.addHouse}>
                    <label>
                        Address:
                        <input type="text" name="address" ref="address"/>
                    </label>
                    <label>
                        City:
                        <input type="text" name="city" ref="city"/>
                    </label>
                    <label>
                        State:
                        <input type="text" name="State" ref="state"/>
                    </label>
                    <label>
                        ZipCode:
                        <input type="text" name="zipcode" ref="zipcode"/>
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" ref="description"/>
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="imageurl" ref="imageurl"/>
                    </label>
                    <button type="submit" className="button primary">Add House</button>
                    {/*<button className="button primary" type="button">Upload Photos</button>*/}
                </form>
                <Link to="/"><button className="button secondary">Back</button></Link>
            </div>);
        return (
            <SyncValidationForm onSubmit={this.addHouse}/>
        )
    }
});

module.exports = connect()(AddHouse);

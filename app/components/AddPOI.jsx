var React = require('react');
var UserProfile = require('UserProfile').default;
var {Link} = require('react-router');

var AddPOI = React.createClass({
    render : function() {
        return (
            <div className="add-poi-div">
                <Link to="/userprofile"><button type="button" className="button secondary">Back</button></Link>
                <div className="box">
                    <h3 className="row align-center">
                        <div className="small-8 columns" style={{marginLeft : "20%"}}>
                            <h3>Add a POI</h3>
                        </div>
                    </h3>
                    <form>
                        <div className="row align-center">
                            <div className="small-8 columns" style={{marginLeft : "20%"}}>
                                <label>Address:
                                    <input name="address" type="text" />
                                </label>
                                <label>City:
                                    <input name="address" type="text" />
                                </label>
                                <label>State:
                                    <input name="address" type="text" />
                                </label>
                                <label>Zip Code:
                                    <input name="address" type="text" />
                                </label>
                            </div>
                        </div>
                        <div className="row align-center">
                            <div className="small-8 medium-12 columns" style={{marginLeft : "20%"}}>
                                <a href="/userprofile"><button type="submit" className="button primary">Submit</button></a>
                                <button type="button" className="button secondary">Clear Values</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});

export default AddPOI;

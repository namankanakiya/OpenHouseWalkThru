var React = require('react');

var AddHouse = React.createClass({
    render: function() {
        return (
            <div>
                <form action="/">
                    <label>
                        Address:
                        <input type="text" name="address" />
                    </label>
                    <label>
                        City:
                        <input type="text" name="city" />
                    </label>
                    <label>
                        State:
                        <input type="text" name="State" />
                    </label>
                    <label>
                        ZipCode:
                        <input type="text" name="zipcode" />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" />
                    </label>
                    <button type="submit" className="button primary">Add House</button>
                    <button className="button primary">Upload Photos</button>
                </form>
                <a href="/"><button className="button secondary">Back</button></a>
            </div>
        )
    }
});

module.exports = AddHouse;

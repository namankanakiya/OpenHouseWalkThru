var React = require('react');

var AddHouse = React.createClass({
  render: function() {
    return (
    	<div >
    		<form>
                Address:<br/>
	            <input type="text" name="address" /><br/>
	            City:<br/>
	            <input type="text" name="city" /> <br/>
	            State:<br/>
	            <input type="text" name="State" /><br/>
	            ZipCode:<br/>
	            <input type="text" name="zipcode" /><br/>
	            Description:<br/>
	            <input type="text" name="description" /><br/><br/>
	            <p><a href="/#/dashboard">Add House</a></p>
	            <input type="button" value="Upload Pictures"/>
	        </form>
    	</div>       
    )
   } 
});

module.exports = AddHouse;

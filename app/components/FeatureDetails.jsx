var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var FeatureDetails = React.createClass({
	updateComments : function(e) {
		var comments = e.currentTarget.value;
		var {dispatch, houseId, checklistId} = this.props;
		var box = this.refs.commentBox;
		dispatch(actions.updateComments(houseId, checklistId, comments));
	},
    render: function() {
    	var {rating, priority, feature, comments, houseId, checklistId} = this.props;
    	var ratingChanged = (e) => {
			var rating = e.currentTarget.value;
			var {dispatch, houseId, checklistId} = this.props;
			dispatch(actions.updateRating(houseId, checklistId, rating));
		};
		return (
		 	<div>
    		 	<article className="website-example row wide">
 				    <div className="large-6 columns">
 				      <div className="row">
 				        <div className="small-12 columns">
 				          <img src="https://static.pexels.com/photos/24353/pexels-photo.jpg" alt="Mini Cooper Site Desktop Image"/>
 				        </div>
 				      </div>
 				    </div>
 				    <div className="large-6 columns" style={{"paddingTop" : "100px"}}>
 				      <h3 className="text-center">{feature}</h3>
 				      <p>
 				      	<textarea onBlur={this.updateComments} defaultValue={comments} ref="commentBox"></textarea>
 				      </p>
 				        <fieldset>
 				        	<span className="star-cb-group">
		  				      <input type="radio" id={feature + "5"} name={feature + "5"} value="5" checked={rating === 5} onChange={(e) => ratingChanged(e)}/><label htmlFor={feature + "5"} >5</label>
							  <input type="radio" id={feature + "4"} name={feature + "4"} value="4" checked={rating === 4} onChange={(e) => ratingChanged(e)}/><label htmlFor={feature + "4"} >4</label>
							  <input type="radio" id={feature + "3"} name={feature + "3"} value="3" checked={rating === 3} onChange={(e) => ratingChanged(e)}/><label htmlFor={feature + "3"} >3</label>
							  <input type="radio" id={feature + "2"} name={feature + "2"} value="2" checked={rating === 2} onChange={(e) => ratingChanged(e)}/><label htmlFor={feature + "2"} >2</label>
						      <input type="radio" id={feature + "1"} name={feature + "1"} value="1" checked={rating === 1} onChange={(e) => ratingChanged(e)}/><label htmlFor={feature + "1"} >1</label>
 				        	</span>
 				        </fieldset>
 				    </div>
			  	</article>
    		 </div>
    	)
    }
});

module.exports = connect()(FeatureDetails);
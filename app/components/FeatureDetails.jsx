var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var ImageUpload = require('ImageUpload').default;

var FeatureDetails = React.createClass({
    pictureAdded : function(picture) {
        var {dispatch, houseId, checklistId} = this.props;
        this.setState({pictureUrl : picture});
        dispatch(actions.startUpdatePhoto(houseId, checklistId, picture));
    },
    componentWillMount : function() {
        var {picture} = this.props;
        if (picture) {
            this.setState({pictureUrl : picture});
        } else {
            this.setState({pictureUrl : "https://s-media-cache-ak0.pinimg.com/originals/54/ec/0a/54ec0a14670d5a34edcab1f8e04720e8.jpg"});
        }
    },
    updateComments : function(e) {
        var comments = e.currentTarget.value;
        var {dispatch, houseId, checklistId} = this.props;
        var box = this.refs.commentBox;
        dispatch(actions.startUpdateComments(houseId, checklistId, comments));
    },
    render: function() {
        var {rating, priority, feature, comments, houseId, checklistId, picture} = this.props;
        var ratingChanged = (e) => {
            var rating = e.currentTarget.value;
            var {dispatch, houseId, checklistId} = this.props;
            dispatch(actions.startUpdateRating(houseId, checklistId, rating));
        };
        /*
        var addedPhoto;

        if (pictureUrl != '') {
            addedPhoto = pictureUrl;
        } else {
            addedPhoto = "https://s-media-cache-ak0.pinimg.com/originals/54/ec/0a/54ec0a14670d5a34edcab1f8e04720e8.jpg";
        }
        */
        return (
            <div>
                <article className="website-example row wide">
                    <div className="large-6 columns">
                      <div className="row">
                        <div className="small-12 columns">
                          <img src={this.state.pictureUrl} alt="Mini Cooper Site Desktop Image"/>
                        </div>
                      </div>
                    </div>
                    <div className="large-6 columns" style={{"paddingTop" : "100px"}}>
                      <h3 className="text-center">{feature}</h3>
                      <p>
                        <textarea onBlur={this.updateComments} defaultValue={comments} ref="commentBox"></textarea>
                      </p>
                      <p><ImageUpload featurePhoto = {this.pictureAdded}/> </p>
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

export default connect()(FeatureDetails);

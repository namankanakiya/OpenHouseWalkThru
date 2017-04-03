var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var ImageUpload = require('ImageUpload').default;

import {Carousel} from 'react-responsive-carousel';

/*
    This class handles adding photos, comments, priority and ratings to
    features during the WalkThru.
    Please note that checkListId here represents the feature "number". Eg: Light
*/
var FeatureDetails = React.createClass({

    // handles adding photos
    pictureAdded : function(picture) {
        // store houseId, checklistId, numPics as props
        var {dispatch, houseId, checklistId, numPics} = this.props;
        numPics = parseInt(numPics) + 1;

        // call startUpdatePhoto from actions to upload image URL to Firebase
        dispatch(actions.startUpdatePhoto(houseId, checklistId, picture, numPics));
    },

    // handles writing a comment for a feature
    updateComments : function(e) {
        var comments = e.currentTarget.value;
        var {dispatch, houseId, checklistId} = this.props;
        var box = this.refs.commentBox;

        // call startUpdateComments from actions to upload comment for the specific
        // feature to Firebase
        dispatch(actions.startUpdateComments(houseId, checklistId, comments));
    },

    render: function() {
        // store rating, priority, feature, comments, houseId, checklistId, picture url, numPics
        // house as props for easy manipulation
        var {rating, priority, feature, comments, houseId, checklistId, picture, numPics, house} = this.props;
        
        // method to change rating. Rating is obtained from the radio inputs in the class start-cb-group
        var ratingChanged = (e) => {
            var rating = e.currentTarget.value;
            // check to see if rating is valid
            try {
                rating = parseInt(rating);
            } catch (e) {
                console.log(e);
            }
            var {dispatch, houseId, checklistId} = this.props;

            // call startUpdateRating from actions to update rating of the feature in Firebase
            dispatch(actions.startUpdateRating(houseId, checklistId, rating));
        };

        // this block of code handles multiple images uploaded for a single feature. They're split by 
        // the delimiter ";". If no images uploaded, a default image is shown to the user.
        if (numPics > 0 && picture) {
            var splitArray = picture.split(';');
            var index = splitArray.indexOf("");
            if (index > -1) {
                splitArray.splice(index, 1);
            }
        } else {
            var splitArray = ["https://s-media-cache-ak0.pinimg.com/originals/54/ec/0a/54ec0a14670d5a34edcab1f8e04720e8.jpg"];
        }

        return (
            <div>
                <article className="website-example row wide">
                    <div className="large-6 columns">
                        <div className="row">
                            <div className="small-12 columns">
                                <Carousel showArrows={true} showThumbs={false} axis="horizontal" dynamicHeight>
                                    {
                                        splitArray.map((url, index) => {
                                            if (index <= numPics) {
                                                return <div><img src={url}/></div>;
                                            }
                                        })
                                    }
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div className="large-6 columns">
                        <h3 className="text-center">{feature}</h3>
                        <p>
                            <textarea onBlur={this.updateComments} defaultValue={comments} ref="commentBox" />
                        </p>
                        <p>
                            <ImageUpload featurePhoto = {this.pictureAdded} />
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

export default connect()(FeatureDetails);

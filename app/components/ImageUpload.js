var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var actions = require('actions');

import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'w3ktvtk0';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/open-house-walk-thru/upload';

/*
    This class provides support to upload images on Open House Walk Thru
    It utilizes cloudinary to store images, which generates links that
    can be used to load images. Secondly, we're utilizing an external library
    Dropzone to handle dropping images.
*/
var ImageUpload = React.createClass({

    // set initial file to null and image URL to ''
    getInitialState : function() {
        return {uploadedFile: null, uploadedFileCloudinaryUrl: ''};
    },

    // this function sets the state to contain the dropped image in uploadedFile
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        // calls handleImageUpload by passing in the dropped image as a param
        this.handleImageUpload(files[0]);
    },

    // uploads the image to cloudinary using a preset 
    handleImageUpload(file) {

        var func = this.props.featurePhoto;

        // calls Cloudinary method to upload image
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            // image upload not successful.
            if (err) {
                console.error(err);
            }

            // this conditional checks if a valid image url is returned by Cloudinary
            // that is, the image uploaded is valid.
            if (response.body.secure_url !== '') {
                // store the generated image URL as a state in uploadedFileCloudinaryUrl
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
                var {dispatch} = this.props;

                // calls currentImageURL() from actions to inject URL into firebase
                // and update internal state
                dispatch(actions.currentImageURL(response.body.secure_url));
                if (func) {
                    func(response.body.secure_url);
                }
            }
        });
    },

    render() {
        return (
            <div>
                <div className="FileUpload">
                    <Dropzone
                        onDrop={this.onImageDrop}
                        multiple={false}
                        accept="image/*" className="imageUploadBox">
                        <p>Click to upload /<br/>Drag an image</p>
                    </Dropzone>
                </div>
            </div>
        )
    }
});

export default connect()(ImageUpload);

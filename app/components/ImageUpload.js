import Dropzone from 'react-dropzone';
import request from 'superagent';

var React = require('react');
var {Link} = require('react-router');
var uuid = require('human-readable-ids').hri;
var {connect} = require('react-redux');
var actions = require('actions');

const CLOUDINARY_UPLOAD_PRESET = 'w3ktvtk0';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/open-house-walk-thru/upload';

var ImageUpload = React.createClass({

    getInitialState : function() {

        return {uploadedFile: null, uploadedFileCloudinaryUrl: ''};
    },

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]

    });

    this.handleImageUpload(files[0]);
  },

  handleImageUpload(file) {
    var func = this.props.featurePhoto;
    console.log(func);
    console.log(this.props);
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        var {dispatch} = this.props;
        dispatch(actions.currentImageURL(response.body.secure_url));
        if (func) {
          func(response.body.secure_url);
        }
        console.log(response.body.secure_url);
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
                accept="image/*" className="box">
                <div>Drop an image</div>
              </Dropzone>
            </div>
        </div>
    )
  }
});

export default connect()(ImageUpload);
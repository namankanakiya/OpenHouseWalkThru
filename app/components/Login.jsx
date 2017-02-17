var React = require('react');

var Login = React.createClass({
    render : function() {

    var mainContainer = {
      backgroundImage: "url(https://s-media-cache-ak0.pinimg.com/originals/41/2f/6c/412f6c9f290bdaff0fdb5af49e139adb.jpg)",
      backgroundSize: "100% 100%",
      opacity: 0.8
    }
    var box = {
      backgroundColor: "white",
      marginTop: "5%",
      marginLeft: "33%",
      width: 420,
      border: "1px solid black",
      opacity: 0.9
    };

    var logHeader = {
      marginLeft: "32%"
    };

    var logImage = {
      marginLeft: "23%",
      marginBottom: 10
    };

    var formFields = {
      marginLeft: "16%"
    }

    var formInputs = {
      width: 250
    }

    var logButton = {
      marginLeft: "65%"
    }

    return (
      <div style={mainContainer}>
      <div style={box}>
        <h1 className="row align-center">
          <div className="small-6 columns" style={logHeader}>
            Login
          </div>
        </h1>
        <form id="login-form" data-abide noValidate action="/#/">
        <div>
            <img src="http://calibratedadvisory.com/user/img_avatar2.png" alt="Avatar" className="avatar" style={logImage}/>
          </div>
          <div style = {formFields}>
          <div className="row align-center">
            <div className="small-6 columns">
              <div data-abide-error role="alert" className="alert callout" style={{display: 'none'}}>
                <p><i className="fi-alert"></i> There are some errors in your form.</p>
              </div>
            </div>
          </div>
          <div className="row align-center">
            <div className="small-6 columns ">
              <label>Username
                <input type="text" name="username" style={formInputs} />
                <span className="form-error">Username is required</span>
              </label>
            </div>
          </div>
          <div className="row align-center">
            <div className="small-6 columns ">
              <label>Password
                <input type="password" name="password" required style={formInputs}/>
                <span className="form-error">Password is required</span>
              </label>
            </div>
          </div>
          <div className="row align-center">
            <div className="small-6 columns ">
              <button type="submit" className="button" style={logButton}>Login</button>
            </div>
          </div>
          </div>
        </form>
      </div>
      </div>);
  }
});

module.exports = Login;
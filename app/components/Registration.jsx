var React = require('react');

var Registration = React.createClass({

    {/*function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }*/}

    render : function() {

    var mainContainer = {
            opacity: 0.75,
            backgroundSize: "100% 100%",
            backgroundImage: "url(https://s-media-cache-ak0.pinimg.com/originals/41/2f/6c/412f6c9f290bdaff0fdb5af49e139adb.jpg)",
            height: "690"
    };
    
    var box = {
        marginTop: "80",
        marginLeft: "33%",
        backgroundColor: "white",
        border: "1px solid black",
        opacity: 0.9,
        width: 420,
        position: "fixed",
        opacity: 0.9
    };

    var regHeader = {
      marginLeft: "17%"
    };

    var regImage = {
      marginLeft: "25%",
      marginBottom: 10
    };

    var formFields = {
      marginLeft: "18%"
    }

    var formInputs = {
      width: 250
    }

    var regButton = {
      marginLeft: "60%"
    }

    return (
      <div style={mainContainer}>
      <div style={box}>
        <h1 className="row align-center">
          <div className="small-6 columns" style={regHeader}>
            Registration
          </div>
        </h1>
        <form id="login-form" data-abide noValidate action="/#/login">
          <div>
            <img src="http://calibratedadvisory.com/user/img_avatar2.png" alt="Avatar" className="avatar" style={regImage}/>
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
                <input type="password" name="password" required style={formInputs} />
                <span className="form-error">Password is required</span>
              </label>
            </div>
          </div>
          <div className="row align-center">
            <div className="small-6 columns ">
              <button type="submit" className="button" style={regButton}>Register</button>
            </div>
          </div>
          </div>
        </form>
      </div>
      </div>);
  }
});

export default Registration;
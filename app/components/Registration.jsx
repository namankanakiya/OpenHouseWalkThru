import firebase, {firebaseRef} from 'app/firebase';
var {connect} = require('react-redux'); // Redux
var actions = require('actions');

var React = require('react');

var Registration = React.createClass({

    register : function(e) {
        e.preventDefault();

        var name = this.refs.name.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        console.log(name, email, password);

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
        }).then((user) => {
            var uid = user.uid;
            var {dispatch} = this.props;
            dispatch(actions.startRegisterUser(uid, name));
            this.props.router.push('/');
        });
    },

    render : function() {
        var mainContainer = {
            opacity: 0.75,
            backgroundSize: "100% 100%",
            backgroundImage: "url(https://s-media-cache-ak0.pinimg.com/originals/41/2f/6c/412f6c9f290bdaff0fdb5af49e139adb.jpg)",
            paddingTop: "4%",
            height: "690"
        };

        var box = {
            marginLeft: "33%",
            backgroundColor: "white",
            border: "1px solid black",
            opacity: 0.9,
            width: 420,
            position: "float",
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
                    <form id="registration-form" data-abide noValidate onSubmit={this.register}>
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
                                <div className="small-6 columns">
                                    <label> Name
                                        <input type="text" ref="name" style={formInputs} />
                                        <span className="form-error">Name is required</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row align-center">
                                <div className="small-6 columns">
                                    <label>Email
                                        <input type="text" ref="email" style={formInputs} />
                                        <span className="form-error">Email is required</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row align-center">
                                <div className="small-6 columns">
                                    <label>Password
                                        <input type="password" ref="password" required style={formInputs} />
                                        <span className="form-error">Password is required</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row align-center">
                                <div className="small-6 columns">
                                    <button type="submit" className="button" style={regButton}>Register</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

export default connect()(Registration);

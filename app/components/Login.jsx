var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var {Link} = require('react-router');
import firebase, {firebaseRef} from 'app/firebase';

var Login = React.createClass({
    login : function(e) {
        e.preventDefault();
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        } else {
            var email = this.refs.username.value;
            var password = this.refs.password.value;
            // Sign in with email and pass.
            // [START authwithemail]
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
                } else {
                alert(errorMessage);
                }
                console.log(error);
                document.getElementById('quickstart-sign-in').disabled = false;
                // [END_EXCLUDE]
            }).then((user) => {
                var uid = user.uid;
                var {dispatch} = this.props;
                dispatch(actions.loginUser(uid));
                this.props.router.push('/')
            });
            // [END authwithemail]
        }
    },
    componentWillMount : function() {
        var {loggedIn} = this.props;
        if (loggedIn.loggedIn) {
            this.props.router.push('/');
        }
    },

    componentWillUpdate : function(nextProps, nextState) {
        var {loggedIn} = this.props;
        console.log("loggedin", loggedIn);
        if (loggedIn.loggedIn) {
            this.props.router.push('/');
        }
    },
    render : function() {
        var {loggedIn} = this.props;
        if (loggedIn.loggedIn) {
            var container = (<div>
                <p>Welcome back, you have been logged in!</p>
                                   <Link to="/">Please click here to continue</Link>
            </div> );
        } else {
            var container = (<div>
                <h1 className="row align-center">
                            <div className="small-6 columns" style={logHeader}>
                                Login
                            </div>
                        </h1>
                        <form id="login-form" data-abide noValidate onSubmit={this.login}>
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
                                            <input type="text" ref="username" style={formInputs} />
                                            <span className="form-error">Username is required</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row align-center">
                                    <div className="small-6 columns ">
                                        <label>Password
                                            <input type="password" ref="password" required style={formInputs}/>
                                            <span className="form-error">Password is required</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row align-center">
                                    <div className="small-6 columns ">
                                        <button type="submit" className="button">Login</button>
                                        <Link to="/register"><button className="button" style={{marginLeft : "1rem"}}>Register</button></Link>
                                    </div>
                                    <div className="small-6 columns ">
                                    </div>
                                </div>
                            </div>
                        </form>
            </div>);
        }
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

        var logHeader = {
            marginLeft: "33%"
        };

        var logImage = {
            marginLeft: "25%",
            marginBottom: 10
        };

        var formFields = {
            marginLeft: "18%"
        }

        var formInputs = {
            width: 250
        }

        var logButton = {
            marginLeft: "50%"
        }

        return (
            <div style={mainContainer}>
                <div style={box}>
                    {container}
                </div>
            </div>
        );
    }
});

export default connect((state) => {
    return {
        loggedIn : state.loggedIn
    }
})(Login);

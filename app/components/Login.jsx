var React = require('react');

var Login = React.createClass({
    render : function() {
    return (
      <div>
        <h1 className="row align-center">
          <div className="small-6 columns">
            Login
          </div>
        </h1>
        <form id="login-form" data-abide noValidate>
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
                <input type="text" name="username" />
                <span className="form-error">Username is required</span>
              </label>
            </div>
          </div>
          <div className="row align-center">
            <div className="small-6 columns ">
              <label>Password
                <input type="password" name="password" required />
                <span className="form-error">Password is required</span>
              </label>
            </div>
          </div>
          <div className="row align-center">
            <div className="small-6 columns ">
              <button type="submit" className="button">Login</button>
            </div>
          </div>
        </form>
      </div>);
  }
});

module.exports = Login;
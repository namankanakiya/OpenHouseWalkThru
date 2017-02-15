import React from 'react'
import { Field, reduxForm } from 'redux-form'
var {Link} = require('react-router');

const validate = values => {
  const errors = {}
  if (!values.address) {
    errors.address = 'Required'
  } 
  if (!values.city) {
    errors.city = 'Required'
  } else if (!/^[a-zA-Z ]*$/i.test(values.city)) {
    errors.city = 'Invalid city, no numbers, or special characters allowed'
  }
  if (!values.state) {
    errors.state = 'Required'
  } else if (!/^[a-zA-Z ]*$/i.test(values.state)) {
    errors.state = 'Invalid state, no numbers, or special characters allowed'
  }
  if (!values.zipcode) {
    errors.zipcode = 'Required'
  } else if (isNaN(Number(values.zipcode))) {
    errors.zipcode = 'Must be a number'
  }
  return errors
}

const warn = values => {
  const warnings = {}
/*  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }*/
  return warnings
}

const renderInputError = (input, label, type, touched, error, warning, labelHelp) => {
  var errorShadow = {
    "boxShadow" : "0 0 10px #CC0000"
  }
  var successShadow = {
    "boxShadow" : "0 0 8px #5cb85c"
  }
  if (touched && (error || warning)) {
    var toReturn = (<input style={errorShadow} {...input} placeholder={label} type={type} aria-describedby={labelHelp}/>)
  } else if (touched) {
    var toReturn = (<input style={successShadow} {...input} placeholder={label} type={type} aria-describedby={labelHelp}/>)
  } 
  else {
    var toReturn = (<input {...input} placeholder={label} type={type} aria-describedby={labelHelp}/>)
  }
  return toReturn
}

const renderField = ({ input, label, type, labelHelp, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      {renderInputError(input, label, type, touched, error, warning, labelHelp)}
      {touched && ((error && <p className="help-text" id={labelHelp}>{error}</p>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const SyncValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div>
        <h3 className="row align-center">
          <div className="small-7 columns">
            Add House Form
          </div>
        </h3>
        <form onSubmit={handleSubmit}>
            <div className="row align-center">
              <div className="small-7 columns ">
                <Field name="address" type="text" component={renderField} label="Address" labelHelp="AddressHelp"/>
                <Field name="city" type="text" component={renderField} label="City" labelHelp="CityHelp"/>
                <Field name="state" type="text" component={renderField} label="State" labelHelp="StateHelp"/>
                <Field name="zipcode" type="text" component={renderField} label="Zipcode" labelHelp="ZipcodeHelp"/>
                <Field name="description" type="text" component={renderField} label="Description" labelHelp="DescriptionHelp"/>
                <Field name="imageurl" type="text" component={renderField} label="Image URL" labelHelp="ImageURLHelp"/>
            </div>
              </div>
            <div className="row align-center">
              <div className="small-7 columns ">
                <a href="/#/"><button type="submit" className="button primary" disabled={submitting}>Submit</button></a>
                <button type="button" className="button secondary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                <Link to="/"><button type="button" className="button secondary">Back</button></Link>
            </div>
              </div>
        </form>
    </div>
  )
}

export default reduxForm({
  form: 'syncValidation',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(SyncValidationForm)
// React / Redux / Router imports
import React from 'react'
import { Field, reduxForm } from 'redux-form'
var {Link} = require('react-router');

// This constant is where you specify the requirements for each form field
const validate = values => {
    const errors = {}

    // Need an address value
    if (!values.address) {
        errors.address = 'Required'
    }

    // Need a city value, letters only
    if (!values.city) {
        errors.city = 'Required'
    } else if (!/^[a-zA-Z ]*$/i.test(values.city)) {
        errors.city = 'Invalid city, no numbers, or special characters allowed'
    }

    // Need a state value, letters only
    if (!values.state) {
        errors.state = 'Required'
    } else if (!/^[a-zA-Z ]*$/i.test(values.state)) {
        errors.state = 'Invalid state, no numbers, or special characters allowed'
    }

    // Need a zipcode value, official zipcode length only
    if (!values.zipcode) {
        errors.zipcode = 'Required'
    } else if (!/^\d{5}(?:[-]\d{4})?$/i.test(values.zipcode)) {
        errors.zipcode = 'Must be a valid zipcode (##### or #####-####)'
    }

    return errors
}

const warn = values => {
    const warnings = {}
    return warnings
}

const renderInputError = (input, label, type, touched, error, warning, labelHelp) => {
    // if there's an error, red boxshadow
    var errorShadow = {
        "boxShadow" : "0 0 10px #CC0000"
    }

    // if they succesfully filled it out, green box shadow
    var successShadow = {
        "boxShadow" : "0 0 8px #5cb85c"
    }

    if (touched && (error || warning)) {
        // if they have attempted to fill out the field, and there's an error
        var toReturn = (<input style={errorShadow} {...input} placeholder={label} type={type} aria-describedby={labelHelp}/>)
    } else if (touched) {
        // if they have attempted to fill out field, with no errors
        var toReturn = (<input style={successShadow} {...input} placeholder={label} type={type} aria-describedby={labelHelp}/>)
    } else {
        // if they haven't done anything (no box shadow needed)
        var toReturn = (<input {...input} placeholder={label} type={type} aria-describedby={labelHelp}/>)
    }

    return toReturn
}

const renderField = ({ input, label, type, labelHelp, meta: { touched, error, warning } }) => (
    // Container for the above, with error text appropriately styled
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
        <div className="add-house-div">
            <div className="box">
                <h3 className="row align-center">
                    <div className="small-8 columns" style={{marginLeft : "20%"}}>
                        <h3>Add a House</h3>
                    </div>
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="row align-center">
                        <div className="small-8 columns" style={{marginLeft : "20%"}}>
                            <Field name="address" type="text" component={renderField} label="Address" labelHelp="AddressHelp"/>
                            <Field name="city" type="text" component={renderField} label="City" labelHelp="CityHelp"/>
                            <Field name="state" type="text" component={renderField} label="State" labelHelp="StateHelp"/>
                            <Field name="zipcode" type="text" component={renderField} label="Zipcode" labelHelp="ZipcodeHelp"/>
                            <Field name="description" type="text" component={renderField} label="Description" labelHelp="DescriptionHelp"/>
                            <Field name="imageurl" type="text" component={renderField} label="Image URL" labelHelp="ImageURLHelp"/>
                        </div>
                    </div>
                    <div className="row align-center">
                        <div className="small-8 medium-12 columns" style={{marginLeft : "20%"}}>
                            <a href="/#/"><button type="submit" className="button primary" disabled={submitting}>Submit</button></a>
                            <button type="button" className="button secondary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                            <Link to="/"><button type="button" className="button secondary">Back</button></Link>
                        </div>
                    </div>
                </form>
            </div> 
        </div>
    )
}

export default reduxForm({
    form: 'syncValidation',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
    warn                     // <--- warning function given to redux-form
})(SyncValidationForm)

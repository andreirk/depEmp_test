import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../common/ErrorField'

class NewEmployeeForm extends Component {
  static propTypes = {

  };

  render() {
    return (
        <div >
          <form onSubmit={this.props.handleSubmit}>
            <div className="form-group">
              <Field  name="firstName" label="First name" component={ErrorField}/>
              <Field  name="lastName" label="Last name" component={ErrorField}/>
              <div>
                <label htmlFor="department">Department</label>
                <Field name="department" component="select">
                  <option></option>
                  {this.props.departments.map(el =>  <option  className="form-control" key={el.id} value={el.id}>{el.name}</option> )}
                </Field>
              </div>
            <div>
              <input type="submit" />
            </div>
            </div>
          </form>
        </div>
    )
  }
}

function validate({firstName,lastName }) {
  const errors = {}
  if (!firstName) errors.firstName = ' firstName is required'
  if (!lastName) errors.lastName = ' lastName is required'


  return errors
}

export default reduxForm({
  form: 'employee',
  validate
})(NewEmployeeForm)
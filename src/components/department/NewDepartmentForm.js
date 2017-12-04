import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../common/ErrorField'

class NewDepartmentForm extends Component {
  static propTypes = {

  };

  render() {
    return (
        <div >
          <form onSubmit={this.props.handleSubmit}>
            <div className="form-group">
              <Field  name="name" component={ErrorField}/>
            <div>
              <input type="submit" />
            </div>
            </div>
          </form>
        </div>
    )
  }
}

function validate({name}) {
  const errors = {}
  if (!name) errors.name = ' name is required'

  return errors
}

export default reduxForm({
  form: 'department',
  validate
})(NewDepartmentForm)
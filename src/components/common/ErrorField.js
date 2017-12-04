import React from 'react'

function ErrorField(props) {
  const {input, type, label, meta: {error, touched}} = props
  const errorText = touched && error && <div style={{color: 'red'}}>{error}</div>
  return (
      <div className="">
        <label>{label}</label>
        <input className="form-control" {...input} type={type}/>
        {errorText && <div className="alert alert-danger">{errorText}</div>}
      </div>
  )
}

export default ErrorField
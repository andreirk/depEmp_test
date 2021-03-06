import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, {moduleName as authModule} from '../redux/ducks/auth'

import departmentReducer, {moduleName as departmentsModule} from '../redux/ducks/departmens'
import employeeReducer, {moduleName as employeesModule} from '../redux/ducks/employees'
// import the root reducer


export default combineReducers({
  router, form,
  [authModule]: authReducer,
  [departmentsModule]: departmentReducer,
  [employeesModule]: employeeReducer,
})
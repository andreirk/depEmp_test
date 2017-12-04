import {all} from 'redux-saga/effects'
import {saga as departmentsSaga} from './ducks/departmens'
import {saga as employeesSaga} from './ducks/employees'
// import {saga as authSaga} from '../ducks/auth'


export default function * () {
  yield all([
    // authSaga(),
    departmentsSaga(),
    employeesSaga(),
  ])
}
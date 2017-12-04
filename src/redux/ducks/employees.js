import {all, takeEvery, put, call, take, select} from 'redux-saga/effects'
import {Record, OrderedMap, List, OrderedSet} from 'immutable'
import {createSelector} from 'reselect'
import {appName} from "../../config";
import {departmentApi, employeeApi} from "../../api/api";


/**
 * Constants
 * */
export const moduleName = 'employees'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`


export const CHANGE_EMPLOYEE = `${prefix}/CHANGE_EMPLOYEE`

export const ADD_EMPLOYEE = `${prefix}/ADD_EMPLOYEE`


/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  entities: new List([]),
  selected: new OrderedSet([])
})



export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action

  switch (type) {
    case FETCH_ALL_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
          .set('loading', false)
          .set('loaded', true)
          .set('entities', new List(payload))


    case CHANGE_EMPLOYEE:
      return state.mergeIn(['entities'],  new List(payload))

    case ADD_EMPLOYEE:
      const newEntities = state.entities.valueSeq().toArray()
      newEntities.push({
        id: newEntities.length,
        firstName: payload.firstName,
        lastName: payload.lastName,
        departmentId: payload.department

      })
      return state.mergeIn(['entities'],  new List(newEntities))

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)

export const employeesListSelector = createSelector(entitiesSelector, entities => {
                                                      return entities.valueSeq().toArray()})

/**
 * Action Creators
 * */

export function fetchAllEmployees() {
  return {
    type: FETCH_ALL_REQUEST
  }
}


export function chengeEmployee(payload) {

  return {
    type: CHANGE_EMPLOYEE,
    payload: payload
  }
}

export function addEmployee(payload) {
  console.log('-----change emploi action', payload)
  return {
    type: ADD_EMPLOYEE,
    payload: payload
  }
}



/**
 * Sagas
 * */

export function* fetchAllSaga() {

  yield put({
    type: FETCH_ALL_START
  })

  const snapshot = yield call(employeeApi.register)

  console.log('--department fethc-', snapshot)

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: snapshot
  })
}



export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
  ])
}
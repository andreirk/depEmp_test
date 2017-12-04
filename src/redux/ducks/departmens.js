import {all, takeEvery, put, call, take, select} from 'redux-saga/effects'
import {Record, OrderedMap, List, OrderedSet} from 'immutable'
import {createSelector} from 'reselect'
import {appName} from "../../config";
import {departmentApi} from "../../api/api";
import {generateId} from "./utils";


/**
 * Constants
 * */
export const moduleName = 'departments'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const CHANGE_DEPARTMENT_NAME = `${prefix}/CHANGE_DEPARTMENT_NAME`

export const ADD_DEPARTMENT = `${prefix}/ADD_DEPARTMENT`


/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  entities: new List([]),
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


    case CHANGE_DEPARTMENT_NAME:
      return state.mergeIn(['entities'],  new List(payload))

    case ADD_DEPARTMENT:
      const newEntities = state.entities.valueSeq().toArray()
      const newId = generateId();
      newEntities.push({id: newId, name: payload.name})
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
export const departmentListSelector = createSelector(entitiesSelector, entities => {
  console.log('---in selector--', entities)
  return entities.valueSeq().toArray()})

/**
 * Action Creators
 * */

export function fetchAllDepartments() {
  return {
    type: FETCH_ALL_REQUEST
  }
}


export function chengeDepartmentName(payload) {
  return {
    type: CHANGE_DEPARTMENT_NAME,
    payload: payload
  }
}

export function addDepartment(payload) {
  return {
    type: ADD_DEPARTMENT,
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

  const snapshot = yield call(departmentApi.register)

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
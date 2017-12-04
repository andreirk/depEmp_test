import {appName} from '../../config'
import {Record} from 'immutable'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {call, put, all, take} from 'redux-saga/effects'
import {replace} from 'react-router-redux'
import {googleAuthProvider} from "../../firebase/firebase";

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`
export const SIGN_OUT_ERROR = `${prefix}/SIGN_OUT_ERROR`


/**
 * Reducer
 * */


export default function reducer(state = {}, action) {
  const {type, payload} = action

  switch (type) {
    case SIGN_IN_REQUEST:
      return {
        uid: payload
      };
    case SIGN_OUT_REQUEST:
      return {};


    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const userSelector = createSelector(stateSelector, state => state.user)

/**
 * Action Creators
 * */

export const login = (uid) => ({
  type: SIGN_IN_REQUEST,
  payload: uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: SIGN_OUT_REQUEST
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};



/**
 * Sagas
 **/




import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, {moduleName as authModule} from '../redux/ducks/auth'


// import the root reducer


export default combineReducers({
  router, form,
  [authModule]: authReducer,
})
import {applyMiddleware, createStore} from 'redux';
import {routerMiddleware} from 'react-router-redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware, logger, thunk))


export default () => {
  const store = createStore(reducer, enhancer)

  sagaMiddleware.run(saga);

  return store;
};

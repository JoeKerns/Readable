import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import reducer from './reducers/reducers';

/*const logger = store => next => action => {
  //console.group(action.type)
  //console.info('dispatching', action)
  let result = next(action)
  //console.log('next state', store.getState())
  //console.groupEnd(action.type)
  return result
}*/

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

 ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)

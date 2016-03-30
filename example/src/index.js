import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import Naive from './Naive'
import CSV from './CSV'

const store = createStore(
  combineReducers(
    function() { return {}}),
  {},
  applyMiddleware()
)

render(
  <Provider store={store}>
    <CSV />
  </Provider>,
  document.getElementById('root')
)

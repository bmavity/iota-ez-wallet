// @flow
import { createStore, applyMiddleware } from 'redux'
import createIpc from 'redux-electron-ipc'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

import initializeModule from '../modules/initialize'
import rootReducer from '../reducers'
import type { counterStateType } from '../reducers/counter'


const { initializationProgress } = initializeModule.actions

const history = createBrowserHistory()
const router = routerMiddleware(history)
const ipc = createIpc({
  initializationProgress: (event, ...args) => initializationProgress(...args),
})
const enhancer = applyMiddleware(thunk, ipc, router)

function configureStore(initialState?: counterStateType) {
  return createStore(rootReducer, initialState, enhancer)
}

export default { configureStore, history }

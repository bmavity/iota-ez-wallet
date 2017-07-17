// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './counter'

import initialize from '../modules/initialize'


const rootReducer = combineReducers({
  counter,
  router,

  [initialize.constants.NAME]: initialize.reducer,
})

export default rootReducer

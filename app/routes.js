/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import HomePage from './containers/HomePage'
import CounterPage from './containers/CounterPage'

import { App } from './core/App'
import { Initialize } from './modules/initialize'

export default () => (
  <App>
    <Switch>
      <Route path="/init" component={Initialize} />

      <Route path="/counter" component={CounterPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  </App>
)

// @flow
import React, { Component } from 'react'
import type { Children } from 'react'

export default class App extends Component {
  props: {
    children: Children
  }

  render() {
    return (
      <div>
        <h1>Core App</h1>
        {this.props.children}
      </div>
    )
  }
}

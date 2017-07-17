// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createSeed } from '../actions'


const InitializationStep = ({ isComplete, isExecuting, name, text, }) =>
  <li>{text}</li>

export class Initialize extends Component {
  componentDidMount() {
    this.props.createSeed()
  }

  render() {
    const { seed } = this.props
    const steps = [{
      isComplete: false,
      isExecuting: false,
      text: 'Creating Seed',
      name: 'CreatingSeed',
    }]
    return (
      <div>
        <h2>Initializing</h2>
        <ul>
          {steps.map(s => <InitializationStep {...s} key={s.name} />)}
        </ul>
        <div>Seed: {seed}</div>
      </div>
    )
  }
}

export default connect(state => {
  console.log(state)
  return state.initialize
}, dispatch => ({
  createSeed: () => dispatch(createSeed())
}))(Initialize)

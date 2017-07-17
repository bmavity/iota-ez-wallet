// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createSeed } from '../actions'

import styles from './Initialize.scss'

const InitializationStep = ({ isComplete, isExecuting, name, text, }) => {


  return (
    <li>{text}</li>
  )
}

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
      <div className={styles.fullscreen}>
        <div className={styles.initializeContent}>
          <h2>Initializing wallet for first time use</h2>
          <ul>
            {steps.map(s => <InitializationStep {...s} key={s.name} />)}
          </ul>
          <div>Seed: {seed}</div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return state.initialize
}, dispatch => ({
  createSeed: () => dispatch(createSeed())
}))(Initialize)

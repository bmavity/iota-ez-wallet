// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PacmanProgress from '../../../../module_overrides/react-pacman-progress'

import { createNewWallet } from '../actions'

import styles from './Initialize.scss'


export class Initialize extends Component {
  state = {
    index: 0,
    isInitializing: false,
  }

  componentDidMount() {
    this.props.createNewWallet()
  }

  render() {
    const { completionPercentage, } = this.props
    const itemCount = 10
    const currentIndex = ((itemCount * completionPercentage) / 100) - 1
    const steps = [{
      isComplete: false,
      isExecuting: false,
      text: 'Creating Seed',
      name: 'CreatingSeed',
    }]

    return (
      <div className={styles.fullscreen}>
        <div className={styles.initializeContent}>
          <h3>Initializing wallet for first time use</h3>
          <PacmanProgress items={itemCount} currentIndex={currentIndex} />
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return state.initialize
}, dispatch => ({
  createNewWallet: () => dispatch(createNewWallet())
}))(Initialize)

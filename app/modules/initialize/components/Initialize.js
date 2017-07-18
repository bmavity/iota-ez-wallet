// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PacmanProgress from '../../../../module_overrides/react-pacman-progress'

import { createSeed } from '../actions'

import styles from './Initialize.scss'


export class Initialize extends Component {
  state = {
    index: 0,
    isInitializing: false,
  }

  componentDidMount() {
    this.props.createSeed()
  }

  handleClick(evt, index) {
    evt.preventDefault()
    this.setState(s => ({ index: s.index += 1 }))
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
          <h3 onClick={evt => this.handleClick(evt, this.state.index)}>Initializing wallet for first time use</h3>
          <PacmanProgress items={10} currentIndex={this.state.index} />
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

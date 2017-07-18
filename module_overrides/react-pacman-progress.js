import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class PacmanProgress extends Component {
  static defaultProps = {
    classNamespace: '',
    onClick: () => {},
  }

  getPacmanClass() {
    return this.props.classNamespace +
            'pacman ' +
            this.props.classNamespace +
            (this.props.currentIndex % 2 ? 'odd' : 'even');
  }

  getProgressClass() {
    const className = [this.props.classNamespace + 'pacman-progress'];
    if (this.props.currentIndex >= this.props.items) {
      className.push(this.props.classNamespace + 'complete');
    } else {
      className.push(this.props.classNamespace + 'not-complete');
    }
    return className.join(' ');
  }

  getPointClass(i) {
    const className = [this.props.classNamespace + 'point'];
    if (this.props.currentIndex > i) {
      className.push(this.props.classNamespace + 'done');
    } else if (this.props.currentIndex === i) {
      className.push(this.props.classNamespace + 'current');
    } else {
      className.push(this.props.classNamespace + 'not-done');
    }
    return className.join(' ');
  }

  getPointPosition(i) {
    const position = {
      top: '-5px',
      left: (5 + 20 * (i - this.props.items / 2)) + 'px'
    };
    return position;
  }

  render() {
    const { currentIndex, items, onClick } = this.props

    return (
      <div className={this.getProgressClass()}>
        <div
          className={this.getPacmanClass()}
          style={this.getPointPosition(currentIndex)}
          onClick={() => onClick(currentIndex, true)}
        />
        {Array.from({ length: items }).map((item, i) => {
          return (
            <div
              className={this.getPointClass(i)}
              style={this.getPointPosition(i)}
              key={`pacman-progress-${i}`}
              onClick={() => onClick(i, false)}
            />
          )
        })}
      </div>
    )
  }
}

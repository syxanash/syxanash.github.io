import React, { Component } from 'react';

import './Copyright.css';

class Copyright extends Component {
  state = {
    displayWatermark: false,
    buildNumber: Math.floor(10000 + Math.random() * 90000),
  }

  setWatermark = () => {
    const { displayWatermark } = this.state;

    if (!displayWatermark) {
      this.setState({ displayWatermark: true });
    }
  }

  render() {
    const { displayWatermark, buildNumber } = this.state;

    return (
      <div className='copyright' onClick={ this.setWatermark } style={ { cursor: displayWatermark ? 'default' : 'pointer' } }>
        <span>&copy; Simone Marzulli {new Date().getFullYear()}{displayWatermark ? ` - Evaluation Copy. Build ${buildNumber}` : ''}</span>
      </div>
    );
  }
}

export default Copyright;

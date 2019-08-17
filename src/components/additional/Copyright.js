import React, { Component } from 'react';

import lastUpdatedFile from '../../resources/last-updated.json';

import './Copyright.css';

class Copyright extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayWatermark: false,
      buildNumber: lastUpdatedFile.buildNumber.substr(0, 5),
    };
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

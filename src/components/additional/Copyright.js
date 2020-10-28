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
    const { onClickWatermark } = this.props;

    this.setState({ displayWatermark: true });
    onClickWatermark();
  }

  render() {
    const { displayWatermark, buildNumber } = this.state;

    const watermarkString = ` - ${localStorage.getItem('fixed') ? '' : 'Evaluation Copy.'} Build ${buildNumber}`;

    return (
      <div id='copyrightWatermark' className='copyright' onClick={ this.setWatermark }>
        <span>&copy; Simone Marzulli {new Date().getFullYear()}{displayWatermark ? watermarkString : ''}</span>
      </div>
    );
  }
}

export default Copyright;

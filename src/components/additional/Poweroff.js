import React, { Component } from 'react';
import Helmet from 'react-helmet';

import screenMessage from '../../resources/images/screenmessage.gif';
import screenoff from '../../resources/images/screenoff.gif';

class Poweroff extends Component {
  constructor(props) {
    super(props);

    this.turnOffTimeout = undefined;
    this.state = {
      isScreenOff: false,
    };
  }

  renderBackgroundPicture = pictureName => (
    <Helmet>
      <style>
        {
          `body {
            background: url(${pictureName}) no-repeat center center fixed; 
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            margin: 0px
          }`
        }
      </style>
    </Helmet>
  );

  render() {
    const { isScreenOff } = this.state;
    const { shouldPoweroff } = this.props;

    if (!shouldPoweroff) {
      return null;
    }

    if (!isScreenOff) {
      document.getElementById('poweroffSound').play();

      this.turnOffTimeout = setTimeout(() => {
        this.setState({ isScreenOff: true });
      }, 4 * 1000);

      return this.renderBackgroundPicture(screenMessage);
    }

    clearTimeout(this.turnOffTimeout);
    return this.renderBackgroundPicture(screenoff);
  }
}

export default Poweroff;

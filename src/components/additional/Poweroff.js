import React, { Component } from 'react';
import Helmet from 'react-helmet';

import SoundEffects from './SoundEffects';

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
            background-color: #000000;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            margin: 0px;
          }
          * {
            overflow: hidden;
            cursor: url(data:image/gif;base64,R0lGODlhAQABAIABAAAAAAD/FywAAAAAAQABAAACAkQBADs=), auto;
            webkit-touch-callout: none; /* iOS Safari */
             -webkit-user-select: none; /* Safari */
              -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Old versions of Firefox */
                 -ms-user-select: none; /* Internet Explorer/Edge */
                     user-select: none; /* Non-prefixed version, currently
          }`
        }
      </style>
    </Helmet>
  );

  componentWillUnmount() {
    if (this.turnOffTimeout) {
      clearTimeout(this.turnOffTimeout);
    }
  }

  render() {
    const { isScreenOff } = this.state;
    const { shouldPoweroff } = this.props;

    if (!shouldPoweroff) {
      return null;
    }

    if (!isScreenOff) {
      SoundEffects.poweroffSound.load();
      SoundEffects.poweroffSound.play();

      this.turnOffTimeout = setTimeout(() => {
        this.setState({ isScreenOff: true });
      }, 6 * 1000);

      return this.renderBackgroundPicture(screenMessage);
    }

    return this.renderBackgroundPicture(screenoff);
  }
}

export default Poweroff;

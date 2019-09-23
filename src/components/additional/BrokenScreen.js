import React, { Component } from 'react';
import Helmet from 'react-helmet';

import screenBackground from '../../resources/images/kernelpanic.gif';
import qrcodeFix from '../../resources/images/qrcodefix.png';

import './BrokenScreen.css';

class BrokenScreen extends Component {
  constructor(props) {
    super(props);

    this.hintTimeout = undefined;
    this.solutionTimeout = undefined;
    this.state = {
      showHint: false,
      showQrCode: false,
    };
  }

  renderBackgroundPicture = () => {
    const { showQrCode, showHint } = this.state;

    return (<React.Fragment>
      <Helmet>
        <style>
          {
            `body {
              background: url(${screenBackground}) no-repeat center center fixed; 
              -webkit-background-size: cover;
              -moz-background-size: cover;
              -o-background-size: cover;
              background-size: cover;
              margin: 0px
            }`
          }
        </style>
      </Helmet>
      <div className='centered-item'>
        <h1 className='blink-text'>ERROR</h1>
        <p>The computer has been permanently damaged!</p>
        { showHint ? <p className='shake'>maybe if you wait long enough it will repair itself...</p> : '' }
        { showQrCode ? <img src={ qrcodeFix } alt='qrcode fix' /> : '' }
      </div>
    </React.Fragment>);
  };

  componentWillUmount = () => {
    if (this.solutionTimeout) {
      clearTimeout(this.solutionTimeout);
    }

    if (this.hintTimeout) {
      clearTimeout(this.hintTimeout);
    }
  }

  render() {
    const { isScreenBroken } = this.props;
    const { showHint } = this.state;

    if (!isScreenBroken) {
      return null;
    }

    if (!showHint) {
      document.getElementById('errorSound').play();
    }

    this.solutionTimeout = setTimeout(() => {
      this.setState({ showQrCode: true });
    }, 20 * 1000);

    this.hintTimeout = setTimeout(() => {
      this.setState({ showHint: true });
    }, 10 * 1000);

    return this.renderBackgroundPicture();
  }
}

export default BrokenScreen;

import React, { Component } from 'react';
import Helmet from 'react-helmet';

import screenBackground from '../../resources/images/kernelpanic.gif';
import qrcodeFix from '../../resources/images/qrcodefix.png';

import './BrokenScreen.css';

class BrokenScreen extends Component {
  constructor(props) {
    super(props);

    this.solutionTimeout = undefined;
    this.state = {
      showQrCode: false,
    };
  }

  renderBackgroundPicture = () => {
    const { showQrCode } = this.state;

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
        <p>maybe if you wait long enough it will repair itself...</p>
        { showQrCode ? <img src={ qrcodeFix } alt='qrcode fix' /> : '' }
      </div>
    </React.Fragment>);
  };

  render() {
    const { isScreenBroken } = this.props;

    if (!isScreenBroken) {
      return null;
    }

    this.solutionTimeout = setTimeout(() => {
      this.setState({ showQrCode: true });
    }, 10 * 1000);

    return this.renderBackgroundPicture();
  }
}

export default BrokenScreen;

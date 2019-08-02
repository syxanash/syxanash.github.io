import React, { Component } from 'react';
import Helmet from 'react-helmet';

import screenBackground from '../../resources/images/insideyourcomputer.jpg';
import './BrokenScreen.css';

class BrokenScreen extends Component {
  constructor(props) {
    super(props);

    this.turnOffTimeout = undefined;
    this.state = {
      isScreenOff: false,
    };
  }

  renderBackgroundPicture = () => (
    <React.Fragment>
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
        <h1>This computer has been permanently damaged!</h1>
      </div>
    </React.Fragment>
  );

  render() {
    const { isScreenBroken } = this.props;

    if (!isScreenBroken) {
      return null;
    }

    console.info('%cor maybe you\'re just an idiot and you don\'t know about localStorage', 'background: red; color: yellow; font-size: large');
    return this.renderBackgroundPicture();
  }
}

export default BrokenScreen;

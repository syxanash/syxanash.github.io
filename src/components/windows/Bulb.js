import React, { Component } from 'react';
import {
  Button,
  Cutout,
  Fieldset,
  Hourglass,
} from 'react95';

import './Bulb.css';

import configUrls from '../../resources/config-urls.json';

import lightbulbIcon from '../../resources/icons/lightbulb.gif';

import lightbulbOn from '../../resources/images/lightbulb/bulb-on.png';
import lightbulbOff from '../../resources/images/lightbulb/bulb-off.png';

class BulbHeader extends Component {
  render = () => (
    <span>
      <img src={ lightbulbIcon } alt='main icon' style={ { height: '15px' } }/> Lite Bulb
    </span>
  )
}

class BulbBody extends Component {
  constructor(props) {
    super(props);

    this.websocketClient = undefined;
    this.keepAliveInterval = undefined;

    this.pingInterval = 30;
    this.checkInterval = 10;

    this.state = {
      websocketOpen: false,
      lightOn: false,
    };
  }

  componentDidMount() {
    this.setupWebsocket();

    this.keepAliveInterval = setInterval(this.sendPing, this.pingInterval * 1000);
    this.checkConnectionInterval = setInterval(this.checkConnection, this.checkInterval * 1000);
  }

  componentWillUnmount = () => {
    if (this.websocketClient) {
      this.websocketClient.close();
    }

    clearInterval(this.keepAliveInterval);
    clearInterval(this.checkConnectionInterval);

    this.websocketClient.removeEventListener('open', this.onOpen);
    this.websocketClient.removeEventListener('message', this.onMessage);
    this.websocketClient.removeEventListener('error', this.onError);
  }

  checkConnection = () => {
    if (this.websocketClient.readyState === WebSocket.CLOSED) {
      this.setupWebsocket();
    }
  }

  setupWebsocket = () => {
    const socketUrl = `${configUrls.websocketUrl}/bulb`;

    this.websocketClient = new WebSocket(socketUrl);

    this.websocketClient.addEventListener('open', this.onOpen);
    this.websocketClient.addEventListener('message', this.onMessage);
    this.websocketClient.addEventListener('close', this.onClose);
    this.websocketClient.addEventListener('error', this.onError);
  }

  sendPing = () => {
    this.doSend('PING');
  }

  onOpen = () => {
    this.setState({ websocketOpen: true });
  }

  onClose = () => {
    this.websocketClient.removeEventListener('close', this.onClose);
  }

  onError = (evt) => {
    console.error(evt.data);
  }

  onMessage = (evt) => {
    if (evt.data === 'PONG') {
      return;
    }

    if (evt.data === '1') {
      this.setState({ lightOn: true });
    } else {
      this.setState({ lightOn: false });
    }
  }

  doSend = (msg) => {
    if (this.websocketClient.readyState === WebSocket.OPEN) {
      this.websocketClient.send(msg);
    }
  }

  renderLightBulbObject = () => {
    const { lightOn } = this.state;

    return (
      <div className='animated swing'>
        <div className='lightbulb-container'>
          <div style={ { display: lightOn ? 'block' : 'none' } } className='lightbulb-shadow'></div>
          <img src={ lightOn ? lightbulbOn : lightbulbOff } className='lightbulb' style={ { height: '90px' } } alt="lightbulb"/>
        </div>
      </div>
    );
  }

  render() {
    const { lightOn, websocketOpen } = this.state;

    return (
      <React.Fragment>
        <div>
          <Fieldset style={ { height: '80px', width: '90px', textAlign: 'center' } }>
            { websocketOpen
              ? this.renderLightBulbObject()
              : <Hourglass size={ 48 } style={ { paddingTop: '15px' } } />
            }
          </Fieldset>
          <br />
          <Cutout className='bulb-cut-out'>
            <div className='bulb-buttons'>
              <Button square
                onClick={ () => { this.doSend('FLICK'); } }
                active={ websocketOpen && lightOn }
                disabled={ !websocketOpen || lightOn }
                fullWidth
              ><b>I</b></Button>
            </div>
            <div className='bulb-buttons'>
              <Button square
                onClick={ () => { this.doSend('FLICK'); } }
                active={ websocketOpen && !lightOn }
                disabled={ !websocketOpen || !lightOn }
                fullWidth
              ><b>O</b></Button>
            </div>
          </Cutout>
        </div>
      </React.Fragment>
    );
  }
}

export { BulbBody, BulbHeader };

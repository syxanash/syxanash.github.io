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

    this.websocket = undefined;

    this.state = {
      websocketOpen: false,
      lightOn: false,
    };
  }

  componentDidMount() {
    this.setupWebsockets();
  }

  setupWebsockets = () => {
    this.socketUrl = `${configUrls.websocketUrl}/bulb`;

    this.websocket = new WebSocket(this.socketUrl);
    this.websocket.onopen = (evt) => { this.onOpen(evt); };
    this.websocket.onclose = (evt) => { this.onClose(evt); };
    this.websocket.onmessage = (evt) => { this.onMessage(evt); };
    this.websocket.onerror = (evt) => { this.onError(evt); };
  }

  onOpen = () => {
    console.info('opened websocket');
    this.setState({ websocketOpen: true });
  }

  onClose = () => {
    console.info('closed websocket');
    this.setState({ websocketOpen: false });
  }

  onError = (evt) => {
    console.info('websocket error');
    console.info(evt.data);
  }

  onMessage = (evt) => {
    if (evt.data === '1') {
      this.setState({ lightOn: true });
    } else {
      this.setState({ lightOn: false });
    }
  }

  doSend = () => {
    if (this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send('');
    }
  }

  componentWillUnmount = () => {
    if (this.websocket !== undefined) {
      this.websocket.onclose();
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
                onClick={ () => { this.doSend(); } }
                active={ lightOn }
                disabled={ lightOn }
                fullWidth
              ><b>I</b></Button>
            </div>
            <div className='bulb-buttons'>
              <Button square
                onClick={ () => { this.doSend(); } }
                active={ !lightOn }
                disabled={ !lightOn }
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

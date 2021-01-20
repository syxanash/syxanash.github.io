import React, { Component } from 'react';
import {
  Button,
  Cutout,
  Fieldset,
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
    this.websocketOpen = false;

    this.state = {
      lightOn: false,
    };
  }

  componentDidMount() {
    this.socketUrl = `${configUrls.websocketUrl}/bulb`;

    this.websocket = new WebSocket(this.socketUrl);
    this.websocket.onopen = (evt) => { this.onOpen(evt); };
    this.websocket.onclose = (evt) => { this.onClose(evt); };
    this.websocket.onmessage = (evt) => { this.onMessage(evt); };
    this.websocket.onerror = (evt) => { this.onError(evt); };
  }

  onOpen = () => {
    this.websocketOpen = true;
    console.log('opened websocket');
  }

  onClose = () => {
    console.log('closed websocket');
  }

  onError = (evt) => {
    console.log('websocket error');
    console.log(evt.data);
  }

  onMessage = (evt) => {
    console.log('received message');
    console.log(evt.data);

    if (evt.data === '1') {
      this.setState({ lightOn: true });
    } else {
      this.setState({ lightOn: false });
    }
  }

  doSend = (message) => {
    console.log('sending message');
    console.log(message);

    if (this.websocket !== undefined && this.websocketOpen) {
      this.websocket.send(message);
    }
  }

  render() {
    const { lightOn } = this.state;

    return (
      <React.Fragment>
        <div>
          <Fieldset style={ { height: '80px' } }>
            <img src={ lightOn ? lightbulbOn : lightbulbOff } className='icon' style={ { height: '90px' } } alt="lightbulb"/>
          </Fieldset>
          <br />
          <Cutout className='bulb-cut-out'>
            <div className='bulb-buttons'>
              <Button square
                onClick={ () => { this.doSend(); } }
                active={ lightOn }
                fullWidth
                disabled={ lightOn }
              >I</Button>
            </div>
            <div className='bulb-buttons'>
              <Button square
                onClick={ () => { this.doSend(); } }
                active={ !lightOn }
                fullWidth
                disabled={ !lightOn }
              >O</Button>
            </div>
          </Cutout>
        </div>
      </React.Fragment>
    );
  }
}

export { BulbBody, BulbHeader };

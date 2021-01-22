import React, { Component } from 'react';
import {
  Button,
  Cutout,
  Fieldset,
  Hourglass,
} from 'react95';

import Typist from 'react-typist';

import './Bulb.css';

import configUrls from '../../resources/config-urls.json';

import lightbulbIcon from '../../resources/icons/lightbulb.gif';

import questionIcon from '../../resources/icons/question-mark.gif';
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
    this.speechCounterTimeout = undefined;

    this.pingInterval = 30;
    this.checkInterval = 10;

    this.state = {
      websocketOpen: false,
      lightOn: false,
      tooltipCounter: 0,
      doneTyping: false,
      tooltipMessages: [
        <span>
          This is a shared lightbulb, feel free to turn it <b>on</b> or <b>off</b>
        </span>,
        <span>
          you might see other people flick the switch while you keep the window open
        </span>,
        <span>
          Enjoy!
        </span>,
      ],
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
    clearTimeout(this.speechCounterTimeout);

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
    this.doSend('USERS');
  }

  onClose = () => {
    this.websocketClient.removeEventListener('close', this.onClose);
  }

  onError = (evt) => {
    console.error(evt.data);
  }

  onMessage = (evt) => {
    const foundUsersMatch = evt.data.match(/^USERS:(.*?)$/);
    const bulbStatusMatch = evt.data.match(/^BULB:(.*?)$/);

    if (foundUsersMatch !== null) {
      this.setState({ usersConnected: foundUsersMatch[1] });
    }

    if (bulbStatusMatch !== null) {
      this.setState({ lightOn: bulbStatusMatch[1] === '1' });
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

  increaseSpeechCounter = () => {
    this.setState({ tooltipCounter: this.state.tooltipCounter + 1 });
    this.setState({ doneTyping: false });
  }

  nextMessage = () => {
    const { tooltipCounter, tooltipMessages } = this.state;

    this.setState({ doneTyping: true });

    if (tooltipCounter < tooltipMessages.length) {
      this.speechCounterTimeout = setTimeout(this.increaseSpeechCounter, 3000);
    }
  }

  renderSpeechBubble = () => {
    const { tooltipCounter, doneTyping, tooltipMessages } = this.state;

    return (
      doneTyping
        ? <span>{ tooltipMessages[tooltipCounter] }</span>
        : <Typist
          avgTypingDelay={ 25 }
          cursor={ { show: false } }
          onTypingDone={ this.nextMessage }
        >
          { tooltipMessages[tooltipCounter] }
        </Typist>
    );
  }

  renderTooltip = () => (
    <div>
      <br />
      <Fieldset
        label={ <img src={ questionIcon } style={ { height: '20px' } } alt="question mark"/> }
      >
        <div className='lightbulb-tips'>
          { this.renderSpeechBubble() }
        </div>
      </Fieldset>
    </div>
  )

  render() {
    const {
      lightOn, websocketOpen, tooltipCounter, tooltipMessages,
    } = this.state;

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
          { tooltipCounter >= tooltipMessages.length ? null : this.renderTooltip() }
        </div>
      </React.Fragment>
    );
  }
}

export { BulbBody, BulbHeader };

import React, { Component } from 'react';
import {
  Button,
  Cutout,
  Fieldset,
  Hourglass,
  Tooltip,
} from 'react95';
import $ from 'jquery';
import Typist from 'react-typist';

import SoundEffects from '../additional/SoundEffects';
import Util from '../Util';

import './Bulb.css';

import configUrls from '../../resources/config-urls.json';

import lightbulbIcon from '../../resources/icons/lightbulb.gif';

import usersIcon from '../../resources/icons/users.gif';
import questionIcon from '../../resources/icons/question-mark.gif';
import lightbulbOn from '../../resources/images/lightbulb/bulb-on.png';
import lightbulbOff from '../../resources/images/lightbulb/bulb-off.png';
import lightbulbBroken from '../../resources/images/lightbulb/bulb-broken.png';
import warningIcon from '../../resources/icons/warning.png';

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
    this.safetyTimer = undefined;

    this.pingInterval = 30;
    this.checkInterval = 10;
    this.spamClickInterval = 150;

    this.state = {
      websocketOpen: false,
      lightOn: false,
      bottomMessageCounter: 0,
      doneTyping: false,
      usersConnected: undefined,
      showUsersField: false,
      clickWarnings: 0,
      brokenBulb: !!JSON.parse(localStorage.getItem('brokenBulb')),
      pressedButton: false,
      bottomMessages: [
        <span>
          this is a shared lightbulb, feel free to turn it <b>on</b> and <b>off</b>
        </span>,
        <span>
          you might see other people flick the switch in real time if you keep the window open!
        </span>,
      ],
    };
  }

  componentDidMount() {
    const { brokenBulb } = this.state;

    if (!brokenBulb && Util.isWebSocketsSupported()) {
      this.setupWebsocket();

      this.keepAliveInterval = setInterval(this.sendPing, this.pingInterval * 1000);
      this.checkConnectionInterval = setInterval(this.checkConnection, this.checkInterval * 1000);
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.speechCounterTimeout);
    clearTimeout(this.safetyTimer);

    if (!this.state.brokenBulb && Util.isWebSocketsSupported()) {
      this.disconnectWebsocket();
    }
  }

  checkConnection = () => {
    if (this.websocketClient.readyState === WebSocket.CLOSED) {
      this.setupWebsocket();
    }
  }

  disconnectWebsocket = () => {
    if (this.websocketClient) {
      this.websocketClient.close();
    }

    clearInterval(this.keepAliveInterval);
    clearInterval(this.checkConnectionInterval);

    this.websocketClient.removeEventListener('open', this.onOpen);
    this.websocketClient.removeEventListener('message', this.onMessage);
    this.websocketClient.removeEventListener('error', this.onError);
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
    const { usersConnected } = this.state;

    const foundUsersMatch = evt.data.match(/^USERS:(.*?)$/);
    const bulbStatusMatch = evt.data.match(/^BULB:(.*?)$/);

    if (foundUsersMatch !== null) {
      this.setState({ usersConnected: foundUsersMatch[1], showUsersField: true });

      if (foundUsersMatch[1] > usersConnected) {
        SoundEffects.userOnline.load();
        SoundEffects.userOnline.play();
      }
    }

    if (bulbStatusMatch !== null) {
      const lightOn = bulbStatusMatch[1] === '1';

      if (lightOn) {
        $('#lightbulbAnimationContainer')
          .addClass('animated swing fast')
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
            $('#lightbulbAnimationContainer').removeClass();
          });
      }

      this.setState({ lightOn });
    }
  }

  doSend = (msg) => {
    if (this.websocketClient.readyState === WebSocket.OPEN) {
      this.websocketClient.send(msg);
    }
  }

  renderLightBulbObject = () => {
    const { lightOn, brokenBulb } = this.state;

    const bulbImage = brokenBulb
      ? <img src={ lightbulbBroken } className='lightbulb' alt="broken"/>
      : <img src={ lightOn ? lightbulbOn : lightbulbOff } className='lightbulb' alt="lightbulb"/>;

    const bulbShadow = brokenBulb
      ? <div className='broken-lightbulb-shadow'></div>
      : <div style={ { display: lightOn ? 'block' : 'none' } } className='lightbulb-shadow'></div>;

    return (
      <div id='lightbulbAnimationContainer'>
        <div className='lightbulb-container'>
          { bulbShadow }
          { bulbImage }
        </div>
      </div>
    );
  }

  increaseMessageCounter = () => {
    this.setState({ bottomMessageCounter: this.state.bottomMessageCounter + 1 });
    this.setState({ doneTyping: false });
  }

  nextMessage = () => {
    const { bottomMessageCounter, bottomMessages } = this.state;

    this.setState({ doneTyping: true });

    if (bottomMessageCounter < bottomMessages.length) {
      this.speechCounterTimeout = setTimeout(this.increaseMessageCounter, 3000);
    }
  }

  renderTypedText = () => {
    const { bottomMessageCounter, doneTyping, bottomMessages } = this.state;

    return (
      doneTyping
        ? <span>{ bottomMessages[bottomMessageCounter] }</span>
        : <Typist
          avgTypingDelay={ 25 }
          cursor={ { show: false } }
          onTypingDone={ this.nextMessage }
        >
          { bottomMessages[bottomMessageCounter] }
        </Typist>
    );
  }

  hideUsersConnected = () => {
    this.setState({ showUsersField: this.state.usersConnected > 1 });
  }

  renderMessagebox = () => {
    const {
      bottomMessageCounter, bottomMessages, showUsersField, usersConnected,
    } = this.state;

    if (showUsersField && bottomMessageCounter >= bottomMessages.length) {
      const textDisplayed = usersConnected > 1
        ? `people connected: ${usersConnected}`
        : 'you\'re the only one at the moment';

      if (usersConnected <= 1) {
        this.speechCounterTimeout = setTimeout(this.hideUsersConnected, 5000);
      }

      return (
        <div className='typing-text-container'>
          <Fieldset
            label={ <img src={ usersIcon } style={ { height: '20px' } } alt="users"/> }
          >
            <div className='lightbulb-messages'>
              <span>{ textDisplayed }</span>
            </div>
          </Fieldset>
        </div>
      );
    }

    if (bottomMessageCounter >= bottomMessages.length) {
      return null;
    }

    return (
      <div className='typing-text-container'>
        <Fieldset
          label={ <img src={ questionIcon } style={ { height: '20px' } } alt="question mark"/> }
        >
          <div className='lightbulb-messages'>
            { this.renderTypedText() }
          </div>
        </Fieldset>
      </div>
    );
  }

  spamChecker = () => {
    this.setState({ pressedButton: false });
  }

  sendFlick = () => {
    const { pressedButton, clickWarnings } = this.state;

    if (pressedButton === true) {
      this.setState({ clickWarnings: clickWarnings + 1 });

      if (clickWarnings + 1 >= 3) {
        localStorage.setItem('brokenBulb', JSON.stringify('true'));
        alert('you broke the lightbulb!');
        this.disconnectWebsocket();
        this.setState({ brokenBulb: true, websocketOpen: false });
      } else {
        alert('slow down!');
      }
    } else {
      this.doSend('FLICK');
      this.setState({ pressedButton: true });
      this.safetyTimer = setTimeout(this.spamChecker, this.spamClickInterval);
    }
  }

  renderLiveDot = () => {
    const { usersConnected } = this.state;

    const tooltipMessage = usersConnected > 1
      ? 'someone else is online'
      : 'everyone is offline';

    const liveDotClass = usersConnected > 1
      ? 'live-dot-online'
      : 'live-dot-offline';

    return (
      <div className='live-dot-tooltip'>
        <Tooltip text={ tooltipMessage } delay={ 100 }>
          <div className={ liveDotClass } />
        </Tooltip>
      </div>
    );
  }

  render() {
    const {
      lightOn, websocketOpen, brokenBulb,
    } = this.state;


    if (!Util.isWebSocketsSupported()) {
      return (<span className='message-container'>
        <img src={ warningIcon } style={ { height: '52px' } } alt='warning icon' /><h1>Sorry your browser doesn't support WebSocket!</h1>
      </span>
      );
    }

    return (
      <div className='bulb-window'>
        { brokenBulb ? null : this.renderLiveDot() }
        <div>
          <Fieldset style={ { height: '90px', width: '100px', textAlign: 'center' } }>
            { websocketOpen || brokenBulb
              ? this.renderLightBulbObject()
              : <Hourglass size={ 48 } style={ { paddingTop: '20px' } } />
            }
          </Fieldset>
        </div>
        <div className='switch-buttons-container'>
          <Cutout className='bulb-buttons-cut-out'>
            <div className='bulb-buttons'>
              <Button square
                onClick={ this.sendFlick }
                active={ websocketOpen && lightOn }
                disabled={ !websocketOpen || lightOn }
                fullWidth
                style={ { height: '42px' } }
              ><b>I</b></Button>
            </div>
            <div className='bulb-buttons'>
              <Button square
                onClick={ this.sendFlick }
                active={ websocketOpen && !lightOn }
                disabled={ !websocketOpen || !lightOn }
                fullWidth
                style={ { height: '42px' } }
              ><b>O</b></Button>
            </div>
          </Cutout>
        </div>
        { brokenBulb ? null : this.renderMessagebox() }
      </div>
    );
  }
}

export { BulbBody, BulbHeader };

import React, { Component } from 'react';
import {
  Button,
  Cutout,
  Fieldset,
  Hourglass,
  Tooltip,
} from 'react95';
import $ from 'jquery';
import _ from 'lodash';

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
    <React.Fragment>
      <img src={ lightbulbIcon } alt='main icon' style={ { height: '15px' } }/> Lite Bulb
    </React.Fragment>
  )
}

// very important UI piece
const COLLAPSE_BUTTON_LABELS = ['NICE', 'COOL', 'GOT IT', 'SWEET', 'GREAT'];

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
      aboutPressed: false,
      usersConnected: undefined,
      deskLampConnected: false,
      brokenBulb: !!JSON.parse(sessionStorage.getItem('brokenBulb')),
      firstSocketMessage: true,
      pressedButton: false,
      collapseButtonLabel: _.sample(COLLAPSE_BUTTON_LABELS),
    };
  }

  componentDidMount() {
    const { brokenBulb } = this.state;

    // load both lightbulbs images on mount
    new Image().src = lightbulbOn;
    new Image().src = lightbulbOff;

    if (!brokenBulb && Util.isWebSocketsSupported()) {
      this.setupWebsocket();

      SoundEffects.switchSound.load();
      SoundEffects.alienSound.load();
      SoundEffects.disconnectSound.load();
      SoundEffects.userOnline.load();

      this.keepAliveInterval = setInterval(this.sendPing, this.pingInterval * 1000);
      this.checkConnectionInterval = setInterval(this.checkConnection, this.checkInterval * 1000);
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.speechCounterTimeout);

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
    const { usersConnected, pressedButton, firstSocketMessage } = this.state;

    const foundUsersMatch = evt.data.match(/^USERS:(.*?)$/);
    const bulbStatusMatch = evt.data.match(/^BULB:(.*?)$/);
    const deskLampMatch = evt.data.match(/^DESK_LAMP:(.*?)$/);
    const spamWarn = evt.data.match(/^SPAM_WARN$/);
    const spamJail = evt.data.match(/^SPAM_JAIL$/);

    if (spamWarn !== null) {
      alert('slow down!');
    }

    if (spamJail !== null) {
      sessionStorage.setItem('brokenBulb', true);
      alert('you broke the lightbulb!');
      this.disconnectWebsocket();
      this.setState({ brokenBulb: true, websocketOpen: false });
    }

    if (deskLampMatch !== null) {
      const deskLampConnected = deskLampMatch[1] === 'true';

      if (deskLampConnected) {
        SoundEffects.userOnline.play();
      }

      this.setState({ deskLampConnected });
    }

    if (foundUsersMatch !== null) {
      this.setState({ usersConnected: Number(foundUsersMatch[1]) });

      if (foundUsersMatch[1] > usersConnected) {
        SoundEffects.userOnline.play();
      }

      if (foundUsersMatch[1] < usersConnected) {
        SoundEffects.disconnectSound.play();
      }
    }

    if (bulbStatusMatch !== null) {
      if (!pressedButton && !firstSocketMessage) {
        SoundEffects.alienSound.play();
      }

      const lightOn = bulbStatusMatch[1] === '1';

      if (lightOn) {
        $('#lightbulbAnimationContainer')
          .addClass('animated swing fast')
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
            $('#lightbulbAnimationContainer').removeClass();
          });
      }

      this.setState({ lightOn, pressedButton: false, firstSocketMessage: false });
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

  renderMessagebox = () => {
    const {
      usersConnected, deskLampConnected, aboutPressed, collapseButtonLabel,
    } = this.state;

    let textDisplayed = 'you\'re the only one connected at the moment';

    if (usersConnected > 1) {
      textDisplayed = `People connected: ${usersConnected}`;
    }

    if (deskLampConnected && usersConnected === 1) {
      textDisplayed = <span>Simone's <b>desk lamp</b> is online right now :)</span>;
    } else if (deskLampConnected && usersConnected > 1) {
      textDisplayed = <span>
        {textDisplayed}<br /><br />Simone's <b>desk lamp</b> is also online right now :)
      </span>;
    }

    if (aboutPressed) {
      textDisplayed = <span>
        This lightbulb can be turned <b>on</b> and <b>off</b>, if you keep
        the window open you might see other users toggling it in real time!<br />
        <b>oh</b> and this light bulb is sometimes connected to <a href={ `${configUrls.backendUrl}/blog/websocket-to-lightbulbs` } rel='noopener noreferrer' target='_blank'>Simone's desk lamp</a>
      </span>;
    }

    return (
      <React.Fragment>
        <div className='typing-text-container'>
          <Fieldset
            label={ <img src={ aboutPressed ? questionIcon : usersIcon } style={ { height: '20px' } } alt={ aboutPressed ? 'about' : 'users' }/> }
          >
            <div className='lightbulb-messages'>
              { <span>{ textDisplayed }</span> }
            </div>
          </Fieldset>
        </div>

        <Button
          size='sm'
          active={ aboutPressed }
          onClick={ this.toggleAbout }
        >
          <span>{ aboutPressed ? '▲' : '▼' } { aboutPressed ? collapseButtonLabel : 'EXPLAIN' }</span>
        </Button>
      </React.Fragment>
    );
  }

  sendFlick = () => {
    SoundEffects.switchSound.play();

    this.doSend('FLICK');
    this.setState({ pressedButton: true });
  }

  renderLiveDot = () => {
    const { usersConnected, deskLampConnected } = this.state;

    const tooltipMessage = usersConnected > 1 || deskLampConnected
      ? 'someone else is online'
      : 'everyone is offline';

    const liveDotClass = usersConnected > 1 || deskLampConnected
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

  toggleAbout = () => {
    const { aboutPressed } = this.state;

    if (aboutPressed) {
      this.setState({ collapseButtonLabel: _.sample(COLLAPSE_BUTTON_LABELS) });
    }

    this.setState({ aboutPressed: !aboutPressed });
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
        { !brokenBulb && this.renderLiveDot() }
        <div style={ { zIndex: 1 } }>
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
        { !brokenBulb && this.renderMessagebox() }
      </div>
    );
  }
}

export { BulbBody, BulbHeader };

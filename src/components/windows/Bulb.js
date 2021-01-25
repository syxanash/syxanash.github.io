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

import usersIcon from '../../resources/icons/users.gif';
import questionIcon from '../../resources/icons/question-mark.gif';
import lightbulbOn from '../../resources/images/lightbulb/bulb-on.png';
import lightbulbOff from '../../resources/images/lightbulb/bulb-off.png';
import lightbulbBroken from '../../resources/images/lightbulb/bulb-broken.png';

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
    this.safetyClickInterval = 150;

    this.defaultFavicon = document.querySelector('link[rel~=\'icon\']').href;

    this.state = {
      websocketOpen: false,
      lightOn: false,
      tooltipCounter: 0,
      doneTyping: false,
      usersConnected: undefined,
      clickWarnings: 0,
      brokenBulb: !!JSON.parse(sessionStorage.getItem('brokenBulb')),
      pressedButton: false,
      tooltipMessages: [
        <span>
          this is a shared lightbulb, feel free to turn it <b>on</b> and <b>off</b>
        </span>,
        <span>
          you might see other people flick the switch while you keep the window open
        </span>,
      ],
    };
  }

  componentDidMount() {
    const { brokenBulb } = this.state;

    if (!brokenBulb) {
      this.setupWebsocket();

      this.keepAliveInterval = setInterval(this.sendPing, this.pingInterval * 1000);
      this.checkConnectionInterval = setInterval(this.checkConnection, this.checkInterval * 1000);
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.speechCounterTimeout);
    clearTimeout(this.safetyTimer);

    this.changeFavIcon(this.defaultFavicon);

    if (!this.state.brokenBulb) {
      this.disconnectWebsocket();
    }
  }

  changeFavIcon = (faviconImage) => {
    let link = document.querySelector('link[rel~=\'icon\']');

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    link.href = faviconImage;
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
    const foundUsersMatch = evt.data.match(/^USERS:(.*?)$/);
    const bulbStatusMatch = evt.data.match(/^BULB:(.*?)$/);

    if (foundUsersMatch !== null) {
      this.setState({ usersConnected: foundUsersMatch[1] });
    }

    if (bulbStatusMatch !== null) {
      const lightOn = bulbStatusMatch[1] === '1';

      document.getElementById('lightbulbAnimationContainer').className = lightOn
        ? 'animated swing'
        : '';

      this.changeFavIcon(lightOn ? lightbulbOn : lightbulbOff);
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
      ? <img src={ lightbulbBroken } className='lightbulb' style={ { height: '90px' } } alt="broken"/>
      : <img src={ lightOn ? lightbulbOn : lightbulbOff } className='lightbulb' style={ { height: '90px' } } alt="lightbulb"/>;

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

  increaseTipCounter = () => {
    this.setState({ tooltipCounter: this.state.tooltipCounter + 1 });
    this.setState({ doneTyping: false });
  }

  nextMessage = () => {
    const { tooltipCounter, tooltipMessages } = this.state;

    this.setState({ doneTyping: true });

    if (tooltipCounter < tooltipMessages.length) {
      this.speechCounterTimeout = setTimeout(this.increaseTipCounter, 3000);
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

  hideUsersConnected = () => {
    this.setState({ usersConnected: undefined });
  }

  renderTooltip = () => {
    const { tooltipCounter, tooltipMessages, usersConnected } = this.state;

    if (usersConnected !== undefined && tooltipCounter >= tooltipMessages.length) {
      return (
        <React.Fragment>
          <br />
          <Fieldset
            label={ <img src={ usersIcon } style={ { height: '20px' } } alt="users"/> }
          >
            <div className='lightbulb-tips'>
              <Typist
                avgTypingDelay={ 25 }
                cursor={ { show: false } }
                onTypingDone={ () => {
                  this.speechCounterTimeout = setTimeout(this.hideUsersConnected, 3000);
                } }
              >
                people connected: { usersConnected }
              </Typist>
            </div>
          </Fieldset>
        </React.Fragment>
      );
    }

    if (tooltipCounter >= tooltipMessages.length) {
      return null;
    }

    return (
      <React.Fragment>
        <br />
        <Fieldset
          label={ <img src={ questionIcon } style={ { height: '20px' } } alt="question mark"/> }
        >
          <div className='lightbulb-tips'>
            { this.renderSpeechBubble() }
          </div>
        </Fieldset>
      </React.Fragment>
    );
  }

  checkSafety = () => {
    this.setState({ pressedButton: false });
  }

  sendFlick = () => {
    const { pressedButton, clickWarnings } = this.state;

    if (pressedButton === true) {
      alert('slow down!');
      this.setState({ clickWarnings: clickWarnings + 1 });

      if (clickWarnings + 1 >= 3) {
        sessionStorage.setItem('brokenBulb', JSON.stringify('true'));
        alert('you broke the lightbulb!');
        this.disconnectWebsocket();
        this.changeFavIcon(this.defaultFavicon);
        this.setState({ brokenBulb: true, websocketOpen: false });
      }
    } else {
      this.doSend('FLICK');
      this.setState({ pressedButton: true });
      this.safetyTimer = setTimeout(this.checkSafety, this.safetyClickInterval);
    }
  }

  render() {
    const {
      lightOn, websocketOpen, brokenBulb,
    } = this.state;

    return (
      <React.Fragment>
        <div>
          <Fieldset style={ { height: '80px', width: '90px', textAlign: 'center' } }>
            { websocketOpen || brokenBulb
              ? this.renderLightBulbObject()
              : <Hourglass size={ 48 } style={ { paddingTop: '15px' } } />
            }
          </Fieldset>
          <br />
          <Cutout className='bulb-cut-out'>
            <div className='bulb-buttons'>
              <Button square
                onClick={ this.sendFlick }
                active={ websocketOpen && lightOn }
                disabled={ !websocketOpen || lightOn }
                fullWidth
              ><b>I</b></Button>
            </div>
            <div className='bulb-buttons'>
              <Button square
                onClick={ this.sendFlick }
                active={ websocketOpen && !lightOn }
                disabled={ !websocketOpen || !lightOn }
                fullWidth
              ><b>O</b></Button>
            </div>
          </Cutout>
          { brokenBulb ? null : this.renderTooltip() }
        </div>
      </React.Fragment>
    );
  }
}

export { BulbBody, BulbHeader };

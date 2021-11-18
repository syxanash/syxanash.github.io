import React, { Component } from 'react';
import { Button, Cutout } from 'react95';

import './Cestino.css';
import 'animate.css';

import easterEggObject from '../../resources/cestino-messages.json';

import cestinoIcon from '../../resources/icons/trash.gif';
import spiderWindowIcon from '../../resources/icons/spiderwindow.gif';

class CestinoHeader extends Component {
  render = () => {
    let messageCounter = 0;

    if (sessionStorage.getItem('messageCounter') !== null) {
      messageCounter = parseInt(sessionStorage.getItem('messageCounter'), 10);
    }

    const counter = ` ${messageCounter + 1}/${easterEggObject.cestinoMessages.length}`;

    return (
      <span>
        <img src={ cestinoIcon } alt='main icon' style={ { height: '15px' } }/> Cestino{ counter }
      </span>
    );
  }
}

class CestinoBody extends Component {
  constructor(props) {
    super(props);

    if (sessionStorage.getItem('messageCounter') === null) {
      sessionStorage.setItem('messageCounter', 0);
    }
  }

  increaseClickCount = () => {
    const { closeCurrentWindow, closeWindow, openWindow } = this.props;
    const messageCounter = parseInt(sessionStorage.getItem('messageCounter'), 10);

    let newMessageCounter = messageCounter;
    if (messageCounter + 1 < easterEggObject.cestinoMessages.length) {
      newMessageCounter += 1;
    }

    closeCurrentWindow();

    if (messageCounter === easterEggObject.cestinoMessages.length - 1) {
      sessionStorage.setItem('eggTriggered', true);
      closeWindow('about');
    } else {
      openWindow('cestino', true);

      sessionStorage.setItem('messageCounter', newMessageCounter);
    }
  }

  render = () => {
    const messageCounter = parseInt(sessionStorage.getItem('messageCounter'), 10);
    const currentMessage = easterEggObject.cestinoMessages[messageCounter].message;

    return (<React.Fragment>
      <div className='cestino-message-container'>
        <span className='cestino-message-text'>
          <img src={ spiderWindowIcon } alt='spider window icon' /><span style={ { margin: '15px' } }>{currentMessage.charAt(0).toUpperCase() + currentMessage.slice(1)}</span>
        </span>
      </div>
      <div className='action-button-container'>
        <Cutout>
          <div>
            <Button
              fullWidth
              onClick={ this.increaseClickCount }
              style={ { width: '150px' } }
            >{easterEggObject.cestinoMessages[messageCounter].button}</Button>
          </div>
        </Cutout>
      </div>
    </React.Fragment>);
  }
}

export { CestinoHeader, CestinoBody };

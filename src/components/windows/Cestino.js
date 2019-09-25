import React, { Component } from 'react';
import { Button, Cutout } from 'react95';

import './Cestino.css';
import 'animate.css';

import cestinoMessages from '../../resources/cestino-messages.json';

import mainIcon from '../../resources/icons/favicon.png';

class CestinoHeader extends Component {
  render = () => (
    <span>
      <img src={ mainIcon } alt='main icon' style={ { height: '15px' } }/> Cestino
    </span>
  )
}

class CestinoBody extends Component {
  constructor(props) {
    super(props);

    if (sessionStorage.getItem('messageCounter') === null) {
      sessionStorage.setItem('messageCounter', 0);
    }
  }

  increaseClickCount = () => {
    const { closeWindow } = this.props;
    const messageCounter = parseInt(sessionStorage.getItem('messageCounter'), 10);

    let newMessageCounter = messageCounter;
    if (messageCounter + 1 < cestinoMessages.length) {
      newMessageCounter += 1;
    }

    if (messageCounter === cestinoMessages.length - 1) {
      sessionStorage.setItem('eggTriggered', true);
    } else {
      sessionStorage.setItem('messageCounter', newMessageCounter);
    }

    closeWindow();
  }

  render = () => {
    const messageCounter = parseInt(sessionStorage.getItem('messageCounter'), 10);
    const currentMessage = cestinoMessages[messageCounter].message;
    const eggTriggered = sessionStorage.getItem('eggTriggered') === 'true';

    return (<div>
      <div className='cestino-message-container'>
        <span className='cestino-message-text'>
          {currentMessage.charAt(0).toUpperCase() + currentMessage.slice(1)}
        </span>
      </div>
      <div className='action-button-container'>
        <Cutout>
          <div>
            <Button
              fullWidth
              onClick={ this.increaseClickCount }
              disabled={ eggTriggered }
              style={ { width: '150px' } }
            >{cestinoMessages[messageCounter].button}</Button>
          </div>
        </Cutout>
      </div>
    </div>);
  }
}

export { CestinoHeader, CestinoBody };

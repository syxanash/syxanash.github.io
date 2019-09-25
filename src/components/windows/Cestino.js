import React, { Component } from 'react';
import { Button, Cutout } from 'react95';

import './Cestino.css';
import 'animate.css';

import cestinoMessages from '../../resources/cestino-messages.json';

import mainIcon from '../../resources/icons/favicon.png';
import cestinoManDeadIcon from '../../resources/icons/uomomorto.gif';
import cestinoManAliveIcon from '../../resources/icons/cestino_warning.gif';

class CestinoHeader extends Component {
  render = () => (
    <span>
      <img src={ mainIcon } alt='main icon' style={ { height: '15px' } }/> Cestino
    </span>
  )
}

class CestinoBody extends Component {
  state = {
    messageCounter: 0,
  }

  increaseClickCount = () => {
    const { messageCounter } = this.state;

    let newMessageCounter = messageCounter;
    if (messageCounter + 1 < cestinoMessages.length) {
      newMessageCounter += 1;
    }

    if (messageCounter === cestinoMessages.length - 1) {
      sessionStorage.setItem('eggTriggered', true);
      this.forceUpdate();
    } else {
      this.setState({ messageCounter: newMessageCounter });
    }
  }

  render = () => {
    const { messageCounter } = this.state;
    const currentMessage = cestinoMessages[messageCounter].message;
    const eggTriggered = sessionStorage.getItem('eggTriggered') === 'true';

    return (<div>
      <div className='cestino-message-container'>
        {
          eggTriggered
            ? <img src={ cestinoManDeadIcon } style={ { height: '70px' } } alt='cestino man dead' />
            : <img src={ cestinoManAliveIcon } style={ { height: '80px' } } className='animated bounce infinite' alt='cestino man icon' />
        }
        <span style={ { display: eggTriggered ? 'none' : 'block' } } className='cestino-message-text'>{currentMessage.charAt(0).toUpperCase() + currentMessage.slice(1)}</span>
      </div>
      <div className='action-button-container'>
        <Cutout style={ { display: eggTriggered ? 'none' : 'block' } }>
          <div>
            <Button
              fullWidth
              onClick={ this.increaseClickCount }
              style={ { width: '150px' } }
            >{cestinoMessages[messageCounter].button}</Button>
          </div>
        </Cutout>
      </div>
    </div>);
  }
}

export { CestinoHeader, CestinoBody };

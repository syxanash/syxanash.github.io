import React, { Component } from 'react';
import { Button, Cutout } from 'react95';

import './Cestino.css';
import 'animate.css';

import tooltipMessages from '../../resources/tooltip-messages.json';

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
    clickCount: 1,
    tooltipCount: 0,
    eggTriggered: false,
  }

  increaseClickCount = () => {
    const { clickCount, tooltipCount } = this.state;

    let newTooltipCount = tooltipCount;
    if (tooltipCount + 1 < tooltipMessages.length) {
      newTooltipCount += 1;
    }

    if (tooltipCount === tooltipMessages.length - 1) {
      sessionStorage.setItem('eggTriggered', true);
      this.forceUpdate();
    } else {
      this.setState({ clickCount: clickCount + 1, tooltipCount: newTooltipCount });
    }
  }

  render = () => {
    const { tooltipCount } = this.state;
    const currentMessage = tooltipMessages[tooltipCount];
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
              style={ { width: '100px' } }
            >OK</Button>
          </div>
        </Cutout>
      </div>
    </div>);
  }
}

export { CestinoHeader, CestinoBody };

import React, { Component } from 'react';

import warningIcon from '../../resources/icons/warning.png';
import checkIcon from '../../resources/icons/check.png';

import './Fix.css';

class FixHeader extends Component {
  render = () => (
    <React.Fragment>
      fiks.exe
    </React.Fragment>
  )
}

class FixBody extends Component {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    const antiCheatString = 'DON\'T YOU DARE YOU FILTHY CHEATER!!!!';
    const antiCheatStringSecond = 'YOU THOUGHT IT WOULD BE THAT EASY!?!';

    if (localStorage.getItem('BROKEN_COMPUTER')) {
      localStorage.removeItem('BROKEN_COMPUTER');
      localStorage.removeItem(antiCheatString);
      localStorage.removeItem(antiCheatStringSecond);
      localStorage.setItem('fixed', true);
      sessionStorage.clear();
      window.location.reload();
    }
  }

  renderFixed = () => <span className='message-container'>
    <img src={ checkIcon } style={ { height: '52px' } } alt='success icon' /><h1>The computer has been fixed...</h1>
  </span>

  renderWarning = () => <span className='message-container'>
    <img src={ warningIcon } style={ { height: '52px' } } alt='warning icon' /><h1>You shouldn't fix what is not broken!</h1>
  </span>

  render = () => (<React.Fragment>
    { localStorage.getItem('fixed') ? this.renderFixed() : this.renderWarning() }
  </React.Fragment>
  )
}

export { FixHeader, FixBody };

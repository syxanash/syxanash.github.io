import React, { Component } from 'react';

import mainIcon from '../../resources/icons/favicon.png';
import warningIcon from '../../resources/icons/warning.png';
import checkIcon from '../../resources/icons/check.png';

import './Fix.css';

class FixHeader extends Component {
  render = () => (
    <span>
      <img src={ mainIcon } alt='main logo' style={ { height: '15px' } }/> fiks.exe
    </span>
  )
}

class FixBody extends Component {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    if (localStorage.getItem('broken')) {
      localStorage.removeItem('broken');
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

  render = () => (<div>
    { localStorage.getItem('fixed') ? this.renderFixed() : this.renderWarning() }
  </div>
  )
}

export { FixHeader, FixBody };

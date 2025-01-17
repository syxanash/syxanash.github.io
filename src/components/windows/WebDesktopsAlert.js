import React, { Component } from 'react';

import { Cutout, Button } from 'react95';

import './WebDesktopsAlert.css';

import checkIcon from '../../resources/icons/check.png';
import cookieIcon from '../../resources/icons/cookie.gif';

class WebDesktopsAlertHeader extends Component {
  render = () => (
    <React.Fragment>
      The End
    </React.Fragment>
  )
}

class WebDesktopsAlertBody extends Component {
  obtainFortuneCookie = () => {
    const { closeCurrentWindow } = this.props;

    const cookieMessage = 'Hokey religions and ancient GOTOs are no match for a good perl interpreter at your side, kid! - This cookie proves that you have visited all websites in simone.computer/webdesktops';

    document.cookie = `fortuneCookie=${cookieMessage}; SameSite=None; Secure; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    console.info(document.cookie);

    closeCurrentWindow();
  }

  render = () => (<div className='wd-congrats-message-container'>
    <div style={ { display: 'flex', alignItems: 'center' } }>
      <div style={ { float: 'left' } } >
        <img src={ checkIcon } style={ { height: '60px' } } alt='success icon' />
      </div>
      <span className='wd-congrats-message-text'>
        <span style={ { fontSize: '30px', paddingBottom: '15px' } }>Congrats on finishing exploring the list!</span>
        <span>Although you might have a bit too much time on your hands,
          here's a virtual fortune cookie!</span>
      </span>
    </div>
    <div className='action-button-container'>
      <Cutout>
        <div className="tooltip">
          <Button
            fullWidth
            onClick={ this.obtainFortuneCookie }
            style={ { width: '150px' } }
          >COOKIE&nbsp;&nbsp;<img height='20px' src={ cookieIcon } alt='cookie' /></Button>
          <span className="tooltiptext">
            Check your dev console if you don't believe me!
          </span>
        </div>
      </Cutout>
    </div>
  </div>);
}

export { WebDesktopsAlertHeader, WebDesktopsAlertBody };

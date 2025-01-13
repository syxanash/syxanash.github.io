import React, { Component } from 'react';

import { Cutout, Button } from 'react95';

import './WebDesktopsAlert.css';

import checkIcon from '../../resources/icons/check.png';

class WebDesktopsAlertHeader extends Component {
  render = () => (
    <React.Fragment>
      The End
    </React.Fragment>
  )
}

class WebDesktopsAlertBody extends Component {
  render = () => {
    const { closeCurrentWindow } = this.props;

    return (<div className='wd-congrats-message-container'>
      <div style={ { display: 'flex', alignItems: 'center' } }>
        <div style={ { float: 'left', paddingRight: '20px' } } >
          <img src={ checkIcon } style={ { height: '60px' } } alt='success icon' />
        </div>
        <span className='wd-congrats-message-text'>
          Congrats on finishing exploring the list! :)<br />
          You might have too much time on your hands...
        </span>
      </div>
      <div className='action-button-container'>
        <Cutout>
          <div>
            <Button
              fullWidth
              onClick={ closeCurrentWindow }
              style={ { width: '150px' } }
            >Ok</Button>
          </div>
        </Cutout>
      </div>
    </div>);
  }
}

export { WebDesktopsAlertHeader, WebDesktopsAlertBody };

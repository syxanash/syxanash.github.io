import React, { Component } from 'react';
import { Button, Cutout } from 'react95';

import './Unknown.css';

import unknownIcon from '../../resources/icons/unknown.gif';

class UnknownHeader extends Component {
  render = () => (
    <span>
      <img src={ unknownIcon } alt='main icon' style={ { height: '15px' } }/>
    </span>
  )
}

class UnknownBody extends Component {
  render = () => {
    const { closeWindow } = this.props;

    const foundAgent = localStorage.getItem('foundAgent') === 'true';

    const windowMessage = foundAgent
      ? <span className='blink'>Investigate the bugs in <b>Cestino</b></span>
      : <span className='blink'>Find the <b>Agent</b>, he might know what this is about...</span>;

    return (
      <React.Fragment>
        <div className='unknown-subtext'>
          <Cutout className='hint-message-style' style={ { padding: '15px' } }>
            <div style={ { textAlign: 'center', paddingBottom: '10px' } }>
              <span className='hint-message-style-header'>FILE CORRUPTED</span>
            </div>
            <div>{windowMessage}</div>
          </Cutout>
        </div>
        <div className='action-button-container'>
          <Cutout>
            <div>
              <Button
                fullWidth
                onClick={ () => closeWindow() }
                style={ { width: '150px' } }
              >OK</Button>
            </div>
          </Cutout>
        </div>
      </React.Fragment>
    );
  }
}

export { UnknownHeader, UnknownBody };

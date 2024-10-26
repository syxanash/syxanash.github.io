import React, { Component } from 'react';
import { Button } from 'react95';
import './CRTSwitch.css';

class CRTSwitch extends Component {
  render() {
    const { toggle, crtEnabled } = this.props;

    return (
      <div className='switch-container'>
        <span className='crt-label'>CRT</span>
        <div className='switch-button-container'>
          <Button
            onClick={ toggle }
            disabled={ crtEnabled }
            active={ crtEnabled }
            size='sm'
            aria-label="Enable CRT"
            style={ { height: '14px', width: '23px' } }
          > </Button>
          <Button
            onClick={ toggle }
            active={ !crtEnabled }
            disabled={ !crtEnabled }
            size='sm'
            aria-label="Enable LCD"
            style={ { height: '14px', width: '23px' } }
          > </Button>
          { !crtEnabled && <div className='disabled-switch-bg' /> }
        </div>
        <span className='lcd-label'>LCD</span>
      </div>
    );
  }
}

export default CRTSwitch;

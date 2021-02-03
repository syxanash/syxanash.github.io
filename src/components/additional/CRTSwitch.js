import React, { Component } from 'react';
import { Button } from 'react95';
import './CRTSwitch.css';

class CRTSwitch extends Component {
  render() {
    const { toggle, crtEnabled } = this.props;

    return (
      <div className='switch-container'>
        <span className='crt-label'>CRT</span>
        <Button
          onClick={ toggle }
          disabled={ crtEnabled }
          active={ crtEnabled }
          size='sm'
          style={ { height: '14px', width: '23px' } }
        > </Button>
        <Button
          onClick={ toggle }
          active={ !crtEnabled }
          disabled={ !crtEnabled }
          size='sm'
          style={ { height: '14px', width: '23px' } }
        > </Button>
        { crtEnabled ? null : <div className='disabled-switch-bg' /> }
      </div>
    );
  }
}

export default CRTSwitch;

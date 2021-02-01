import React, { Component } from 'react';
import { Button } from 'react95';
import './CRTSwitch.css';

class CRTSwitch extends Component {
  render() {
    const { toggle, crtEnabled } = this.props;

    return (
      <div style={ { position: 'absolute', right: '20px', bottom: '2px' } }>
        <span className='crt-label'>CRT</span>
        <Button
          onClick={ toggle }
          disabled={ crtEnabled }
          active={ crtEnabled }
          size='sm'
          style={ { opacity: '0.8', height: '14px', width: '23px' } }
        > </Button>
        <Button
          onClick={ toggle }
          active={ !crtEnabled }
          disabled={ !crtEnabled }
          size='sm'
          style={ { opacity: '0.8', height: '14px', width: '23px' } }
        > </Button>
      </div>
    );
  }
}

export default CRTSwitch;

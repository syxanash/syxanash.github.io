import React, { Component } from 'react';
import { Button, Cutout } from 'react95';
import './OSInfoWindow.css';
import pippoOSlogo from '../../resources/images/pippoOS.gif';

class OSInfoWindowHeader extends Component {
  render = () => (
    <span>
      Pippo Operating System
    </span>
  )
}

class OSInfoWindowBody extends Component {
  render = () => {
    return (<div className='main-os-logo-div'>
      <Cutout style={ { width: '208px', marginLeft: '25px' } }>
        <Button id='os_logo' size='lg' fullwidth style={ { width: '200px', height: '140px' } }>
          <img src={ pippoOSlogo } alt='Pippo OS logo' height='130px' />
        </Button>
      </Cutout>
      <div className='os-title'>Pippo OS</div>
      <div className='os-subtitle'>The <code><b>foo</b></code> Desktop Experience</div>
      <div className='os-version'>Version 1.66.6</div>
      <div className='os-copyright'>
        &trade; and &copy; 2007-{new Date().getFullYear()} Simone's Computer Inc.<br />
        All Righty Rights Reserved. License and Warranty
      </div>
    </div>);
  }
}

export { OSInfoWindowHeader, OSInfoWindowBody };

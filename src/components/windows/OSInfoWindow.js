import React, { Component } from 'react';
import { Button, Cutout } from 'react95';
import './OSInfoWindow.css';
import pippoOSlogo from '../../resources/images/pippo.gif';

class OSInfoWindowHeader extends Component {
  render = () => (
    <span className='window-title-text'>
      Pippo Operating System
    </span>
  )
}

class OSInfoWindowBody extends Component {
  openYoutubeLink = () => {
    window.open('https://www.youtube.com/watch?v=dWgglyak6jA', '_blank');
  }

  render = () => (<div className='main-os-logo-div'>
    <Cutout style={ { width: '203px', marginLeft: '40px' } }>
      <Button id='os_logo' size='lg' fullwidth style={ { width: '195px', height: '140px' } } onClick={ this.openYoutubeLink }>
        <img src={ pippoOSlogo } alt='Pippo OS logo' height='130px' />
      </Button>
    </Cutout>
    <div className='os-title'>
      Pippo OS
    </div>
    <div className='os-subtitle'>The <span className='code-block'><b>foobar</b></span> Desktop Experience</div>
    <div className='os-version'>Version 1.66.6</div>
    <div className='os-copyright'>
      &trade; and &copy; 2007-{new Date().getFullYear()} Simone's Computer Inc.<br />
      All Righty Rights Reserved. License and Warranty
    </div>
  </div>);
}

export { OSInfoWindowHeader, OSInfoWindowBody };

import React, { Component } from 'react';
import {
  Button, Cutout, Anchor,
} from 'react95';
import mainIcon from '../../resources/icons/error.png';
import './Konami.css';

class KonamiHeader extends Component {
  render = () => (
    <span>
      Error
    </span>
  )
}

class KonamiBody extends Component {
  state = {
    showReport: false,
  }

  toggleReport = () => {
    this.setState({ showReport: true });
  }

  render = () => {
    // This easter egg is dedicated to
    // my old friend Gabriele, who made me
    // discover the Konami Code for the
    // first time. Although I never lived
    // the wild era of old gaming consoles
    // I want to make you smile by
    // triggering a special hidden window
    // when you enter the Code!!!
    // And also this is totally not a message
    // to stretch the code for the line 69 :)

    const { closeWindow } = this.props;
    const { showReport } = this.state;

    return (<React.Fragment>
      <div className='header-error'>
        <span>
          <img
            src={ mainIcon }
            alt='trembling error'
            className='error-icon shake'
          />
          Pippo OS has encountered a problem and needs to close.
          We are sorry for the inconvenience.
        </span>
      </div>
      <div className='useless-error-message'>
        <p>
          if you were in the middle of something,
          the information you were working on might be lost.
        </p>
        <p>
          <span style={ { fontWeight: 'bolder' } }>Please tell Simone about this problem.</span><br />
          <span>
            We have created an error report that you can
            send to help us improve Pippo OS.
            We will treat this report as confidential and anonymous.
          </span>
        </p>
        <p>To see what data this error report contains,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='error-report-link' onClick={ this.toggleReport }>click here.</span></p>
      </div>
      <Cutout style={ { display: showReport ? 'block' : 'none' } } className='error-cutout'>
        <div className='error-report-space'>
          <p>Line: 69<br />Error: 'TooManyEasterEggsException' <Anchor href="https://github.com/syxanash/syxanash.github.io/blob/development/src/components/windows/Konami.js" target="_blank">@ Konami.js</Anchor></p>
          <br />
          <br />
        </div>
      </Cutout>
      <div className='bottom-buttons'>
        <Anchor
          href='https://www.youtube.com/watch?v=mkvWXbGrCx0'
          style={ { color: '#000000', textDecoration: 'none' } }
        >
          <Button
            style={ { width: '160px' } }
            size='md'
          ><span className='underline-text'>S</span>end Error Report</Button>
        </Anchor>
        <Button
          style={ { marginLeft: '10px', width: '120px' } }
          size='md'
          onClick={ closeWindow }
        ><span className='underline-text'>D</span>on't Send</Button>
      </div>
    </React.Fragment>
    );
  }
}

export { KonamiHeader, KonamiBody };

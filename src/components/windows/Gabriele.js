// This easter egg is dedicated to
// my old friend Gabriele, who made me
// discover the Konami Code for the
// first time. Although I never lived
// the wild era of old gaming consoles
// I want to make you smile by
// triggering a special hidden window
// when you enter the combination!!!
// And also this is totally not a message
// to stretch the code for the line 69 :)
import React, { Component } from 'react';
import {
  Button, Cutout, Anchor,
} from 'react95';
import errorIcon from '../../resources/icons/error.png';
import './Gabriele.css';
import SoundEffects from '../additional/SoundEffects';
import configUrls from '../../resources/config-urls.json';

class GabrieleHeader extends Component {
  render = () => <React.Fragment>Error</React.Fragment>
}

class GabrieleBody extends Component {
  state = {
    showReport: false,
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    SoundEffects.errorSound.load();
    SoundEffects.errorSound.play();
  }

  toggleReport = () => { this.setState({ showReport: true }); }

  render = () => {
    const { crashWindow } = this.props;
    const { showReport } = this.state;

    return (<React.Fragment>
      <div className='header-error'>
        <span>
          <img
            src={ errorIcon }
            alt='trembling error'
            className='error-icon shake'
          />
          Pippo OS has encountered a problem and needs to close. We are sorry for the inconvenience.
        </span>
      </div>
      <div className='useless-error-message'>
        <p>
          if you were in the middle of something, the information you were working on might be lost.
        </p>
        <p>
          <span style={ { fontWeight: 'bolder' } }>Please tell Simone about this problem.</span><br />
          <span>
            We have created an error report that you can
            send to help us improve Pippo OS.
            We will treat this report as confidential and anonymous.
          </span>
        </p>
        <p>
          To see what data this error report contains,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='error-report-link' onClick={ this.toggleReport }>click here.</span></p>
      </div>
      <Cutout style={ { display: showReport ? 'block' : 'none' } } className='error-cutout'>
        <div className='error-report-space'>
          <p>Line: 69<br />Error: 'TooManyEasterEggsException' <Anchor href={ `${configUrls.repositoryUrl}/blob/development/src/components/windows/Gabriele.js#L69` } target="_blank">@ Gabriele.js</Anchor></p>
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
          onClick={ crashWindow }
        ><span className='underline-text'>D</span>on't Send</Button>
      </div>
    </React.Fragment>
    );
  }
}

export { GabrieleHeader, GabrieleBody };

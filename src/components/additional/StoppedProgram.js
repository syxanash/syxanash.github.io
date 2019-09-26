import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Typist from 'react-typist';

import './StoppedProgram.css';

const backgroundImages = require.context('../../resources/images/backgrounds', true);

class Poweroff extends Component {
  state = {
    shouldStopWindowing: false,
  };

  render() {
    const { shouldStopWindowing } = this.props;

    if (!shouldStopWindowing) {
      return null;
    }

    return (<React.Fragment>
      <Helmet>
        <style>
          {
            `body {
              background: url(${backgroundImages('./h4x0r_green.gif')});
            }`
          }
        </style>
      </Helmet>
      <div className='terminal-style'>
        <Typist avgTypingDelay={ 10 } cursor={ { show: false } }>
          <div>^C</div>
          <div>syx@smn.cmptr:~$ <span className='blink-text'>█</span></div>
        </Typist>
      </div>
    </React.Fragment>);
  }
}

export default Poweroff;

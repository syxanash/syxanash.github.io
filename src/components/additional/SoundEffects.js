import React, { Component } from 'react';

import poweroffSound from '../../resources/sounds/poweroff.wav';
import errorSound from '../../resources/sounds/error.wav';
import loopTVSound from '../../resources/sounds/looptv_chime.wav';

class SoundEffects extends Component {
  render() {
    const { muted } = this.props;
    return (
      <span>
        <audio id='poweroffSound' src={ poweroffSound } type="audio/wav" muted={ muted } />
        <audio id='errorSound' src={ errorSound } type="audio/wav" muted={ muted } />
        <audio id='loopTvSound' src={ loopTVSound } type="audio/wav" muted={ muted } />
      </span>
    );
  }
}

export default SoundEffects;

import React, { Component } from 'react';

import poweroffSound from '../../resources/sounds/poweroff.wav';

class SoundEffects extends Component {
  render() {
    const { muted } = this.props;
    return (
      <span>
        <audio id='poweroffSound' src={ poweroffSound } type="audio/wav" muted={ muted } />
      </span>
    );
  }
}

export default SoundEffects;

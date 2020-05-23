import { Howl } from 'howler';

import poweroffSound from '../../resources/sounds/poweroff.wav';
import errorSound from '../../resources/sounds/error.wav';
import loopTVSound from '../../resources/sounds/looptv_chime.wav';

const SoundEffects = {
  errorSound: new Howl({
    src: [errorSound],
  }),
  poweroffSound: new Howl({
    src: [poweroffSound],
  }),
  loopTVSound: new Howl({
    src: [loopTVSound],
  }),
};

export default SoundEffects;

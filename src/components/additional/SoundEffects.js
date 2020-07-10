import { Howl } from 'howler';

import poweroffSound from '../../resources/sounds/poweroff.wav';
import errorSound from '../../resources/sounds/error.wav';
import loopTVSound from '../../resources/sounds/looptv_chime.wav';
import rebootSound from '../../resources/sounds/reboot.wav';

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
  rebootSound: new Howl({
    src: [rebootSound],
  }),
};

export default SoundEffects;

import { Howl } from 'howler';

import poweroffSound from '../../resources/sounds/poweroff.wav';
import errorSound from '../../resources/sounds/error.wav';
import loopTVSound from '../../resources/sounds/looptv_chime.wav';
import rebootSound from '../../resources/sounds/reboot.wav';
import userOnline from '../../resources/sounds/online.wav';

const SoundEffects = {
  errorSound: new Howl({
    src: [errorSound],
    preload: false,
  }),
  poweroffSound: new Howl({
    src: [poweroffSound],
    preload: false,
  }),
  loopTVSound: new Howl({
    src: [loopTVSound],
    preload: false,
  }),
  rebootSound: new Howl({
    src: [rebootSound],
    preload: false,
  }),
  userOnline: new Howl({
    src: [userOnline],
    preload: false,
  }),
};

export default SoundEffects;

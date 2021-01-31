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
    html5: true,
  }),
  poweroffSound: new Howl({
    src: [poweroffSound],
    preload: false,
    html5: true,
  }),
  loopTVSound: new Howl({
    src: [loopTVSound],
    preload: false,
    html5: true,
  }),
  rebootSound: new Howl({
    src: [rebootSound],
    preload: false,
    html5: true,
  }),
  userOnline: new Howl({
    src: [userOnline],
    preload: false,
    html5: true,
  }),
};

export default SoundEffects;

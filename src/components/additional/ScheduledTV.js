import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ReactPlayer from 'react-player';
import 'animate.css';

import UnoMattinaVideo from '../../resources/video/unomattina.mp4';
import LunediFilmVideo from '../../resources/video/lunedifilm.mp4';
import tvRemote from '../../resources/icons/pointers/tv-remote.gif';

import './ScheduledTV.css';

class ScheduledTV extends Component {
  constructor(props) {
    super(props);

    this.unoMattinaTimeout = undefined;
    this.lunediFilmTimeout = undefined;
    this.tvOutputTimeout = undefined;

    this.state = {
      scheduledTVOn: false,
      disableTVOutput: false,
      videoToPlay: undefined,
    };
  }

  componentDidMount = () => {
    const { disableTVOutput } = this.state;

    function getOffsetMillisecondsDate(hour, minute, secs, day = undefined) {
      const targetDate = new Date();
      const now = new Date();

      targetDate.setHours(hour);
      targetDate.setMinutes(minute);
      targetDate.setSeconds(secs);
      targetDate.setMilliseconds(0);

      if (day === undefined) {
        const offesetMilliseconds = targetDate.getTime() - now.getTime();
        if (offesetMilliseconds < 0) {
          const daytoset = (now.getDay() + 1) % 7;
          const currentDay = targetDate.getDay();
          const distance = (daytoset + 7 - currentDay) % 7;
          targetDate.setDate(targetDate.getDate() + distance);
        }
      } else {
        const daytoset = day;
        const currentDay = targetDate.getDay();
        const distance = (daytoset + 7 - currentDay) % 7;
        targetDate.setDate(targetDate.getDate() + distance);
        const offesetMilliseconds = targetDate.getTime() - now.getTime();
        if (offesetMilliseconds < 0) {
          // set the timer to next week if in the current day we already
          // passed the time of the schedule
          targetDate.setDate(now.getDate() + 1 * 7);
        }
      }

      return targetDate.getTime() - now.getTime();
    }

    this.unoMattinaTimeout = setTimeout(() => {
      this.turnOnScheduledTV(UnoMattinaVideo);
    }, getOffsetMillisecondsDate(6, 50, 0));

    this.lunediFilmTimeout = setTimeout(() => {
      this.turnOnScheduledTV(LunediFilmVideo);
    }, getOffsetMillisecondsDate(21, 20, 0, 1));

    if (!disableTVOutput) {
      this.tvOutputTimeout = setTimeout(() => {
        this.setState({ disableTVOutput: true });
      }, 3 * 1000);
    }
  }

  componentWillUnmount = () => {
    if (this.unoMattinaTimeout) {
      clearTimeout(this.unoMattinaTimeout);
    }

    if (this.lunediFilmTimeout) {
      clearTimeout(this.lunediFilmTimeout);
    }

    if (this.tvOutputTimeout) {
      clearTimeout(this.tvOutputTimeout);
    }
  }

  turnOnScheduledTV = (videoToPlay) => {
    const { openScheduledTV } = this.props;
    this.setState({ scheduledTVOn: true, videoToPlay });
    openScheduledTV();
  }

  turnOffScheduledTV = () => {
    const { closeScheduledTV } = this.props;
    this.setState({ scheduledTVOn: false, videoToPlay: undefined });
    closeScheduledTV();
  }

  interceptPauseEvent = (e) => {
    if (!e.currentTarget.ended) {
      e.srcElement.play();
    }
  }

  render() {
    const { disableTVOutput, scheduledTVOn, videoToPlay } = this.state;

    if (!scheduledTVOn) {
      return null;
    }

    return (
      <div className='scheduledtv-container'>
        <Helmet>
          <style>
            {
              `* {
                overflow: hidden;
                cursor: url(${tvRemote}), auto;
              }`
            }
          </style>
        </Helmet>
        <ReactPlayer
          width='100%'
          height='100%'
          className='scheduledtv-video-container'
          url={ videoToPlay }
          playing muted playsinline
          controls
          onEnded={ this.turnOffScheduledTV }
          onPause={ this.interceptPauseEvent }
        />
        <div className={ `TV-output ${disableTVOutput ? 'animated fadeOut slower' : ''}` }>AV-1</div>
      </div>
    );
  }
}

export default ScheduledTV;

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ReactPlayer from 'react-player';
import 'animate.css';

import configUrls from '../../resources/config-urls.json';
import tvRemote from '../../resources/icons/pointers/tv-remote.gif';

import './ScheduledTV.css';

class ScheduledTV extends Component {
  constructor(props) {
    super(props);

    this.unoMattinaTimeout = undefined;
    this.lunediFilmTimeout = undefined;
    this.tassoniTimeout = undefined;

    this.tvOutputTimeout = undefined;

    this.state = {
      scheduledTVOn: false,
      tvSignalDisabled: false,
      videoLoaded: false,
      videoToPlay: undefined,
    };
  }

  getOffsetMillisecondsDate = (hour, minute, secs, day = undefined) => {
    const targetDate = new Date();
    const now = new Date();

    targetDate.setHours(hour);
    targetDate.setMinutes(minute);
    targetDate.setSeconds(secs);
    targetDate.setMilliseconds(0);

    if (day === undefined) {
      const offesetMilliseconds = targetDate.getTime() - now.getTime();
      // if scheduled time has already passed then set it to next day of the week
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

  componentDidMount = () => {
    this.unoMattinaTimeout = setTimeout(() => {
      this.turnOnScheduledTV(`${configUrls.backendUrl}/assets/video/tassoni.mp4`);
    }, this.getOffsetMillisecondsDate(6, 50, 0));

    this.lunediFilmTimeout = setTimeout(() => {
      this.turnOnScheduledTV(`${configUrls.backendUrl}/assets/video/lunedifilm.mp4`);
    }, this.getOffsetMillisecondsDate(21, 20, 0, 1));

    this.tassoniTimeout = setTimeout(() => {
      this.turnOnScheduledTV(`${configUrls.backendUrl}/assets/video/tassoni.mp4`);
    }, this.getOffsetMillisecondsDate(12, 0, 0));
  }

  componentWillUnmount = () => {
    if (this.unoMattinaTimeout) {
      clearTimeout(this.unoMattinaTimeout);
    }

    if (this.lunediFilmTimeout) {
      clearTimeout(this.lunediFilmTimeout);
    }

    if (this.tassoniTimeout) {
      clearTimeout(this.tassoniTimeout);
    }

    if (this.tvOutputTimeout) {
      clearTimeout(this.tvOutputTimeout);
    }
  }

  videoFinishedLoading = () => {
    this.setState({ videoLoaded: true });

    this.tvOutputTimeout = setTimeout(() => {
      this.setState({ tvSignalDisabled: true });
    }, 3 * 1000);
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
    const {
      tvSignalDisabled, scheduledTVOn, videoToPlay, videoLoaded,
    } = this.state;

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
          onReady={ this.videoFinishedLoading }
        />
        <div
          style={ { display: videoLoaded ? 'none' : 'block' } }
          className='black-screen-tv'
        />
        <div className={ `TV-output ${tvSignalDisabled ? 'animated fadeOut slower' : ''}` }>AV-1</div>
      </div>
    );
  }
}

export default ScheduledTV;

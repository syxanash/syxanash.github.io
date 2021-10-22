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
    this.angelusTimeout = undefined;

    this.tvOutputTimeout = undefined;

    this.state = {
      scheduledTVOn: false,
      tvSignalDisabled: false,
      videoLoaded: false,
      videoToPlay: undefined,
    };
  }

  getOffsetMilliseconds = (hour, minute, secs) => {
    const targetDate = new Date();

    targetDate.setHours(hour);
    targetDate.setMinutes(minute);
    targetDate.setSeconds(secs);
    targetDate.setMilliseconds(0);

    return targetDate.getTime() - new Date().getTime();
  }

  componentDidMount = () => {
    const today = new Date();
    const unoMattinaOffest = this.getOffsetMilliseconds(6, 50, 0);
    const lunedifilmOffset = this.getOffsetMilliseconds(21, 20, 0);
    const tassoniOffset = this.getOffsetMilliseconds(12, 0, 0);

    if (new Date().getHours() === 17
      && new Date().getMinutes() <= 59 && new Date().getMinutes() >= 55) {
      fetch(`${configUrls.backendUrl}/country`)
        .then(response => response.json())
        .then((data) => {
          const angelusOffset = this.getOffsetMilliseconds(18, 0, 0);
          this.angelusTimeout = data.country === 'IE' && angelusOffset > 0
            ? setTimeout(() => {
              this.turnOnScheduledTV(`${configUrls.backendUrl}/assets/video/angelus.mp4`);
            }, angelusOffset)
            : undefined;
        })
        .catch((errorObject) => {
          console.error(errorObject);
        });
    }

    this.unoMattinaTimeout = unoMattinaOffest > 0
      ? setTimeout(() => {
        this.turnOnScheduledTV(`${configUrls.backendUrl}/assets/video/unomattina.mp4`);
      }, unoMattinaOffest)
      : undefined;

    this.lunediFilmTimeout = lunedifilmOffset > 0 && today.getDay() === 1
      ? setTimeout(() => {
        this.turnOnScheduledTV(`${configUrls.backendUrl}/assets/video/lunedifilm.mp4`);
      }, lunedifilmOffset)
      : undefined;

    this.tassoniTimeout = tassoniOffset > 0
      ? setTimeout(() => {
        this.turnOnScheduledTV(`${configUrls.backendUrl}/assets/video/tassoni.mp4`);
      }, tassoniOffset)
      : undefined;
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

    if (this.angelusTimeout) {
      clearTimeout(this.angelusTimeout);
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

  unmute = (e) => {
    if (e.target.muted) {
      e.target.muted = false;
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
          controls={ false }
          onEnded={ this.turnOffScheduledTV }
          onReady={ this.videoFinishedLoading }
          onClick={ this.unmute }
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

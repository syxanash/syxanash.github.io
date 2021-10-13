import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ReactPlayer from 'react-player';
import 'animate.css';

import UnoMattinaVideo from '../../resources/video/unomattina.mp4';
import tvRemote from '../../resources/icons/pointers/tv-remote.gif';

import './UnoMattina.css';

class UnoMattina extends Component {
  constructor(props) {
    super(props);

    this.tvOutputTimeout = undefined;

    this.state = {
      disableTVOutput: false,
    };
  }

  componentWillUnmount = () => {
    if (this.tvOutputTimeout) {
      clearTimeout(this.tvOutputTimeout);
    }
  }

  componentDidMount = () => {
    const { disableTVOutput } = this.state;

    if (!disableTVOutput) {
      this.tvOutputTimeout = setTimeout(() => {
        this.setState({ disableTVOutput: true });
      }, 3 * 1000);
    }
  }

  render() {
    const { disableTVOutput } = this.state;
    const { chiudiUnoMattina } = this.props;

    return (
      <div className='unomattina-container'>
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
          className='unomattina-video-container'
          url={ UnoMattinaVideo }
          playing muted playsinline
          controls
          onEnded={ chiudiUnoMattina }
        />
        <div className={ `TV-output ${disableTVOutput ? 'animated fadeOut slower' : ''}` }>AV-1</div>
      </div>
    );
  }
}

export default UnoMattina;

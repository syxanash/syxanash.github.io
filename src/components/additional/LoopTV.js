import React, { Component } from 'react';
import _ from 'lodash';
import Helmet from 'react-helmet';
import 'animate.css';

import './LoopTV.css';
import loopList from '../../resources/loops-list.json';
import staticImage from '../../resources/images/static.gif';
import poweroffButton from '../../resources/icons/poweroff_button.png';
import tvRemote from '../../resources/icons/pointers/tv-remote.gif';

const loopImages = require.context('../../resources/images/loopTV', true);

class LoopTV extends Component {
  constructor(props) {
    super(props);

    this.tvOutputTimeout = undefined;

    this.state = {
      imageList: _.shuffle(loopList),
      imageIndex: 0,
      disableTVOutput: false,
      imageLoaded: false,
    };
  }

  componentWillUnmount = () => {
    if (this.tvOutputTimeout) {
      clearTimeout(this.tvOutputTimeout);
    }
  }

  changeLoopImage = () => {
    const { imageIndex, imageList } = this.state;

    this.setState({
      imageIndex: (imageIndex + 1) % imageList.length,
      imageLoaded: false,
    });
  }

  imageLoaded = () => {
    const { disableTVOutput, imageIndex, imageList } = this.state;

    // load the next image in the meantime
    const nextImageIndex = (imageIndex + 1) % imageList.length;
    new Image().src = loopImages(`./${imageList[nextImageIndex].img}`);

    this.setState({ imageLoaded: true });

    if (!disableTVOutput) {
      this.tvOutputTimeout = setTimeout(() => {
        this.setState({ disableTVOutput: true });
      }, 3 * 1000);
    }
  }

  render() {
    const {
      imageList, imageIndex, disableTVOutput, imageLoaded,
    } = this.state;
    const { turnOff } = this.props;

    return (
      <div className='image-container' onClick={ this.changeLoopImage }>
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
        <img
          style={ { display: imageLoaded ? 'block' : 'none' } }
          className='main-image-loop'
          src={ loopImages(`./${imageList[imageIndex].img}`) }
          alt='main loop gif'
          onLoad={ this.imageLoaded }
        />
        <img
          style={ { display: imageLoaded ? 'none' : 'block' } }
          className='main-image-loop'
          src={ staticImage }
          alt='static animation'
        />
        <div className={ `TV-output ${disableTVOutput ? 'animated fadeOut slower' : ''}` }>AV-2</div>
        <img
          className='poweroff-button'
          src={ poweroffButton }
          alt='power off tv button'
          onClick={ turnOff }
        />
      </div>
    );
  }
}

export default LoopTV;

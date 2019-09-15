import React, { Component } from 'react';
import _ from 'lodash';
import 'animate.css';

import './LoopTV.css';
import loopList from '../../resources/loops-list.json';
import staticImage from '../../resources/images/static.gif';

const loopImages = require.context('../../resources/images/loopTV', true);

class LoopTV extends Component {
  constructor(props) {
    super(props);

    this.tvOutputTimeout = undefined;
    this.captionTimeout = undefined;

    this.state = {
      imageList: _.shuffle(loopList),
      imageIndex: 0,
      disableTVOutput: false,
      disableCaption: false,
      imageLoaded: false,
    };
  }

  componentWillUmount = () => {
    if (this.tvOutputTimeout) {
      clearTimeout(this.tvOutputTimeout);
    }

    if (this.captionTimeout) {
      clearTimeout(this.captionTimeout);
    }
  }

  changeLoopImage = () => {
    const { imageIndex, imageList } = this.state;

    clearTimeout(this.captionTimeout);

    this.setState({
      imageIndex: (imageIndex + 1) % imageList.length,
      disableCaption: false,
      imageLoaded: false,
    });
  }

  imageLoaded = () => {
    this.setState({ imageLoaded: true });
  }

  render() {
    const {
      imageList, imageIndex, disableTVOutput, disableCaption, imageLoaded,
    } = this.state;
    const { shouldPowerOn } = this.props;

    if (!shouldPowerOn) {
      return null;
    }

    this.tvOutputTimeout = setTimeout(() => {
      this.setState({ disableTVOutput: true });
    }, 3 * 1000);

    this.captionTimeout = setTimeout(() => {
      this.setState({ disableCaption: true });
    }, 3 * 1000);

    return (
      <div className='image-container' onClick={ this.changeLoopImage }>
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
        <div className={ `TV-output ${disableTVOutput ? 'animated fadeOut slower' : ''}` }>AV-1</div>
        <div className={ `loop-caption ${disableCaption ? 'animated fadeOut slower delay-5s' : ''}` }>{ imageList[imageIndex].description }</div>
      </div>
    );
  }
}

export default LoopTV;

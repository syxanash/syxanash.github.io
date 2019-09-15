import React, { Component } from 'react';
import _ from 'lodash';
import 'animate.css';

import './LoopTV.css';

import loopList from '../../resources/loops-list.json';

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
    });
  }

  render() {
    const {
      imageList, imageIndex, disableTVOutput, disableCaption,
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
        <img className='main-image-loop' src={ `looptv/${imageList[imageIndex].img}` } alt='main loop gif' />
        <div className={ `TV-output ${disableTVOutput ? 'animated fadeOut slower' : ''}` }>AV-1</div>
        <div className={ `loop-caption ${disableCaption ? 'animated fadeOut slower delay-5s' : ''}` }>{ imageList[imageIndex].description }</div>
      </div>
    );
  }
}

export default LoopTV;

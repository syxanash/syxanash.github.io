import React, { Component } from 'react';
import Helmet from 'react-helmet';

const loaderFrames = require.context('../../resources/icons/pointers/loader', true);

const loaderAnimationInterval = 60;
const loaderIconFrames = 4;

class LoaderCursor extends Component {
  state = {
    frameIndex: 0,
  }

  componentDidMount() {
    if (!this.loaderIconInterval) {
      this.loaderIconInterval = setInterval(this.changeFrame, loaderAnimationInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.loaderIconInterval);
  }

  changeFrame = () => {
    const { frameIndex } = this.state;
    this.setState({ frameIndex: frameIndex + 1 });
  }

  render() {
    const { frameIndex } = this.state;

    return (
      <Helmet>
        <style>
          {
            `
            * {
              cursor: url(${loaderFrames(`./frame${frameIndex % loaderIconFrames}.gif`)}), auto !important;
            }
            `
          }
        </style>
      </Helmet>
    );
  }
}

export default LoaderCursor;

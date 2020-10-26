import React, { Component } from 'react';

import billImg from '../../resources/images/bill/bill.gif';
import './XBill.css';

const smashedFrames = require.context('../../resources/images/bill/smashed', true);

class XBill extends Component {
  constructor(props) {
    super(props);

    this.positionUpdaterInterval = undefined;
    this.smashAnimationInterval = undefined;

    this.smashFrameIndex = 0;

    this.state = {
      billPosition: {
        x: 200,
        y: 200,
        forward: true,
        stopped: false,
      },
      billImage: billImg,
    };
  }

  componentDidMount() {
    if (!this.positionUpdaterInterval) {
      this.positionUpdaterInterval = setInterval(this.updateCoordinates, 30);
    }
  }

  componentWillUnmount() {
    clearInterval(this.smashAnimationInterval);
    clearInterval(this.positionUpdaterInterval);
  }

  smashAnimationUpdater = () => {
    if (this.smashFrameIndex + 1 < 6) {
      this.smashFrameIndex = this.smashFrameIndex + 1;
    } else {
      clearInterval(this.smashAnimationInterval);
      this.setState({
        billPosition: {
          stopped: true,
        },
      });
    }

    this.setState({
      billImage: smashedFrames(`./smash${this.smashFrameIndex}.gif`),
    });
  }

  updateCoordinates = () => {
    const { billPosition } = this.state;

    let newXPosition;
    let newYPosition;
    let newHorizontalDirection = billPosition.forward;
    let newVerticalDirection = billPosition.down;

    if (billPosition.forward) {
      newXPosition = billPosition.x + 5;
    } else {
      newXPosition = billPosition.x - 5;
    }

    if (billPosition.down) {
      newYPosition = billPosition.y + 5;
    } else {
      newYPosition = billPosition.y - 5;
    }

    if (newXPosition >= document.body.clientWidth) {
      newHorizontalDirection = false;
    }

    if (newYPosition >= document.body.clientHeight) {
      newVerticalDirection = false;
    }

    if (newXPosition <= 0) {
      newHorizontalDirection = true;
    }

    if (newYPosition <= 0) {
      newVerticalDirection = true;
    }

    this.setState({
      billPosition: {
        x: newXPosition,
        y: newYPosition,
        forward: newHorizontalDirection,
        down: newVerticalDirection,
      },
    });
  }

  killBill = () => {
    clearInterval(this.positionUpdaterInterval);

    if (!this.smashAnimationInterval) {
      this.smashAnimationInterval = setInterval(this.smashAnimationUpdater, 60);
    }
  }

  render() {
    const { billPosition, billImage } = this.state;

    if (billPosition.stopped) {
      return null;
    }

    return (
      <div
        className='main-bill-div'

        style={ {
          position: 'absolute',
          top: `${billPosition.y}px`,
          left: `${billPosition.x}px`,
          marginLeft: '-40px',
          marginTop: '-30px',
          transform: billPosition.forward ? 'scaleX(-1)' : '',
        } }
        onClick={ this.killBill }
      >
        <img src={ billImage } alt='xbill' />
      </div>
    );
  }
}

export default XBill;

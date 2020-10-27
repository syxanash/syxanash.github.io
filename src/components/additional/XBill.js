import React, { Component } from 'react';

import billWalkingImg from '../../resources/images/bill/bill_walking.gif';
import billStoppedImg from '../../resources/images/bill/bill_stopped.gif';

import './XBill.css';

const smashedFrames = require.context('../../resources/images/bill/smashed', true);

class XBill extends Component {
  constructor(props) {
    super(props);

    this.mousePosition = {
      x: undefined,
      y: undefined,
    };

    this.positionUpdaterInterval = undefined;
    this.smashAnimationInterval = undefined;

    this.smashFrameIndex = 0;

    const { initialX = 100, initialY = 100 } = this.props;

    this.state = {
      billPosition: {
        x: initialX,
        y: initialY,
        forward: true,
        down: true,
        stopped: false,
      },
      billImage: billStoppedImg,
    };
  }

  componentDidMount() {
    if (!this.positionUpdaterInterval) {
      this.positionUpdaterInterval = setInterval(this.followMouse, 60);
    }

    document.addEventListener('mousemove', this.onMouseUpdate);
    document.addEventListener('mouseenter', this.onMouseUpdate);
  }

  componentWillUnmount() {
    clearInterval(this.smashAnimationInterval);
    clearInterval(this.positionUpdaterInterval);

    document.removeEventListener('mousemove', this.onMouseUpdate);
    document.removeEventListener('mouseenter', this.onMouseUpdate);
  }

  onMouseUpdate = (e) => {
    this.mousePosition.x = (e.pageX + 24);
    this.mousePosition.y = (e.pageY + 38);
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

  followMouse = () => {
    const { billPosition } = this.state;

    let newXPosition = billPosition.x;
    let newYPosition = billPosition.y;
    let lookingForward = billPosition.forward;
    let newBillImage = billWalkingImg;

    let isWalkingVertical = true;
    let isWalkingHorizontal = true;

    if (billPosition.x > this.mousePosition.x) {
      newXPosition = billPosition.x - 5;
      lookingForward = false;
    }

    if (billPosition.x < this.mousePosition.x) {
      newXPosition = billPosition.x + 5;
      lookingForward = true;
    }

    if (billPosition.y > this.mousePosition.y) {
      newYPosition = billPosition.y - 5;
    }

    if (billPosition.y < this.mousePosition.y) {
      newYPosition = billPosition.y + 5;
    }

    if (billPosition.x <= (this.mousePosition.x + 5)
      && billPosition.x >= (this.mousePosition.x - 5)) {
      newXPosition = billPosition.x;
      isWalkingHorizontal = false;
    }

    if (billPosition.y <= (this.mousePosition.y + 5)
      && billPosition.y >= (this.mousePosition.y - 5)) {
      newYPosition = billPosition.y;
      isWalkingVertical = false;
    }

    if (!isWalkingHorizontal && !isWalkingVertical) {
      newBillImage = billStoppedImg;
    }

    this.setState({
      billPosition: {
        x: newXPosition,
        y: newYPosition,
        forward: lookingForward,
      },
      billImage: newBillImage,
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

    if (newXPosition <= 48) {
      newHorizontalDirection = true;
    }

    if (newYPosition <= 76) {
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
          marginLeft: '-48px',
          marginTop: '-76px',
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

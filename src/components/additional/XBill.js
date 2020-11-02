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

    this.billImageWidth = 48;
    this.billImageHeight = 76;
    this.walkingStepPixelSpeed = 5;

    this.positionUpdaterInterval = undefined;
    this.smashAnimationInterval = undefined;

    this.smashFrameIndex = 0;
    this.smashAnimationFrames = 6;

    const { initialX = 100, initialY = 100 } = this.props;

    this.state = {
      billPosition: {
        x: initialX,
        y: initialY,
        forward: true,
        stopped: false,
      },
      billImage: billStoppedImg,
    };
  }

  componentDidMount() {
    if (!this.positionUpdaterInterval) {
      this.positionUpdaterInterval = setInterval(this.followMouse, 50);
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
    this.mousePosition.x = (e.pageX - (this.billImageWidth / 2));
    this.mousePosition.y = (e.pageY - (this.billImageHeight / 2));
  }

  smashAnimationUpdater = () => {
    if (this.smashFrameIndex + 1 < this.smashAnimationFrames) {
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

    let isWalkingVertical = false;
    let isWalkingHorizontal = false;

    if (billPosition.x > this.mousePosition.x) {
      newXPosition = billPosition.x - this.walkingStepPixelSpeed;
      lookingForward = false;
      isWalkingHorizontal = true;
    }

    if (billPosition.x < this.mousePosition.x) {
      newXPosition = billPosition.x + this.walkingStepPixelSpeed;
      lookingForward = true;
      isWalkingHorizontal = true;
    }

    if (billPosition.y > this.mousePosition.y) {
      newYPosition = billPosition.y - this.walkingStepPixelSpeed;
      isWalkingVertical = true;
    }

    if (billPosition.y < this.mousePosition.y) {
      newYPosition = billPosition.y + this.walkingStepPixelSpeed;
      isWalkingVertical = true;
    }

    if (billPosition.x <= (this.mousePosition.x + this.walkingStepPixelSpeed)
      && billPosition.x >= (this.mousePosition.x - this.walkingStepPixelSpeed)) {
      newXPosition = billPosition.x;
      isWalkingHorizontal = false;
    }

    if (billPosition.y <= (this.mousePosition.y + this.walkingStepPixelSpeed)
      && billPosition.y >= (this.mousePosition.y - this.walkingStepPixelSpeed)) {
      newYPosition = billPosition.y;
      isWalkingVertical = false;
    }

    this.setState({
      billPosition: {
        x: newXPosition,
        y: newYPosition,
        forward: lookingForward,
      },
      billImage: (!isWalkingHorizontal && !isWalkingVertical) ? billStoppedImg : billWalkingImg,
    });
  }

  killBill = () => {
    clearInterval(this.positionUpdaterInterval);

    if (!this.smashAnimationInterval) {
      this.smashAnimationInterval = setInterval(this.smashAnimationUpdater, 80);
    }
  }

  render() {
    const { billPosition, billImage } = this.state;

    if (billPosition.stopped) {
      return null;
    }

    return (
      <div
        className='main-bill-div animated bounceInLeft'
        style={ {
          top: `${billPosition.y}px`,
          left: `${billPosition.x}px`,
        } }
        onClick={ this.killBill }
      >
        <img src={ billImage } alt='xbill' className={ `${billPosition.forward ? 'flip-image' : ''}` } />
      </div>
    );
  }
}

export default XBill;

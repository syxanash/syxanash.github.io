import React, { Component } from 'react';

import billImg from '../../resources/images/bill.gif';

import './XBill.css';

class XBill extends Component {
  constructor(props) {
    super(props);

    this.positionUpdaterInterval = undefined;

    this.state = {
      billPosition: {
        x: 200,
        y: 200,
        forward: true,
      },
    };
  }

  componentDidMount() {
    if (!this.positionUpdaterInterval) {
      this.positionUpdaterInterval = setInterval(this.updateCoordinates, 30);
    }
  }

  componentWillUnmount() {
    clearInterval(this.positionUpdaterInterval);
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

  render() {
    const { billPosition } = this.state;

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
      >
        <img src={ billImg } alt='xbill'/>
      </div>
    );
  }
}

export default XBill;

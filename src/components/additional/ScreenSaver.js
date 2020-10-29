import React, { Component } from 'react';
import Helmet from 'react-helmet';

import smilePicture from '../../resources/images/smile.gif';

class ScreenSaver extends Component {
  constructor(props) {
    super(props);

    this.walkingStepPixelSpeed = 5;

    this.imageWidth = 278;
    this.imageHeight = 278;

    this.positionUpdaterInterval = undefined;

    this.state = {
      smilePosition: {
        x: Math.floor(Math.random() * ((document.body.clientWidth - this.imageWidth))),
        y: Math.floor(Math.random() * ((document.body.clientHeight - this.imageHeight))),
        forward: true,
        down: true,
      },
      smileImage: smilePicture,
    };
  }

  componentDidMount() {
    if (!this.positionUpdaterInterval) {
      this.positionUpdaterInterval = setInterval(this.bounce, 20);
    }
  }

  componentWillUnmount() {
    clearInterval(this.positionUpdaterInterval);
  }

  bounce = () => {
    const { smilePosition } = this.state;

    let newXPosition;
    let newYPosition;
    let newHorizontalDirection = smilePosition.forward;
    let newVerticalDirection = smilePosition.down;

    if (smilePosition.forward) {
      newXPosition = smilePosition.x + 5;
    } else {
      newXPosition = smilePosition.x - 5;
    }

    if (smilePosition.down) {
      newYPosition = smilePosition.y + 5;
    } else {
      newYPosition = smilePosition.y - 5;
    }

    if (newXPosition >= (document.body.clientWidth - this.imageWidth)) {
      newHorizontalDirection = false;
    }

    if (newYPosition >= (document.body.clientHeight - this.imageHeight)) {
      newVerticalDirection = false;
    }

    if (newXPosition <= 0) {
      newHorizontalDirection = true;
    }

    if (newYPosition <= 0) {
      newVerticalDirection = true;
    }

    this.setState({
      smilePosition: {
        x: newXPosition,
        y: newYPosition,
        forward: newHorizontalDirection,
        down: newVerticalDirection,
      },
    });
  }

  render() {
    const { smilePosition, smileImage } = this.state;
    const { shouldLockScreen } = this.props;

    if (!shouldLockScreen) {
      return null;
    }

    return (<React.Fragment>
      <Helmet>
        <style>
          {
            `body {
              background: url(data:image/gif;base64,R0lGODlhAQABAIABAAAAAAD/FywAAAAAAQABAAACAkQBADs=);
            }
            * {
              overflow: hidden;
              cursor: url(data:image/gif;base64,R0lGODlhAQABAIABAAAAAAD/FywAAAAAAQABAAACAkQBADs=), auto;
              webkit-touch-callout: none; /* iOS Safari */
               -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                  -moz-user-select: none; /* Old versions of Firefox */
                   -ms-user-select: none; /* Internet Explorer/Edge */
                       user-select: none; /* Non-prefixed version, currently
            }`
          }
        </style>
      </Helmet>
      <div
        style={ {
          fill: '#fff',
          position: 'absolute',
          top: `${smilePosition.y}px`,
          left: `${smilePosition.x}px`,
        } }
      >
        <img src={ smileImage } alt='pirate smile' />
      </div>
    </React.Fragment>);
  }
}

export default ScreenSaver;

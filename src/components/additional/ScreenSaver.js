import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Util from '../Util';

import './ScreenSaver.css';

const bouncingSmiles = require.context('../../resources/images/smiles', true);

class ScreenSaver extends Component {
  constructor(props) {
    super(props);

    this.walkingStepPixelSpeed = 7;

    this.positionUpdaterInterval = undefined;

    this.bouncingSmile = [
      {
        picture: bouncingSmiles('./smile1.gif'),
        size: 278,
        numbers: 2,
      },
      {
        picture: bouncingSmiles('./smile2.gif'),
        size: 63,
        numbers: 4,
      },
      {
        picture: bouncingSmiles('./smile3.gif'),
        size: 209,
        numbers: 2,
      },
    ];

    if (Util.isMobile()) {
      this.bouncingSmile = [
        {
          picture: bouncingSmiles('./smile2.gif'),
          size: 63,
          numbers: 4,
        },
        {
          picture: bouncingSmiles('./smile3.gif'),
          size: 209,
          numbers: 1,
        },
      ];
    }

    this.state = {
      allSmiles: [],
    };
  }

  componentDidMount() {
    if (!this.positionUpdaterInterval) {
      this.positionUpdaterInterval = setInterval(this.bounce, 20);
    }

    const newSmilesList = this.bouncingSmile.map(mainSmile => Array(mainSmile.numbers)
      .fill()
      .map(() => ({
        x: Math.floor(Math.random() * ((document.body.clientWidth - mainSmile.size))),
        y: Math.floor(Math.random() * ((document.body.clientHeight - mainSmile.size))),
        forward: Math.floor(Math.random() * (2)) % 2 === 0,
        down: Math.floor(Math.random() * (2)) % 2 === 0,
        image: mainSmile,
      })))
      .flat(2);

    this.setState({
      allSmiles: newSmilesList,
    });
  }

  componentWillUnmount() {
    clearInterval(this.positionUpdaterInterval);
  }

  bounce = () => {
    const { allSmiles } = this.state;

    const updatedSmiles = allSmiles.map((smile) => {
      let newXPosition;
      let newYPosition;
      let newHorizontalDirection = smile.forward;
      let newVerticalDirection = smile.down;

      if (smile.forward) {
        newXPosition = smile.x + this.walkingStepPixelSpeed;
      } else {
        newXPosition = smile.x - this.walkingStepPixelSpeed;
      }

      if (smile.down) {
        newYPosition = smile.y + this.walkingStepPixelSpeed;
      } else {
        newYPosition = smile.y - this.walkingStepPixelSpeed;
      }

      if (newXPosition >= (document.body.clientWidth - smile.image.size)) {
        newHorizontalDirection = false;
      }

      if (newYPosition >= (document.body.clientHeight - smile.image.size)) {
        newVerticalDirection = false;
      }

      if (newXPosition <= 0) {
        newHorizontalDirection = true;
      }

      if (newYPosition <= 0) {
        newVerticalDirection = true;
      }

      return {
        x: newXPosition,
        y: newYPosition,
        forward: newHorizontalDirection,
        down: newVerticalDirection,
        image: smile.image,
      };
    });

    this.setState({
      allSmiles: updatedSmiles,
    });
  }

  generateSmiles = () => {
    const { allSmiles } = this.state;

    const smilesComponents = allSmiles.map((smile, index) => (
      <div
        className={ `${index % 2 === 0 ? 'bouncing-animation' : ''} animated zoomIn fast` }
        key={ `ball_${index}` }
        style={ {
          fill: '#fff',
          position: 'absolute',
          top: `${smile.y}px`,
          left: `${smile.x}px`,
        } }
      >
        <img src={ smile.image.picture } alt='pirate smile' />
      </div>
    ));

    return smilesComponents;
  }

  render() {
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
      { this.generateSmiles() }
    </React.Fragment>);
  }
}

export default ScreenSaver;

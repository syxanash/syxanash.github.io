import React, { Component } from 'react';
import Helmet from 'react-helmet';

import easterEggObject from '../../resources/cestino-messages.json';

import circuitAnimation from '../../resources/images/circuit.gif';
import bugImage from '../../resources/images/bug.png';
import screenBackground from '../../resources/images/kernelpanic.gif';
import explosionAnim from '../../resources/images/explosion.gif';
import viewFinder from '../../resources/icons/viewfinder.gif';

import './BrokenScreen.css';

class BrokenScreen extends Component {
  constructor(props) {
    super(props);

    this.bugRefreshInterval = undefined;
    this.explosionTimeout = undefined;
    this.textAnimationTimeout = undefined;
    this.backgroundCircuits = parseInt(document.body.clientWidth / 4, 10);
    this.bugsInterval = 800;

    this.state = {
      randomCircuit: undefined,
      coordinates: [],
      bugsNumber: easterEggObject.brokenScreenMessages.length,
      bugsMessages: easterEggObject.brokenScreenMessages.reverse(),
      explosionVisibile: false,
      explosionCoordinates: { x: 0, y: 0 },
      textAnimation: false,
    };
  }

  generateBackgroundCircuit = () => Array(this.backgroundCircuits).fill().map((_, index) => (
    <div
      id={ `background_circuit_${index}` }
      key={ `background_circuit_${index}` }
      style={ {
        position: 'absolute',
        top: `${Math.floor(Math.random() * (document.body.clientHeight))}px`,
        left: `${Math.floor(Math.random() * (document.body.clientWidth))}px`,
        marginLeft: '-40px',
        marginTop: '-30px',
      } }
    >
      <img
        height='40px'
        src={ circuitAnimation }
        alt='icon'
      />
    </div>
  ));

  componentWillUnmount() {
    if (this.bugRefreshInterval) {
      clearInterval(this.bugRefreshInterval);
    }

    if (this.explosionTimeout) {
      clearTimeout(this.explosionTimeout);
    }

    if (this.textAnimationTimeout) {
      clearTimeout(this.textAnimationTimeout);
    }
  }

  componentDidMount = () => {
    this.setState({ randomCircuit: this.generateBackgroundCircuit() });
  }

  renderBug = () => {
    const { coordinates } = this.state;

    return coordinates.map((axis, index) => (<div
      id={ `floating_bug_${index}` }
      key={ `bug_${index}` }
      style={ {
        position: 'absolute',
        top: `${axis.bugY}px`,
        left: `${axis.bugX}px`,
        marginLeft: '-40px',
        marginTop: '-30px',
      } }
      onClick={ () => { this.deleteBug(axis.bugX, axis.bugY); } }
    >
      <img
        style={ { pointerEvents: 'none' } }
        height='50px'
        src={ bugImage }
        alt='icon'
      />
    </div>));
  }

  deleteBug = (x, y) => {
    const { bugsNumber } = this.state;
    this.setState({
      bugsNumber: bugsNumber - 1,
      explosionCoordinates: { x, y },
      explosionVisibile: true,
      textAnimation: true,
    });

    this.explosionTimeout = setTimeout(() => {
      this.setState({ explosionVisibile: false });
    }, 500);
    this.textAnimationTimeout = setTimeout(() => {
      this.setState({ textAnimation: false });
    }, 2000);
  }

  renderExplosion() {
    const { explosionVisibile, explosionCoordinates } = this.state;
    return (
      <div
        id={ 'bug_exploded' }
        key={ 'bug' }
        style={ {
          position: 'absolute',
          top: `${explosionCoordinates.y}px`,
          left: `${explosionCoordinates.x}px`,
          marginLeft: '-40px',
          marginTop: '-30px',
          display: explosionVisibile ? 'block' : 'none',
        } }
      >
        <img
          height='60px'
          src={ explosionAnim }
          alt='icon'
        />
      </div>
    );
  }

  updateAxis = () => {
    const { bugsNumber } = this.state;

    const newCoordinates = Array(bugsNumber).fill().map(() => ({
      bugX: Math.floor(Math.random() * (document.body.clientWidth)),
      bugY: Math.floor(Math.random() * (document.body.clientHeight)),
    }));

    this.setState({
      coordinates: newCoordinates,
    });
  }

  render() {
    const {
      randomCircuit, bugsNumber, bugsMessages, textAnimation,
    } = this.state;
    const { isScreenBroken } = this.props;

    if (!isScreenBroken) {
      return null;
    }

    localStorage.setItem('DON\'T YOU DARE YOU FILTHY CHEATER!!!!', 'DON\'T!');

    if (!this.bugRefreshInterval) {
      this.bugRefreshInterval = setInterval(this.updateAxis, this.bugsInterval);
    }

    return (<React.Fragment>
      <Helmet>
        <style>
          {
            `body {
              background: url(${screenBackground});
            }
            * {
              overflow: hidden;
              cursor: url(${viewFinder}) 24 24, auto;
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
      { randomCircuit }
      <div className='centered-item'>
        <div className='error-items'>
          <h1 className='blink'>ERROR</h1>
          <p>The computer has been permanently damaged!</p>
          <div className={ textAnimation ? 'shake' : '' }>
            <span className='error-message'>
              {bugsMessages[bugsNumber - 1]}
            </span>
          </div>
        </div>
      </div>
      { this.renderBug() }
      { this.renderExplosion() }
    </React.Fragment>);
  }
}

export default BrokenScreen;

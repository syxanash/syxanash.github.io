import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { Howl } from 'howler';

import 'animate.css';

import TheAgent from './TheAgent';

import easterEggObject from '../../resources/cestino-messages.json';

import rotatingSkull from '../../resources/images/skull.gif';
import gibsonBackground from '../../resources/images/gibson.png';
import backgroundGrid from '../../resources/images/background_grid.gif';
import backgroundGridReverse from '../../resources/images/background_grid_reverse.gif';
import circuitAnimation from '../../resources/images/circuit.gif';
import circuitAnimation2 from '../../resources/images/circuit2.gif';
import bugImage from '../../resources/images/spider.gif';
import bugImage2 from '../../resources/images/spider2.gif';
import calmBackground from '../../resources/images/kernelcalm.gif';
import panicBackground from '../../resources/images/kernelpanic.gif';
import explosionAnim from '../../resources/images/explosion.gif';
import viewFinder from '../../resources/icons/pointers/viewfinder.gif';

import pomuTrack from '../../resources/sounds/pomu.mp3';

import './BrokenScreen.css';

class BrokenScreen extends Component {
  constructor(props) {
    super(props);

    this.bugRefreshInterval = undefined;
    this.explosionTimeout = undefined;
    this.textAnimationTimeout = undefined;
    this.backgroundCircuits = parseInt(document.body.clientWidth / 7, 10);
    this.bugsInterval = 950;

    this.antiCheatString = 'DON\'T YOU DARE YOU FILTHY CHEATER!!!!';
    this.antiCheatStringSecond = 'YOU THOUGHT IT WOULD BE THAT EASY!?!';

    this.backgroundSong = new Howl({
      src: [pomuTrack],
      preload: false,
    });

    this.state = {
      randomCircuit: undefined,
      bugsList: [],
      bugsNumber: easterEggObject.brokenScreenMessages.length,
      bugsMessages: easterEggObject.brokenScreenMessages.reverse(),
      explosionVisibile: false,
      explosionAxis: { x: 0, y: 0 },
      textAnimation: false,
    };
  }

  generateBackgroundCircuit = () => Array(this.backgroundCircuits).fill().map((_, index) => (
    <div
      id={ `background_circuit_${index}` }
      key={ `background_circuit_${index}` }
      className={ `${index % 2 === 0 ? 'flip-image' : ''}` }
      style={ {
        pointerEvents: 'none',
        position: 'absolute',
        top: `${Math.floor(Math.random() * (document.body.clientHeight))}px`,
        left: `${Math.floor(Math.random() * (document.body.clientWidth))}px`,
        marginLeft: '-40px',
        marginTop: '-30px',
      } }
    >
      <img
        height='50px'
        src={ index % 2 === 0 ? circuitAnimation2 : circuitAnimation }
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

    this.backgroundSong.load();
    this.backgroundSong.play();

    sessionStorage.removeItem('eggTriggered');
  }

  renderBug = () => {
    const { bugsList } = this.state;

    return bugsList.map((axis, index) => (<div key={ `bug_container_${index}` }>
      <div id={ `web_${index}` } key={ `web_i_${index}` } className='web-line'
        style={
          {
            height: `${axis.bugY}px`,
            top: `${axis.bugY - axis.bugY}px`,
            left: `${axis.bugX + 20}px`,
            opacity: 0.5,
          }
        }
      />
      <div
        id={ `floating_bug_${index}` }
        key={ `bug_${index}` }
        className='animated bounceInDown'
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
          className={ `${index % 2 === 0 ? 'flip-image' : ''}` }
          style={ { pointerEvents: 'none' } }
          height='80px'
          src={ index % 4 === 0 ? bugImage2 : bugImage }
          alt='icon'
        />
      </div>
    </div>));
  }

  deleteBug = (x, y) => {
    const { bugsNumber } = this.state;

    const newBugsNumber = bugsNumber - 1;

    this.setState({
      bugsNumber: newBugsNumber,
      explosionAxis: { x, y },
      explosionVisibile: true,
      textAnimation: true,
    });

    this.explosionTimeout = setTimeout(() => {
      this.setState({ explosionVisibile: false });
    }, 500);

    if (newBugsNumber > 1) {
      if (this.textAnimationTimeout !== undefined) {
        clearTimeout(this.textAnimationTimeout);
      }
      this.textAnimationTimeout = setTimeout(() => {
        this.setState({ textAnimation: false });
      }, 2000);
    }
  }

  renderExplosion() {
    const { explosionVisibile, explosionAxis } = this.state;
    return (
      <div
        id={ 'bug_exploded' }
        key={ 'bug' }
        style={ {
          position: 'absolute',
          top: `${explosionAxis.y}px`,
          left: `${explosionAxis.x}px`,
          marginLeft: '-20px',
          marginTop: '-40px',
          display: explosionVisibile ? 'block' : 'none',
        } }
      >
        <img
          height='90px'
          src={ explosionAnim }
          alt='icon'
        />
      </div>
    );
  }

  updateAxis = () => {
    const { bugsNumber } = this.state;

    const newbugsList = Array(bugsNumber).fill().map(() => ({
      bugX: Math.floor(Math.random() * (document.body.clientWidth)),
      bugY: Math.floor(Math.random() * (document.body.clientHeight)),
    }));

    this.setState({
      bugsList: newbugsList,
    });
  }

  renderErrorText = () => {
    const { bugsMessages, textAnimation, bugsNumber } = this.state;

    return (
      <div className='error-items'>
        <img src={ rotatingSkull } alt='rotating skull' style={ { height: '120px', margin: '-20px', pointerEvents: 'none' } } />
        <h1 className='blink'>ERROR</h1>
        <p>THE COMPUTER HAS BEEN PERMANENTLY DAMAGED</p>
        <div className={ textAnimation ? 'shake' : '' }>
          <span style={ { color: 'greenyellow' } }>
            {bugsMessages[bugsNumber - 1]}
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { randomCircuit, bugsNumber } = this.state;
    const bugsCleaned = bugsNumber <= 0;

    if (bugsCleaned) {
      localStorage.removeItem(this.antiCheatString);
      localStorage.removeItem(this.antiCheatStringSecond);
    }

    if (!this.bugRefreshInterval) {
      if (localStorage.getItem('broken') !== 'true') {
        localStorage.removeItem(this.antiCheatString);
        localStorage.setItem(this.antiCheatStringSecond, 'AHAH!');
      } else {
        localStorage.setItem(this.antiCheatString, 'DON\'T!');
      }
      localStorage.removeItem('foundAgent');
      this.bugRefreshInterval = setInterval(this.updateAxis, this.bugsInterval);
    }

    return (<React.Fragment>
      <Helmet>
        <style>
          {
            `body {
              background: url(${bugsCleaned ? calmBackground : panicBackground});
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
      <div style={ { pointerEvents: 'none' } }>
        <div
          className='brightness-blend'
          style={ { filter: `hue-rotate(${bugsCleaned ? '0' : '250'}deg)` } }
        ></div>
        <img
          src={ bugsCleaned ? backgroundGrid : backgroundGridReverse }
          alt='moving grid'
          className='moving-grid'
          style={ { filter: `hue-rotate(${bugsCleaned ? '0' : '250'}deg)` } }
        />
        <img
          src={ bugsCleaned ? backgroundGrid : backgroundGridReverse }
          alt='distant moving grid'
          className='distant-moving-grid'
          style={ { filter: `hue-rotate(${bugsCleaned ? '0' : '250'}deg)` } }
        />
        <img
          src={ gibsonBackground }
          alt='gibson mainframes background'
          className='gibson-mainframe'
          style={ { filter: `hue-rotate(${bugsCleaned ? '250' : '190'}deg)` } }
        />
      </div>
      <div className='centered-item'>
        {
          bugsCleaned
            ? <TheAgent negative={ true } />
            : this.renderErrorText()
        }
      </div>
      { this.renderBug() }
      { this.renderExplosion() }
    </React.Fragment>);
  }
}

export default BrokenScreen;

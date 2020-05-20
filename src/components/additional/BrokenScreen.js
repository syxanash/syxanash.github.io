import React, { Component } from 'react';
import Helmet from 'react-helmet';

import circuitAnimation from '../../resources/images/circuit.gif';
import bugImage from '../../resources/icons/spiderwindow.gif';
import screenBackground from '../../resources/images/kernelpanic.gif';

import './BrokenScreen.css';

class BrokenScreen extends Component {
  constructor(props) {
    super(props);

    this.bugTimeout = undefined;

    this.state = {
      randomCircuit: undefined,
      bugX: 0,
      bugY: 0,
    };
  }

  renderRandomIcon = () => Array(500).fill().map((_, index) => (
    <div
      id={ `randommainIcon_${index}` }
      key={ `random_icon_${index}` }
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
    if (this.bugTimeout) {
      clearTimeout(this.bugTimeout);
    }
  }

  componentDidMount = () => {
    this.setState({ randomCircuit: this.renderRandomIcon() });
  }

  renderBug = () => {
    const { bugX, bugY } = this.state;

    return (<div
      id='floating_bug'
      style={ {
        position: 'absolute',
        top: `${bugY}px`,
        left: `${bugX}px`,
        marginLeft: '-40px',
        marginTop: '-30px',
      } }
    >
      <img
        height='40px'
        src={ bugImage }
        alt='icon'
      />
    </div>);
  }

  render() {
    const { randomCircuit } = this.state;
    const { isScreenBroken } = this.props;

    if (!isScreenBroken) {
      return null;
    }

    if (!this.bugTimeout) {
      this.bugTimeout = setInterval(() => {
        this.setState({
          bugX: Math.floor(Math.random() * (document.body.clientWidth)),
          bugY: Math.floor(Math.random() * (document.body.clientHeight)),
        });
      }, 2000);
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
            }`
          }
        </style>
      </Helmet>
      { randomCircuit }
      { this.renderBug() }
      <div className='centered-item'>
        <div className='error-items'>
          <h1 className='blink'>ERROR</h1>
          <p>The computer has been permanently damaged!</p>
          <div className='shake'>Squish 5 bugs roaming freely the network</div>
        </div>
      </div>
    </React.Fragment>);
  }
}

export default BrokenScreen;

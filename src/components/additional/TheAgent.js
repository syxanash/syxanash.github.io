import React, { Component } from 'react';
import Typist from 'react-typist';

import agentImg from '../../resources/images/the_agent.gif';
import agentImgShut from '../../resources/images/the_agent_shut.gif';

import 'animate.css';
import './TheAgent.css';

class TheAgent extends Component {
  state = {
    stillTalking: true,
  }

  closeMouth = () => {
    this.setState({ stillTalking: false });
  }

  renderSpeechText = (isTalking, text) => {
    if (isTalking) {
      return <Typist
        avgTypingDelay={ 25 }
        cursor={ { show: false } }
        onTypingDone={ this.closeMouth }
      >
        {text}
      </Typist>;
    }

    return <span>{text}</span>;
  }

  render() {
    const { stillTalking } = this.state;
    const { displayAgent } = this.props;

    const speechTextBeforeBug = <span>
      I'm the agent behind the window.
      I see you're exploring the graphical user interface,
      click all the buttons as much as you want but
      be careful to <b>Cestino</b> I'm not able to remove that bug somehow...
    </span>;

    const speechTextAfterBug = <span>
      Congratulations buddy! You were able to get rid of that pesky Cestino bug,
      I'm so grateful for your help. Even though you cannot judge my emotions from this GIF,
      I'm really happy right now!
    </span>;

    const finalSpeechText = localStorage.getItem('fixed') ? speechTextAfterBug : speechTextBeforeBug;

    if (!displayAgent) {
      return null;
    }

    return (<div className='agent-container'>
      <div className='agent-speech animated fadeInUp'>
        { this.renderSpeechText(stillTalking, finalSpeechText) }
      </div>
      <img src={ stillTalking ? agentImg : agentImgShut } style={ { height: '250px' } } alt='the secret agent' />
    </div>);
  }
}

export default TheAgent;

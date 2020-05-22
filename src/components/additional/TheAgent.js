import React, { Component } from 'react';
import Typist from 'react-typist';

import agentImg from '../../resources/images/the_agent.gif';
import agentImgSilent from '../../resources/images/the_agent_shut.gif';

import agentImgNegative from '../../resources/images/the_agent_negative.gif';
import agentImgSilentNegative from '../../resources/images/the_agent_shut_negative.gif';

import 'animate.css';
import './TheAgent.css';

class TheAgent extends Component {
  state = {
    stillTalking: true,
    imageLoaded: false,
    speechIndex: 0,
  }

  closeMouth = () => {
    this.setState({ stillTalking: false });
  }

  imageLoaded = () => {
    this.setState({ imageLoaded: true });
  }

  increaseSpeechIndex = () => {
    const { speechIndex } = this.state;
    this.setState({ speechIndex: speechIndex + 1, stillTalking: true });
  }

  renderSpeechBubble = (speechText) => {
    const { stillTalking, imageLoaded } = this.state;

    if (!imageLoaded) {
      return null;
    }

    return (<div className='agent-speech animated fadeIn'>
      {
        stillTalking
          ? <Typist
            avgTypingDelay={ 25 }
            cursor={ { show: false } }
            onTypingDone={ this.closeMouth }
          >
            {speechText}
          </Typist>
          : <span>{speechText}</span>
      }
    </div>);
  }

  render() {
    const { stillTalking, speechIndex } = this.state;
    const { displayAgent, negative } = this.props;

    if (!displayAgent) {
      return null;
    }

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

    const speechesForNegativeAgent = [
      <span>
        You might have deleted the last bug, but this whole computer was built by just one person
        I'm sure there's still something hiding out there!<br />
        <span className='continue-button blink' onClick={ this.increaseSpeechIndex }>&gt;Continue&lt;</span>
      </span>,
      <span>
        In the end this is just a bunch of hacked javascript,
        it won't take long before it all becomes obsolete. Just like GeoCities and
        MSN blogs this will all be gone in a few years...<br />
        <span className='continue-button blink' onClick={ this.increaseSpeechIndex }>&gt;Continue&lt;</span>
      </span>,
      <span>
        I guess it's true what they say about enjoying the ride and not the destination...
        Well I better go now, the deliveroo driver is downstairs with my sushi!<br />
        <span className='continue-button blink'><a href='/#/fixmycomputer'>&gt;Bye now!&lt;</a></span>
      </span>,
    ];

    let finalSpeechText = localStorage.getItem('fixed') ? speechTextAfterBug : speechTextBeforeBug;

    if (negative) {
      finalSpeechText = speechesForNegativeAgent[speechIndex];
    }

    const finalAgentImage = negative
      ? { talking: agentImgNegative, silent: agentImgSilentNegative }
      : { talking: agentImg, silent: agentImgSilent };

    return (<div className='agent-container'>
      <div className='agent-image'>
        {
          <img
            src={ stillTalking ? finalAgentImage.talking : finalAgentImage.silent }
            onLoad={ this.imageLoaded }
            style={ { height: '250px' } }
            alt='the secret agent'
          />
        }
      </div>
      { this.renderSpeechBubble(finalSpeechText) }
    </div>);
  }
}

export default TheAgent;

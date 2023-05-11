import React, { Component } from 'react';
import Typist from 'react-typist';
import _ from 'lodash';
import { ThemeProvider } from 'styled-components';
import { Button } from 'react95';

import agentImg from '../../resources/images/the_agent.gif';
import agentImgSilent from '../../resources/images/the_agent_shut.gif';

import PippoThemeRedmond from '../../themes/PippoRedmond';

import 'animate.css';
import './TheAgent.css';

class TheAgent extends Component {
  state = {
    stillTalking: true,
    imageLoaded: false,
    speechIndex: 0,
    speechTextBlob: [],
  }

  componentDidMount() {
    const { negative } = this.props;

    const speechInWebDesktops = [
      <span>
        I'm the <b>Agent</b> behind the window.
        I see you're exploring the graphical user interface.
        This page is called <b>Web Desktops</b>, careful not to procrastinate too much in here!
      </span>,
      <span>
        I still remember Simone's grandma being so excited when she
        called him on the phone after seeing this page on top of <a href='https://news.ycombinator.com/item?id=23734093' rel='noopener noreferrer' target='_blank'>Hacker News</a>!
      </span>,
      <span>
        Anyways hope you also enjoy the rest of the website, have a pleasent
        stay here and maybe discover a few of my easter eggs :)
      </span>,
    ];

    const speechTextBeforeBug = [
      <span>
        I'm the <b>Agent</b> behind the window.
        I see you're exploring the graphical user interface,
        click all the buttons as much as you want but...
      </span>,
      <span>
        Be careful to <b>Cestino</b> I've been struggling to remove that bug lately,
        feel free to have a look yourself...
        I will offer a reward if you succeed!
      </span>,
    ];

    const speechTextAfterBug = [
      <span>
        Congratulations buddy! You were able to get rid of that pesky Cestino bug,
        I'm so grateful for your help. Even though you cannot judge my emotions from this GIF,
        I'm really happy right now!
      </span>,
      <span>
        As a reward you should now see on the main window&nbsp;
        Simone's Famous <b>Pizza Recipe</b>!
        Have fun making pizza at home
        and remember to always activate dry yeast before each use!
      </span>,
    ];

    const speechesForNegativeAgent = [
      <span>
        You might have deleted all my bugs, but this whole system was built by just one person
        I'm sure there's still something hiding out there!
      </span>,
      <span>
        In the end this is just a bunch of javascript,
        it won't take long before it all becomes obsolete. Just like GeoCities
        and Flash games this whole thing will stop working...
      </span>,
      <span>
        So have fun playing while it lasts!
        I guess it's true what they say about
        enjoying the ride and not the destination...
        Well I better go now, I think the sushi I ordered just arrived!
        <Button
          size='sm'
          square
          onClick={ () => this.openWebsiteURL({ url: '/#/fixmycomputer' }) }
          style={ {
            position: 'absolute',
            bottom: '0',
            right: '0',
            margin: '10px',
          } }
        >◓</Button>
      </span>,
    ];

    let finalSpeechTextBlob = localStorage.getItem('fixed')
      ? speechTextAfterBug
      : speechTextBeforeBug;

    const currentPage = _.last(window.location.href.split('/'));

    if (currentPage === 'webdesktops') {
      finalSpeechTextBlob = speechInWebDesktops;
    }

    if (negative) {
      finalSpeechTextBlob = speechesForNegativeAgent;
    }

    this.setState({ speechTextBlob: finalSpeechTextBlob });
  }

  closeMouth = () => {
    this.setState({ stillTalking: false });
  }

  imageLoaded = () => {
    this.setState({ imageLoaded: true });
  }

  increaseSpeechIndex = () => {
    const { speechIndex } = this.state;

    this.setState({
      speechIndex: speechIndex + 1,
      stillTalking: true,
    });
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
      {this.renderContinueButton()}
    </div>);
  }

  touchFace = () => {
    const { negative } = this.props;

    let message = 'hey stop touching my face!';

    if (negative) {
      message = 'stop aiming at my face with that thing!';
    }

    // eslint-disable-next-line no-alert
    alert(message);
  }

  renderContinueButton = () => {
    const { stillTalking, speechTextBlob, speechIndex } = this.state;

    if (speechIndex >= (speechTextBlob.length - 1)) {
      return null;
    }

    return (<Button
      size='sm'
      square
      onClick={ this.increaseSpeechIndex }
      disabled={ stillTalking }
      style={ {
        position: 'absolute',
        bottom: '0',
        right: '0',
        margin: '10px',
      } }
    >
      <span style={ { transform: 'translateY(-1px)' } }>⚈</span>
    </Button>);
  }

  openWebsiteURL = ({ url }) => {
    document.location.href = url;
  }

  render() {
    const { stillTalking, speechIndex, speechTextBlob } = this.state;
    const { negative } = this.props;

    if (!negative && speechIndex === 1 && localStorage.getItem('fixed') === null) {
      localStorage.setItem('foundAgent', true);
    }

    return (<ThemeProvider theme={ PippoThemeRedmond }>
      <div className='agent-container'>
        <div className='agent-image' style={ { filter: negative ? 'invert(1)' : 'invert(0)' } }>
          <div
            className='agent-face'
            onMouseEnter={ this.touchFace }
          />
          {
            <img
              src={ stillTalking ? agentImg : agentImgSilent }
              onLoad={ this.imageLoaded }
              style={ { height: '250px' } }
              alt='the secret agent'
            />
          }
        </div>
        { this.renderSpeechBubble(speechTextBlob[speechIndex]) }
      </div>
    </ThemeProvider>);
  }
}

export default TheAgent;

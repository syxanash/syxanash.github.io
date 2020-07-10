import React, { Component } from 'react';
import { Cutout } from 'react95';
import _ from 'lodash';
import Typist from 'react-typist';
import SoundEffects from '../additional/SoundEffects';
import projectsIcon from '../../resources/icons/development.gif';
import projectsList from '../../resources/projects-list.json';

import './Projects.css';

const PROMPT_CHARS = ['>', '$', '#', ']', 'é', 'ZX'];

class ProjectsHeader extends Component {
  render = () => (
    <span>
      <img src={ projectsIcon } alt='Projects' style={ { height: '15px' } }/> Projects
    </span>
  )
}

class ProjectsBody extends Component {
  state = {
    showPrompt: false,
    shellOutput: undefined,
    randomPromptChars: Object.keys(PROMPT_CHARS).map(e => PROMPT_CHARS[e])[
      Math.floor(Math.random() * Object.keys(PROMPT_CHARS).map(e => PROMPT_CHARS[e]).length)
    ],
  }

  componentDidMount() {
    document.addEventListener('keydown', this.enterPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.enterPressed);
  }

  enterPressed = (event) => {
    const { showPrompt } = this.state;

    const commands = {};

    commands.help = () => {
      this.setState({ shellOutput: 'yes, everyone needs it these days...' });
    };

    commands.ls = () => {
      this.setState({ shellOutput: 'there\'s already a list above, you blind?' });
    };

    commands.dir = () => {
      this.setState({ shellOutput: 'there\'s already a list above, you blind? (oh right, you\'re a windows user...)' });
    };

    commands.whoami = () => {
      this.setState({ shellOutput: navigator.userAgent });
    };

    commands.man = () => {
      this.setState({ shellOutput: 'woman' });
    };

    commands.woman = (args) => {
      if (_.isEmpty(args)) {
        this.setState({ shellOutput: 'What manual page do you want?' });
      } else {
        this.setState({ shellOutput: `No manual entry for ${escape(args[0])}` });
      }
    };

    commands.passwd = () => {
      this.setState({ shellOutput: 'nice try!' });
    };

    commands.hello = () => {
      this.setState({ shellOutput: 'hello to you too kind user!' });
    };

    commands.sudo = () => {
      this.setState({ shellOutput: 'we don\'t sudo here' });
    };

    commands.clear = () => {
      this.setState({ shellOutput: undefined });
    };

    commands.goto = () => {
      this.setState({ shellOutput: 'Hokey religions and ancient GOTOs are no match for a good blaster at your side, kid' });
    };

    commands.reboot = () => {
      const sound = SoundEffects.rebootSound;
      sound.play();
      this.setState({ shellOutput: 'Pippo OS is rebooting...' });
      sound.on('end', () => {
        window.location.href = '/';
      });
    };

    commands.vim = () => {
      window.location.href = 'https://www.gnu.org/software/emacs/';
    };

    commands.emacs = () => {
      window.location.href = 'https://www.vim.org';
    };

    commands.format = () => {
      localStorage.clear();
      sessionStorage.clear();
      alert('Pippo OS has been successfully formatted!');
      commands.reboot();
    };

    commands.shutdown = () => {
      const { poweroff } = this.props;

      poweroff();
    };

    commands.exit = () => {
      const { isFullscreen, closeWindow } = this.props;

      if (isFullscreen) {
        window.location.href = '/';
      } else {
        closeWindow();
      }
    };

    if (showPrompt && event.keyCode === 13) {
      const cmdString = document.getElementById('promptText').innerText.trim().split(' ');

      if (Object.keys(commands).includes(cmdString[0])) {
        commands[cmdString[0]](cmdString.slice(1));
      }

      const promptTextDiv = document.getElementById('promptText');

      if (promptTextDiv !== null) {
        promptTextDiv.innerText = '';
      }

      event.preventDefault();
    }
  }

  renderProjectsList = () => projectsList.map((item, index) => (<div key={ `${item.name}_${index}` } className='project-item'>
    <span className='bulletpoint'>#</span>
    <span> <a href={ item.url } className='project-item' target='_blank' rel='noopener noreferrer'>{ item.name }</a>
      <Typist avgTypingDelay={ 20 } cursor={ { show: false } }>
        <span className='bulletpoint'>└──</span> { item.description }
      </Typist>
    </span>
  </div>));

  focusPrompt = () => {
    this.setState({ showPrompt: true });
    document.getElementById('promptText').innerText = '';
    document.getElementById('promptText').focus();
  }

  render = () => {
    const { randomPromptChars, showPrompt, shellOutput } = this.state;

    const isZXSpectrum = randomPromptChars === 'ZX';

    return (<div>
      <Cutout className='cutout-area' style={ { padding: '10px' } }>
        <div className='comment-text' style={ { paddingBottom: '15px' } }>{'//'} Sometimes when I feel motivated and planets are perfectly aligned
        I work on small side projects to create something I need
        or to play with new tech. Here is a list of the ones I really enjoyed building:</div>
        {this.renderProjectsList()}
        <br />
        <div style={ { paddingBottom: '15px', display: shellOutput !== undefined ? 'inline-block' : 'none', color: 'lime' } }>
          <span style={ { color: 'red' } }>{'=>'} </span>
          { shellOutput }
        </div>
        <div onClick={ this.focusPrompt } className={ `prompt-area ${showPrompt ? '' : 'animated bounce fast delay-5s'}` }>{isZXSpectrum ? '' : `${randomPromptChars} `}
          <div id='promptText' style={ {
            display: 'inline-block',
            caretColor: 'transparent',
            outline: 'none',
            border: 'none',
          } } contentEditable='true'></div>
          <span className={ showPrompt ? 'blink' : '' }>{isZXSpectrum ? '🄺' : '█'}</span>
        </div>
      </Cutout>
    </div>);
  }
}

export { ProjectsHeader, ProjectsBody };

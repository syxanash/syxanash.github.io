import React, { Component } from 'react';
import { Cutout } from 'react95';
import _ from 'lodash';
import Typist from 'react-typist';
import SoundEffects from '../additional/SoundEffects';
import LoaderCursor from '../additional/LoaderCursor';
import ShellSpinner from '../additional/ShellSpinner';
import projectsIcon from '../../resources/icons/development.gif';
import projectsList from '../../resources/projects-list.json';

import './Projects.css';

const PROMPT_CHARS = ['>', '$', '#', ']', 'é', 'ZX', ''];

class ProjectsHeader extends Component {
  render = () => (
    <React.Fragment>
      <img src={ projectsIcon } alt='Projects' style={ { height: '15px' } }/> Projects
    </React.Fragment>
  )
}

class CmdLoader extends Component {
  render() {
    const { isLoading } = this.props;

    if (!isLoading) {
      return null;
    }

    return <React.Fragment>
      <ShellSpinner />
      <LoaderCursor />
    </React.Fragment>;
  }
}

class ProjectsBody extends Component {
  state = {
    showPrompt: false,
    shellOutput: undefined,
    stdError: false,
    shellWaiting: false,
    randomPromptChars: _.sample(PROMPT_CHARS),
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
        this.setState({ shellOutput: `No manual entry for ${args[0]}` });
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
      this.setState({ shellOutput: 'Hokey religions and ancient GOTOs are no match for a good Perl interpreter at your side, kid' });
    };

    commands.reboot = () => {
      const { poweroffSound } = SoundEffects;
      poweroffSound.load();
      poweroffSound.play();
      this.setState({ shellOutput: 'Pippo OS is rebooting...', shellWaiting: true });
      poweroffSound.on('end', () => {
        window.location.href = '/';
      });
    };

    commands.vim = () => {
      this.setState({ shellOutput: 'Opening VIM...', shellWaiting: true });
      window.location.href = 'https://www.gnu.org/software/emacs/';
    };

    commands.prince = () => {
      this.setState({ shellOutput: 'LOADING...', shellWaiting: true });
      window.location.href = 'https://archive.org/embed/msdos_Prince_of_Persia_1990';
    };

    commands.emacs = () => {
      this.setState({ shellOutput: 'Opening Emacs...', shellWaiting: true });
      window.location.href = 'https://www.vim.org';
    };

    commands.format = () => {
      localStorage.clear();
      sessionStorage.clear();

      this.setState({ shellOutput: 'Pippo OS has been successfully formatted!', shellWaiting: true });

      setTimeout(() => {
        commands.reboot();
      }, 1500);
    };

    commands.shutdown = () => {
      const { poweroff } = this.props;

      poweroff();
    };

    commands.exit = () => {
      const { isFullscreen, closeCurrentWindow } = this.props;

      if (isFullscreen) {
        window.location.href = '/';
      } else {
        closeCurrentWindow();
      }
    };

    if (showPrompt && event.keyCode === 13) {
      const cmdString = document.getElementById('promptText').innerText.trim().split(' ');

      if (_.isEmpty(cmdString[0])) {
        commands.clear();
        this.setState({ stdError: false });
      } else if (Object.keys(commands).includes(cmdString[0].toLowerCase())) {
        commands[cmdString[0].toLowerCase()](cmdString.slice(1));
        this.setState({ stdError: false });
      } else {
        this.setState({ shellOutput: 'COMMAND NOT FOUND', stdError: true });
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
    const {
      randomPromptChars, showPrompt, shellOutput, stdError, shellWaiting,
    } = this.state;

    const isZXSpectrum = randomPromptChars === 'ZX';

    return (<React.Fragment>
      <Cutout className='cutout-area' style={ { padding: '10px' } }>
        <div className='comment-text' style={ { paddingBottom: '15px' } }>{'/*'} Sometimes when I feel motivated and planets are perfectly aligned
        I work on small side projects to create something I need
        or to play with new tech. Here is a list of the ones I really enjoyed building {'*/'}</div>
        {this.renderProjectsList()}
        <br />
        <div style={ { paddingBottom: '15px', display: shellOutput !== undefined ? 'inline-block' : 'none', color: stdError ? 'yellow' : 'lime' } }>
          <span style={ { color: 'red' } }>{ stdError ? '[!]' : '=>' } </span>
          { shellOutput }
          <span style={ { display: shellWaiting ? 'inline-block' : 'none' } }>&nbsp;<CmdLoader isLoading={ shellWaiting } /></span>
        </div>
        <div
          style={ { display: shellWaiting ? 'none' : 'block' } }
          onClick={ this.focusPrompt }
          className={ `prompt-area ${showPrompt ? '' : 'animated bounce fast delay-5s'}` }
        >{isZXSpectrum ? '' : `${randomPromptChars} `}
          <div id='promptText' style={ {
            display: 'inline-block',
            caretColor: 'transparent',
            outline: 'none',
            border: 'none',
          } } contentEditable='true'></div>
          <span className={ showPrompt ? 'blink' : '' }>{isZXSpectrum ? '🄺' : '█'}</span>
        </div>
      </Cutout>
    </React.Fragment>);
  }
}

export { ProjectsHeader, ProjectsBody };

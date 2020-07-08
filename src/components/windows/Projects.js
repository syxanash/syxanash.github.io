import React, { Component } from 'react';
import { Cutout } from 'react95';
import Typist from 'react-typist';
import ReactDOM from 'react-dom';

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
    pressedEnter: false,
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

    if (showPrompt && event.keyCode === 13) {
      this.setState({ pressedEnter: true });
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
    ReactDOM.findDOMNode(this.refs.shellText).focus();
  }

  render = () => {
    const { randomPromptChars, showPrompt, pressedEnter } = this.state;

    const isZXSpectrum = randomPromptChars === 'ZX';

    return (<div>
      <Cutout className='cutout-area' style={ { padding: '10px' } }>
        <div className='comment-text' style={ { paddingBottom: '15px' } }>{'//'} Sometimes when I feel motivated and planets are perfectly aligned
        I work on small side projects to create something I need
        or to play with new tech. Here is a list of the ones I really enjoyed building:</div>
        {this.renderProjectsList()}
        <br />
        <div style={ { display: pressedEnter ? 'inline-block' : 'none', color: '#ff5d5d' } }>** SHELL CREATED FOR DEMO PURPOSE ONLY **</div>
        <div
          style={ { display: pressedEnter ? 'none' : 'block' } }
          onClick={ this.focusPrompt }>{isZXSpectrum ? '' : `${randomPromptChars} `}
          <div style={ {
            display: 'inline-block',
            caretColor: 'transparent',
            outline: 'none',
            border: 'none',
          } } ref="shellText" contentEditable='true'></div>
          <span style={ { display: isZXSpectrum || showPrompt ? 'inline-block' : 'none' } } className='blink'>{isZXSpectrum ? '🄺' : '█'}</span>
        </div>
      </Cutout>
    </div>);
  }
}

export { ProjectsHeader, ProjectsBody };

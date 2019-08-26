import React, { Component } from 'react';
import { Cutout } from 'react95';
import Typist from 'react-typist';

import projectsIcon from '../../resources/icons/development.gif';
import projectsList from '../../resources/projects-list.json';

import './Projects.css';

const PROMPT_CHARS = ['>', '$', '#', ']', 'é'];

class ProjectsHeader extends Component {
  render = () => (
    <span>
      <img src={ projectsIcon } alt='Projects' style={ { height: '15px' } }/> Projects
    </span>
  )
}

class ProjectsBody extends Component {
  state = {
    randomPromptChars: Object.keys(PROMPT_CHARS).map(e => PROMPT_CHARS[e])[
      Math.floor(Math.random() * Object.keys(PROMPT_CHARS).map(e => PROMPT_CHARS[e]).length)
    ],
  }

  renderProjectsList = () => projectsList.map((item, index) => (<div key={ `${item.name}_${index}` } className='project-item'>
    <span className='bulletpoint'>#</span>
    <span> <a href={ item.url } className='project-item' target='_blank' rel='noopener noreferrer'>{ item.name }</a>
      <Typist avgTypingDelay={ 20 } cursor={ { show: false } }>
        <span className='bulletpoint'>└──</span> { item.description }
      </Typist>
    </span>
  </div>));

  render = () => {
    const { randomPromptChars } = this.state;

    return (<div className='projects-window'>
      <Cutout className='cutout-area' style={ { padding: '10px' } }>
        <span className='comment-text'>{'//'} Sometimes when I feel motivated and planets are perfectly aligned
        I work on small side projects. I usually do it to create something I need
        or to play with new tech.</span>
        <p className='comment-text'>{'//'} Sporadically I also contribute to open source projects, while most of the these are on GitHub, here is a list of the ones I really enjoyed building:</p>
        {this.renderProjectsList()}
        <span>{randomPromptChars} <span className='blink-text'>█</span></span>
      </Cutout>
    </div>);
  }
}

export { ProjectsHeader, ProjectsBody };

import React, { Component } from 'react';
import {
  Button, Anchor, Cutout,
} from 'react95';

import './Footer.css';

import lastUpdatedFile from '../../resources/last-updated.json';
import clockIcon from '../../resources/icons/clock.png';
import codeIconLight from '../../resources/icons/code_light.gif';
import codeIconDark from '../../resources/icons/code_dark.gif';

class Footer extends Component {
  state = {
    lastUpdated: lastUpdatedFile,
    codeIcon: codeIconLight,
  }

  componentDidMount() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setState({ codeIcon: codeIconDark });
    }
  }

  renderLastCommitButton() {
    const { lastUpdated } = this.state;
    const date = new Date(lastUpdated.date);
    const currentYear = new Date().getFullYear();
    const repositoryYear = date.getFullYear();

    const displayDate = `${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${currentYear !== repositoryYear ? repositoryYear : ''}`;

    return (
      <Anchor
        href='https://github.com/syxanash/syxanash.github.io/commits/development'
        target='_blank'
        style={ { color: '#000000', textDecoration: 'none' } }
      >
        <Button fullWidth>
          <img src={ clockIcon } className="small-icon" alt="clock"/>
          <figcaption>Last updated {displayDate}</figcaption>
        </Button>
      </Anchor>
    );
  }

  render() {
    const { codeIcon } = this.state;
    const { active, onClick } = this.props;

    return (
      <Cutout className='footer-cut-out'>
        <div className='footer-buttons' style={ { float: 'left' } }>
          <Button fullWidth active={ active } onClick={ onClick }>
            <img src={ codeIcon } className='small-icon' alt="code"/>
            <figcaption>About this website</figcaption>
          </Button>
        </div>
        <div className='footer-buttons' style={ { float: 'right' } }>
          {this.renderLastCommitButton()}
        </div>
      </Cutout>
    );
  }
}

export default Footer;

import React, { Component } from 'react';
import {
  Button, Anchor, Cutout,
} from 'react95';

import Util from '../Util';
import configUrls from '../../resources/config-urls.json';

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
    if (Util.isDarkModeEnabled()) {
      this.setState({ codeIcon: codeIconDark });
    }
  }

  renderLastCommitButton() {
    const { lastUpdated } = this.state;
    const { disabled } = this.props;

    const displayDate = Util.formatDisplayDate(lastUpdated.date);

    const buttonContent = (
      <React.Fragment>
        <img src={ clockIcon } className="small-icon" alt="clock"/>
        <figcaption>Last updated {displayDate}</figcaption>
      </React.Fragment>
    );

    return disabled ? (
      <Button fullWidth disabled={ disabled }>
        {buttonContent}
      </Button>
    ) : (
      <Anchor
        href={ `${configUrls.repositoryUrl}/commits/development` }
        target='_blank'
        style={ { color: '#000000', textDecoration: 'none' } }
      >
        <Button fullWidth>
          {buttonContent}
        </Button>
      </Anchor>
    );
  }

  render() {
    const { codeIcon } = this.state;
    const { active, onClick, disabled } = this.props;

    return (
      <Cutout className='footer-cut-out'>
        <div className='footer-buttons' style={ { float: 'left' } }>
          <Button fullWidth active={ active } disabled={ disabled } onClick={ onClick }>
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

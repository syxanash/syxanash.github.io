import React, { Component } from 'react';
import _ from 'lodash';

import {
  Cutout, Toolbar, Button, Fieldset,
} from 'react95';

import Util from '../Util';

import './WebDesktops.css';
import remoteDesktops from '../../resources/remote-desktops.json';
import computerIcon from '../../resources/icons/remote.gif';
import mainWindowIcon from '../../resources/icons/webdesktops.gif';
import mobileWarningIcon from '../../resources/icons/mobilewarning.gif';
import smileyIcon from '../../resources/images/utopia_smiley.png';

class WebDesktopsHeader extends Component {
  render = () => (
    <span>
      <img src={ mainWindowIcon } alt='remote desktops icon' style={ { height: '15px' } }/> Web Desktops
    </span>
  )
}

class WebDesktopsBody extends Component {
  state = {
    desktopsList: _.shuffle(remoteDesktops),
    httpsOnlyEnabled: false,
  }

  renderSingleComputerIcon = ({ url, name }) => (
    <a className='website-link' href={ url } target='_blank' rel='noopener noreferrer'>
      <div className='computer-icon'>
        <img style={ { height: '65px' } } src={ computerIcon } alt='single desktop icon' />
      </div>
      <div className='website-favicon'>
        <img style={ { height: '25px' } } src={ `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}` } alt='computer icon' />
      </div>
      <div className='website-name'>
        <span>{ name }</span>
      </div>
    </a>
  )

  filterURLByHTTPS = (url) => {
    const { httpsOnlyEnabled } = this.state;

    if (httpsOnlyEnabled) {
      return url.match(/^(https):\/\//g) !== null;
    }

    return true;
  }

  openRandomURL = () => {
    const { desktopsList } = this.state;

    const linksList = desktopsList.filter(website => this.filterURLByHTTPS(website.url))
      .map(website => website.url);

    const randomLink = Object.keys(linksList).map(e => linksList[e])[
      Math.floor(Math.random() * Object.keys(linksList).map(e => linksList[e]).length)
    ];
    this.openWebsiteURL({ url: randomLink });
  }

  openWebsiteURL = ({ url }) => {
    window.open(url, '_blank');
  }

  toggleHTTPSFilter = () => {
    const { httpsOnlyEnabled } = this.state;
    this.setState({ httpsOnlyEnabled: !httpsOnlyEnabled });
  }

  renderAllIcons = () => {
    const { desktopsList } = this.state;

    const desktopIcons = desktopsList.filter(website => this.filterURLByHTTPS(website.url))
      .map(website => (
        <div
          className='single-icon'
          key={ `icon_${website.name}` }
        >
          { this.renderSingleComputerIcon(website) }
        </div>
      ));

    return desktopIcons;
  }

  renderMobileMessage = () => {
    if (!Util.isMobile()) {
      return null;
    }

    return (
      <Fieldset>
        <img src={ mobileWarningIcon } alt='mobile warning icon' style={ { float: 'left', paddingRight: '15px' } } />
        While some of these websites offer great mobile layouts I recommend
        exploring this list using a <b>desktop browser</b> (duh! <img src={ smileyIcon } alt='smile' style={ { height: '20px', marginBottom: '-3px' } } />)
      </Fieldset>
    );
  }

  render = () => {
    const { httpsOnlyEnabled } = this.state;

    return (
      <div>
        <div className='toolbar-container'>
          <Toolbar>
            <Button onClick={ this.openRandomURL } variant="menu">Random</Button>
            <Button onClick={ this.toggleHTTPSFilter } active={ httpsOnlyEnabled } variant="menu">HTTPS Only</Button>
            <Button onClick={ () => this.openWebsiteURL({ url: 'https://github.com/syxanash/awesome-web-desktops' }) } variant="menu">Contribute</Button>
          </Toolbar>
        </div>
        <div style={ { paddingBottom: '10px' } }>
          <Fieldset>
            If you are a fan of websites, web apps and portfolios which
            resemble desktop graphical user interfaces here is a curated list
          </Fieldset>
          { this.renderMobileMessage() }
        </div>
        <Cutout className='awesome-gui-cutoutbg'>
          <div className='awesome-gui-icons-container'>
            {this.renderAllIcons()}
          </div>
        </Cutout>
      </div>
    );
  }
}

export { WebDesktopsHeader, WebDesktopsBody };

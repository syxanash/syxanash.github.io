import React, { Component } from 'react';
import _ from 'lodash';

import {
  Cutout, Toolbar, Button, Fieldset,
} from 'react95';

import Util from '../Util';

import './WebDesktops.css';
import remoteDesktops from '../../resources/remote-desktops.json';

import mainWindowIcon from '../../resources/icons/webdesktops.gif';
import mobileWarningIcon from '../../resources/icons/mobilewarning.gif';
import hyperlinkIcon from '../../resources/icons/hyperlink.gif';

const webDesktopsIcons = require.context('../../resources/icons/webdesktops', true);

class WebDesktopsHeader extends Component {
  render = () => (
    <React.Fragment>
      <img src={ mainWindowIcon } alt='remote desktops icon' style={ { height: '15px' } }/> Web Desktops
    </React.Fragment>
  )
}

class WebDesktopsBody extends Component {
  state = {
    desktopsList: _.shuffle(remoteDesktops),
    sitesExplored: 0,
    showHelp: JSON.parse(localStorage.getItem('showInfoFieldset')) === null,
  }

  componentDidMount() {
    if (localStorage.getItem('webdesktopsExplored') === null) {
      localStorage.setItem('webdesktopsExplored', JSON.stringify([]));
    } else {
      let listExplored = [];
      const previousListExplored = JSON.parse(localStorage.getItem('webdesktopsExplored'));
      const webDesktopsList = this.state.desktopsList.map(website => website.url);
      const websitesRemoved = _.difference(previousListExplored, webDesktopsList);

      listExplored = previousListExplored;

      if (websitesRemoved.length > 0) {
        listExplored = _.difference(previousListExplored, websitesRemoved);
        localStorage.setItem('webdesktopsExplored', JSON.stringify(listExplored));
      }

      this.setState({ sitesExplored: listExplored.length });
    }
  }

  registerWebsite = (url) => {
    const listExplored = JSON.parse(localStorage.getItem('webdesktopsExplored'));
    if (!listExplored.includes(url)) {
      listExplored.push(url);
      localStorage.setItem('webdesktopsExplored', JSON.stringify(listExplored));

      this.setState({ sitesExplored: listExplored.length });
    }
  }

  renderSingleComputerIcon = ({ url, name, icon }) => (
    <a className='website-link' href={ url } target='_blank' onClick={ () => this.registerWebsite(url) } rel='noopener noreferrer'>
      <div className='computer-icon'>
        <img style={ { height: '65px' } } src={ webDesktopsIcons(`./${icon}.gif`) } alt='single desktop icon' />
      </div>
      <div className='website-favicon' style={ { left: icon === 'windows_new' ? '5px' : '1px' } }>
        <img style={ { height: '25px' } } src={ `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}` } alt='computer icon' />
      </div>
      <div className='website-name'>
        <span>{ name }</span>
      </div>
    </a>
  )

  openRandomURL = () => {
    const { desktopsList, sitesExplored } = this.state;

    const linksListUrls = desktopsList.map(website => website.url);
    let finalList = linksListUrls;

    const listExplored = JSON.parse(localStorage.getItem('webdesktopsExplored'));

    if (sitesExplored < linksListUrls.length) {
      finalList = _.difference(linksListUrls, listExplored);
    }

    const randomLink = _.sample(finalList);

    this.registerWebsite(randomLink);
    Util.openWebsiteURL({ url: randomLink });
  }

  renderAllIcons = () => {
    const { desktopsList } = this.state;

    const desktopIcons = desktopsList.map(website => (
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
        exploring this list using a <b>desktop browser</b> (duh!)
      </Fieldset>
    );
  }

  toggleShowHelp = () => {
    const firstDisplay = JSON.parse(localStorage.getItem('showInfoFieldset')) === null;
    if (firstDisplay) {
      localStorage.setItem('showInfoFieldset', false);
    }
    this.setState({ showHelp: !this.state.showHelp });
  }

  render = () => {
    const { desktopsList, sitesExplored, showHelp } = this.state;

    const exploredPercentage = Math.floor((sitesExplored * 100) / desktopsList.length);

    return (
      <React.Fragment>
        <div className='toolbar-container'>
          <Toolbar>
            <Button onClick={ this.openRandomURL } variant="menu"><img src={ hyperlinkIcon } alt='hyperlink' style={ { paddingRight: '4px' } } />Random</Button>
            <Button onClick={ () => Util.openWebsiteURL({ url: 'https://github.com/syxanash/awesome-web-desktops' }) } variant="menu"><img src={ hyperlinkIcon } alt='hyperlink' style={ { paddingRight: '4px' } } />Contribute</Button>
            <Button onClick={ this.toggleShowHelp } active={ showHelp } variant="menu">About</Button>
          </Toolbar>
        </div>
        <div style={ { paddingBottom: '10px', display: showHelp ? 'block' : 'none' } }>
          <Fieldset>
            If you are a fan of websites, web apps and portfolios which
            resemble desktop operating systems here is a curated list ready
            to be explored
          </Fieldset>
          { this.renderMobileMessage() }
        </div>
        <Cutout className='awesome-gui-cutoutbg'>
          <div className='awesome-gui-icons-container'>
            {this.renderAllIcons()}
          </div>
        </Cutout>
        <Cutout style={ { backgroundColor: '#c7c7df', marginBottom: '3px' } }>
          <div className='progress-content' style={ { width: `${exploredPercentage}%` } }></div>
          <div className='screen-footer'>
            <span>{sitesExplored} of {desktopsList.length} sites visited</span>
          </div>
        </Cutout>
      </React.Fragment>
    );
  }
}

export { WebDesktopsHeader, WebDesktopsBody };

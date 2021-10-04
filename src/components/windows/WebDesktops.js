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
    <span>
      <img src={ mainWindowIcon } alt='remote desktops icon' style={ { height: '15px' } }/> Web Desktops
    </span>
  )
}

class WebDesktopsBody extends Component {
  state = {
    desktopsList: _.shuffle(remoteDesktops),
    httpsOnlyEnabled: false,
    sitesExplored: 0,
  }

  componentDidMount() {
    if (localStorage.getItem('webdesktopsExplored') === null) {
      localStorage.setItem('webdesktopsExplored', JSON.stringify([]));
    } else {
      const listExplored = JSON.parse(localStorage.getItem('webdesktopsExplored'));
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

  filterURLByHTTPS = (url) => {
    const { httpsOnlyEnabled } = this.state;

    if (httpsOnlyEnabled) {
      return url.match(/^(https):\/\//g) !== null;
    }

    return true;
  }

  openRandomURL = () => {
    const { desktopsList, sitesExplored } = this.state;

    const linkListFiltered = desktopsList.filter(website => this.filterURLByHTTPS(website.url))
      .map(website => website.url);
    let finalList = linkListFiltered;

    const listExplored = JSON.parse(localStorage.getItem('webdesktopsExplored'));

    if (sitesExplored < linkListFiltered.length) {
      finalList = _.difference(linkListFiltered, listExplored);
    }

    const randomLink = Object.keys(finalList).map(e => finalList[e])[
      Math.floor(Math.random() * Object.keys(finalList).map(e => finalList[e]).length)
    ];

    this.registerWebsite(randomLink);
    Util.openWebsiteURL({ url: randomLink });
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
        exploring this list using a <b>desktop browser</b> (duh!)
      </Fieldset>
    );
  }

  render = () => {
    const { httpsOnlyEnabled, desktopsList, sitesExplored } = this.state;

    const exploredPercentage = Math.floor((sitesExplored * 100) / desktopsList.length);

    return (
      <React.Fragment>
        <div className='toolbar-container'>
          <Toolbar>
            <Button onClick={ this.openRandomURL } variant="menu"><img src={ hyperlinkIcon } alt='hyperlink' style={ { paddingRight: '4px' } } />Random</Button>
            <Button onClick={ this.toggleHTTPSFilter } active={ httpsOnlyEnabled } variant="menu">HTTPS</Button>
            <Button onClick={ () => Util.openWebsiteURL({ url: 'https://github.com/syxanash/awesome-web-desktops' }) } variant="menu"><img src={ hyperlinkIcon } alt='hyperlink' style={ { paddingRight: '4px' } } />Contribute</Button>
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
        <Cutout style={ { backgroundColor: '#c7c7df', marginBottom: '3px' } }>
          <div className='progress-content' style={ { width: `${exploredPercentage}%` } }></div>
          <div className='screen-footer'>
            <span>{sitesExplored} of {desktopsList.length} sites explored</span>
          </div>
        </Cutout>
      </React.Fragment>
    );
  }
}

export { WebDesktopsHeader, WebDesktopsBody };

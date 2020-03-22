import React, { Component } from 'react';

import {
  Cutout, Toolbar, Button
} from 'react95';

import './AwesomeGUI.css'
import remoteDesktops from '../../resources/remote-desktops.json';
import computerIcon from '../../resources/icons/remote.gif';
import mainWindowIcon from '../../resources/icons/awesome-gui.png';

class AwesomeGUIHeader extends Component {
  render = () => (
    <span>
      <img src={ mainWindowIcon } alt='remote desktops icon' style={ { height: '15px' } }/> Awesome GUI Websites
    </span>
  )
}

class AwesomeGUIBody extends Component {
  state = {
    httpsOnlyEnabled: false
  }

  renderSingleComputerIcon = ({ url, name }) => {
    return (
      <React.Fragment>
        <div className='computer-icon'>
          <img style={ { height: '65px' } } src={ computerIcon } alt='single desktop icon' />
        </div>
        <div className='website-favicon'>
          <img style={ { height: '25px' } } src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`} alt='computer icon' />
        </div>
        <div className='website-name'>
          { name }
        </div>
      </React.Fragment>
    );
  }

  filterURLByHTTPS = (url) => {
    const { httpsOnlyEnabled } = this.state;

    if (httpsOnlyEnabled) {
      return url.match(/^(https):\/\//g) !== null
    }

    return true;
  }

  openRandomURL = () => {
    const linksList = remoteDesktops.filter((website) => this.filterURLByHTTPS(website.url))
      .map((website) => website.url);

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
    this.setState({ httpsOnlyEnabled: !httpsOnlyEnabled })
  }

  renderAllIcons = () => {
    const desktopIcons = remoteDesktops.filter((website) => this.filterURLByHTTPS(website.url))
      .map((website) => {
      return (<div
        className='single-icon'
        key={`icon_${website.name}`}
        onClick={() => this.openWebsiteURL(website)}>
        { this.renderSingleComputerIcon(website) }
      </div>);
    });

    return desktopIcons;
  }

  render = () => {
    const { httpsOnlyEnabled } = this.state;

    return (
      <div>
        <div className='toolbar-container'>
          <Toolbar>
            <Button onClick={ this.openRandomURL } variant="menu">Random</Button>
            <Button onClick={ this.toggleHTTPSFilter } active={ httpsOnlyEnabled } variant="menu">HTTPS Only</Button>
            <Button onClick={ () => this.openWebsiteURL({ url: 'https://github.com/syxanash/awesome-gui-websites' }) }variant="menu">GitHub</Button>
          </Toolbar>
        </div>
        <Cutout className='remote-desktop-cutoutbg'>
          <div className='remote-desktops-icons-container'>
            {this.renderAllIcons()}
          </div>
        </Cutout>
      </div>
    );
  }
}

export { AwesomeGUIHeader, AwesomeGUIBody };

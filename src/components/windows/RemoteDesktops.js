import React, { Component } from 'react';

import {
  Cutout, Tooltip
} from 'react95';

import './RemoteDesktops.css'
import remoteDesktops from '../../resources/remote-desktops.json';
import computerIcon from '../../resources/icons/remote.gif';

class RemoteDesktopsHeader extends Component {
  render = () => (
    <span>
      <img src={ computerIcon } alt='remote desktops icon' style={ { height: '15px' } }/> Remote Desktops
    </span>
  )
}

class RemoteDesktopsBody extends Component {
  renderSingleComputerIcon = ({ url, name }) => {
    return (
      <Tooltip text={name} delay={100} style={ { bottom: '25px' } }>
        <div className='computer-icon'>
          <img style={ { height: '65px' } } src={ computerIcon } alt='single desktop icon' />
        </div>
        <div className='website-favicon'>
          <img style={ { height: '25px' } } src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`} alt='computer icon' />
        </div>
      </ Tooltip>
    );
  }

  renderAllIcons = () => {
    const desktopIcons = remoteDesktops.map((website) => {
      return (
        <div className='single-icon' key={`icon_${website.name}`}>
          { this.renderSingleComputerIcon(website) }
        </div>
      );
    });

    return desktopIcons;
  }

  render = () => (<div>
    <Cutout className='remote-desktop-cutoutbg'>
      <div className='remote-desktops-icons-container'>
        {this.renderAllIcons()}
      </div>
    </Cutout>
  </div>
  )
}

export { RemoteDesktopsHeader, RemoteDesktopsBody };

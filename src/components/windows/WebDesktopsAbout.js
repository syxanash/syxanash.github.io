import React, { Component } from 'react';
import {
  Fieldset, Button,
} from 'react95';
import Util from '../Util';

import './WebDesktopsAbout.css';

import sourceIcon from '../../resources/icons/script.png';
import pizzaSlice from '../../resources/icons/slice.gif';
import mobileWarningIcon from '../../resources/icons/mobilewarning.gif';
import wdLogo from '../../resources/images/webdesktopsLogo.png';

class WebDesktopsAboutHeader extends Component {
  render = () => (
    <React.Fragment>
      About Web Desktops
    </React.Fragment>
  )
}

class WebDesktopsAboutBody extends Component {
  renderMobileMessage = () => (
    <div style={ { paddingTop: '10px' } }>
      <Fieldset>
        <img src={ mobileWarningIcon } alt='mobile warning icon' style={ { float: 'left', paddingRight: '15px' } } />
        While some of these websites offer great mobile layouts I recommend
        exploring this list using a <b>desktop browser</b> (duh!)
      </Fieldset>
    </div>
  )


  render = () => (
    <div style={ { maxWidth: '420px' } }>
      <div>
        <div style={ { float: 'left', paddingRight: '20px' } } >
          <img src={ wdLogo } alt='Web Desktops logo' style={ { height: '120px' } } />
        </div>
        <span>
          The web's biggest hand curated directory of apps, portfolios
          and experiments that mimic the appearance and functionality of
          desktop operating systems, these are commonly known as <b>Web Desktops</b>
        </span>
      </div>
      { Util.isMobile() && this.renderMobileMessage() }
      <div className='bottom-buttons-container'>
        <div className='bottom-buttons'>
          <Button onClick={ () => Util.openWebsiteURL({ url: 'https://ko-fi.com/syxanash' }) }><img src={ pizzaSlice } alt='hyperlink' style={ { paddingRight: '7px' } } />Donate</Button>
          <Button onClick={ () => Util.openWebsiteURL({ url: 'https://github.com/syxanash/awesome-web-desktops' }) }><img src={ sourceIcon } alt='hyperlink' style={ { paddingRight: '4px', height: '17px' } } />Contribute</Button>
        </div>
      </div>
    </div>
  );
}

export { WebDesktopsAboutHeader, WebDesktopsAboutBody };

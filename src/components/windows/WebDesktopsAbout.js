import React, { Component } from 'react';
import {
  Fieldset, Button,
} from 'react95';
import Util from '../Util';

import lastUpdatedFile from '../../resources/last-updated.json';

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
  state = {
    wdLastUpdated: Util.formatDisplayDate(lastUpdatedFile.wdUpdate, true),
    showDisclaimer: false,
  };

  renderMobileMessage = () => (
    <div style={ { paddingTop: '10px' } }>
      <Fieldset>
        <img src={ mobileWarningIcon } alt='mobile warning icon' style={ { float: 'left', paddingRight: '15px' } } />
        While some of these websites offer great mobile layouts I recommend
        exploring this list using a <b>desktop browser</b> (duh!)
      </Fieldset>
    </div>
  )

  renderDisclaimerMessage = () => (
    <div style={ { paddingTop: '10px' } }>
      <Fieldset>
        <b>Seizure warning</b>: some of these websites may contain flashy animations. Viewer discretion is advised.<br /><br />
        Some websites in this directory may contain <b>political</b>, ideological, or <b>cryptocurrency</b>-related content.
        I do <b>not</b> endorse any views, causes, organizations, products, or services associated with the featured websites or their creators. Projects are included solely based on their relevance to the theme of Web Desktops.
        Users are encouraged to exercise their own judgment before engaging with any external content or services.
      </Fieldset>
    </div>
  )

  render = () => {
    const { showDisclaimer } = this.state;

    return (
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
        { showDisclaimer && this.renderDisclaimerMessage() }
        { Util.isMobile() && this.renderMobileMessage() }
        <div className='bottom-buttons-container'>
          <div className='bottom-buttons-wd'>
            <Button onClick={ () => this.setState({ showDisclaimer: !showDisclaimer }) } active={ showDisclaimer }>Disclaimer</Button>
            <Button onClick={ () => Util.openWebsiteURL({ url: 'https://ko-fi.com/syxanash' }) }><img src={ pizzaSlice } alt='donate' style={ { paddingRight: '7px' } } />Donate</Button>
            <Button onClick={ () => Util.openWebsiteURL({ url: 'https://github.com/syxanash/awesome-web-desktops' }) }><img src={ sourceIcon } alt='source' style={ { paddingRight: '4px', height: '17px' } } />Contribute</Button>
          </div>
        </div>
        <div style={ { paddingTop: '15px', textAlign: 'right' } }>
          <span><i>List was last updated on <b>{ this.state.wdLastUpdated }</b></i></span>
        </div>
      </div>
    )
  };
}

export { WebDesktopsAboutHeader, WebDesktopsAboutBody };

import React, { Component } from 'react';
import _ from 'lodash';
import { Button } from 'react95';

import licenseText from '../../resources/misc/LICENSE.txt';
import creditsIcon from '../../resources/icons/favicon.png';
import openlinkIcon from '../../resources/icons/openlink.png';

import './Credits.css';

class CreditsHeader extends Component {
  render = () => (
    <span>
      <img src={ creditsIcon } alt='main icon' style={ { height: '15px' } }/> Credits
    </span>
  )
}

class CreditsBody extends Component {
  state = {
    displayAccordion: {
      code: false,
      images: false,
      links: false,
      sounds: false,
    },
  }

  renderAccordionButton = (text, accordionId) => {
    const { displayAccordion } = this.state;

    const isAccordionOpen = _.get(displayAccordion, accordionId);

    return (<span>
      <Button
        onClick={ () => this.changeAccordion(accordionId) }
        fullWidth={ true }
        active={ isAccordionOpen }
        style={ { fontWeight: 'bold' } }
      >
        {text}<img src={ openlinkIcon } alt='link icon' className={ `accordion-icon ${isAccordionOpen ? '' : 'rotate'}` }/>
      </Button>
    </span>);
  }

  changeAccordion = (accordionName) => {
    const { displayAccordion } = this.state;

    const accordionValue = _.get(displayAccordion, accordionName);
    _.set(displayAccordion, accordionName, !accordionValue);

    this.setState({ displayAccordion });
  }

  render = () => {
    const { displayAccordion } = this.state;

    return (<div className='credits-window'>
      <div>
        This website was written using <a href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>ReactJS</a> and the code is entirely available on GitHub.
        <p>
          If you have any bugfix, suggestions, typos
          you could help me fix them by opening a pull request!
        </p>
      </div>
      <div className='bulletpoint-container'>
        <div className='paragraph-title'>Copyright &amp; License</div>
        <ul>
          <li>All <b>icons</b> and <b>images</b> (checkout directory <i>src/resources/icons/</i> and <i>public/backgrounds/</i>) were made by myself and are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</li>
          <li>The <b>source code</b> I wrote for this website is under MIT License. See <a href={ licenseText } target='_blank' rel='noopener noreferrer'>LICENSE.txt</a></li>
          <li>Any other <b>third party</b> materials are under their respective license.</li>
        </ul>
      </div>
      <div style={ { paddingTop: '15px', paddingBottom: '15px' } }>
        Here you will find a list of technologies and media I've used to build this site.
      </div>
      <div className='bulletpoint-container'>
        <div className='paragraph-title'>{this.renderAccordionButton('Code', 'code')}</div>
        <ul style={ { display: displayAccordion.code ? 'block' : 'none' } }>
          <li><a href='https://github.com/arturbien/React95' target='_blank' rel='noopener noreferrer'>React95</a> ~ Amazing Windows 95 style UI components for React</li>
          <li><a href='https://daneden.github.io/animate.css/' target='_blank' rel='noopener noreferrer'>Animate.css</a> ~ Set of animations used for opening windows and animating stuff</li>
          <li><a href='https://www.npmjs.com/package/react-draggable' target='_blank' rel='noopener noreferrer'>react-draggable</a> ~ A cool library for dragging items on a page</li>
          <li><a href='https://www.npmjs.com/package/react-typist' target='_blank' rel='noopener noreferrer'>react-typist</a> ~ A nice library for typing animations (used in Projects page)</li>
          <li><a href='https://github.com/Swordfish90/cool-retro-term' target='_blank' rel='noopener noreferrer'>cool-retro-term</a> ~ a vintage terminal emulator used in some pages</li>
        </ul>
        <div className='paragraph-title'>{this.renderAccordionButton('Images', 'images')}</div>
        <ul style={ { display: displayAccordion.images ? 'block' : 'none' } }>
          <li><a href='https://www.gimp.org' target='_blank' rel='noopener noreferrer'>GIMP</a> ~ All icons and some GIFs on this site have been created using GIMP.</li>
          <li><a href='https://ezgif.com/video-to-gif' target='_blank' rel='noopener noreferrer'>Ezgif</a> ~ Amazing web app for editing gifs and converting videos to GIF.</li>
          <li><a href='https://win98icons.alexmeub.com' target='_blank' rel='noopener noreferrer'>Windows 98 Icons</a> ~ original Windows 98 icons were downloaded from here.</li>
          <li><a href='https://www.youtube.com/watch?v=-MH6JZdGZcI' target='_blank' rel='noopener noreferrer'>TV turn off GIF</a> ~ The TV turn off GIF was taken from this video</li>
          <li><a href='https://en.wikipedia.org/wiki/Blue_Monday_(New_Order_song)#/media/File:NewOrderBlueMonday.jpg' target='_blank' rel='noopener noreferrer'>Blue Monday LP Cover</a> ~ The Favicon of this site is highly inspired by the cover art for the vinyl LP "Blue Monday" by New Order</li>
        </ul>
        <div className='paragraph-title'>{this.renderAccordionButton('Links', 'links')}</div>
        <ul style={ { display: displayAccordion.links ? 'block' : 'none' } }>
          <li>
            This site is not affiliated, associated, authorized, endorsed by,
            or in any way officially connected (except with hyperlinks lol)
            to the websites listed in the page <b>Links</b>.
          </li>
        </ul>
        <div className='paragraph-title'>{this.renderAccordionButton('Sounds', 'sounds')}</div>
        <ul style={ { display: displayAccordion.sounds ? 'block' : 'none' } }>
          <li>The poweroff screen page has a sample sound I modified from the original song <a href='https://www.youtube.com/watch?v=Z0XLzIswI2s' target='_blank' rel='noopener noreferrer'>Grace Jones - Slave to the Rhythm</a></li>
        </ul>
      </div>
      <div style={ { paddingTop: '15px', textAlign: 'center' } }>
        No <span role="img" aria-label="pizza">🍕</span> was harmed in the making of this website.
      </div>
    </div>);
  }
}

export { CreditsHeader, CreditsBody };

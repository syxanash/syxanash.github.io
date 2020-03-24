import React, { Component } from 'react';
import { TabBody, Tab, Tabs, Cutout } from 'react95';

import licenseText from '../../resources/misc/LICENSE.txt';
import creditsIcon from '../../resources/icons/favicon.gif';

import codeAnimation from '../../resources/images/code.gif';

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
    activeTab: 0
  }

  handleChangeTab = value => this.setState({ activeTab: value });

  render = () => {
    const { activeTab } = this.state;

    return (<div className='credits-window'>
      <div>
        <img src={ codeAnimation } alt='code scrolling animation' className='mascot-picture' />
        This website was written using <a href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>ReactJS</a>, if your 'puter is too slow then disable JavaScript you can always use the <i>fallback mode</i>!
        <p>
          The code is <a href='https://github.com/syxanash/syxanash.github.io'>entirely available</a> on GitHub. If you have any bugfix, suggestions, typos
          you could help me fix them by opening a pull request!
        </p>
      </div>
      <Tabs value={activeTab} onChange={this.handleChangeTab} style={ { paddingTop: '10px' } }>
        <Tab value={0}>&copy;</Tab>
        <Tab value={1}>Code</Tab>
        <Tab value={2}>Images</Tab>
        <Tab value={3}>Links</Tab>
        <Tab value={4}>Sounds</Tab>
      </Tabs>
      <TabBody>
        <div style={ { marginTop: '-5px' } }>
          <Cutout style={ { backgroundColor: '#e9e8ff' } }>
            <ul style={ { display: activeTab === 0 ? 'block' : 'none' } }>
              <li className='list-content'>All <b>icons</b> and <b>animated icons</b> were made by myself and are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</li>
              <li className='list-content'>The <b>source code</b> is under MIT License. See <a href={ licenseText } target='_blank' rel='noopener noreferrer'>LICENSE.txt</a></li>
              <li className='list-content'>Any other <b>third party</b> materials are under their respective license,
              see the other tabs.</li>
            </ul>
            <ul style={ { display: activeTab === 1 ? 'block' : 'none' } }>
              <li className='list-content'><a href='https://github.com/arturbien/React95' target='_blank' rel='noopener noreferrer'>React95</a> → Amazing Windows 95 style UI components for React</li>
              <li className='list-content'><a href='https://daneden.github.io/animate.css/' target='_blank' rel='noopener noreferrer'>Animate.css</a> → Set of animations used for opening windows and animating stuff</li>
              <li className='list-content'><a href='https://www.npmjs.com/package/react-draggable' target='_blank' rel='noopener noreferrer'>react-draggable</a> → A cool library for dragging items on a page</li>
              <li className='list-content'>The scanlines CSS code was <span style={ { textDecoration: 'line-through' } }>copied</span> highly inspired by <a href='https://neave.tv'>neave.tv</a></li>
              <li className='list-content'><a href='https://github.com/Swordfish90/cool-retro-term' target='_blank' rel='noopener noreferrer'>cool-retro-term</a> → a vintage terminal emulator used in some pages</li>
              <li className='list-content'><a href='https://code.visualstudio.com' target='_blank' rel='noopener noreferrer'>VSCode</a> → wish I told you I built this website using VIM or Emacs like true &#35;10xdeveloper but oh well...</li>
            </ul>
            <ul style={ { display:activeTab === 2 ? 'block' : 'none' } }>
              <li className='list-content'><a href='https://www.gimp.org' target='_blank' rel='noopener noreferrer'>GIMP</a> → All icons and some GIFs on this site have been created using GIMP</li>
              <li className='list-content'><a href='https://ezgif.com/video-to-gif' target='_blank' rel='noopener noreferrer'>Ezgif</a> → Amazing web app for editing gifs and converting videos to GIF</li>
              <li className='list-content'><a href='https://win98icons.alexmeub.com' target='_blank' rel='noopener noreferrer'>Windows 98 Icons</a> → original Windows 98 icons were downloaded from here</li>
              <li className='list-content'><a href='https://www.youtube.com/watch?v=-MH6JZdGZcI' target='_blank' rel='noopener noreferrer'>TV turn off GIF</a> → The TV turn off GIF was taken from this video</li>
              <li className='list-content'><a href='https://en.wikipedia.org/wiki/Blue_Monday_(New_Order_song)#/media/File:NewOrderBlueMonday.jpg' target='_blank' rel='noopener noreferrer'>Blue Monday LP Cover</a> → The Favicon of this site is highly inspired by the cover art for the vinyl LP "Blue Monday" by New Order</li>
              <li className='list-content'><a href='http://cs.gettysburg.edu/~duncjo01/assets/images/patterns/' target='_blank' rel='noopener noreferrer'>Pattern Backgrounds</a> → Some patterns were downloaded from the amazing collection made by John D. Duncan, III</li>
              <li className='list-content'><a href='https://www.popot.org' target='_blank' rel='noopener noreferrer'>PoP Backgrounds</a> → Two backgrounds were downloaded from the Prince of Persia modding community website</li>
              <li className='list-content'>The avatars in <b>src/resources/images/avatars/</b>, used
              in the Guestbook page, were found online from various websites</li>
              <li className='list-content'>The spinning globe in <b>src/resources/images/globe.gif</b> was
              found online, I wish I knew who made this gif :(</li>
              <li className='list-content'>Almost all of the GIFs in <b>loop TV</b> were made by myself and were
              taken from various games/movies/cartoons. Some of these GIFs were also found online.</li>
            </ul>
            <ul style={ { display: activeTab === 3 ? 'block' : 'none' } }>
              <li className='list-content'>
                This site is not affiliated, associated, authorized, endorsed by,
                or in any way officially connected (except with hyperlinks lol)
                to the websites listed in the page <b>Links</b>.
              </li>
            </ul>
            <ul style={ { display: activeTab === 4 ? 'block' : 'none' } }>
              <li className='list-content'>The poweroff screen page has a sample sound I modified from the original song <a href='https://www.youtube.com/watch?v=Z0XLzIswI2s' target='_blank' rel='noopener noreferrer'>Grace Jones - Slave to the Rhythm</a></li>
              <li className='list-content'>The error sound was modified from the Windows ME warning chord, original file downloaded from <a href='https://guidebookgallery.org/sounds' target='_blank' rel='noopener noreferrer'>guidebookgallery.org/sounds</a></li>
            </ul>
          </Cutout>
        </div>
      </TabBody>
      <div style={ { paddingTop: '15px', textAlign: 'center' } }>
        No <span role="img" aria-label="pizza">🍕</span> was harmed in the making of this website.
      </div>
    </div>);
  }
}

export { CreditsHeader, CreditsBody };

import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Draggable from 'react-draggable';
import {
  Cutout, Button, Anchor,
} from 'react95';

import MainWindowFooter from './additional/Footer';
import PopupWindow from './PopupWindow';

import WindowsList from './WindowsList';

import './MainWindow.css';

import aboutIcon from '../resources/icons/about.gif';
import contactIcon from '../resources/icons/contact.gif';
import projectsIcon from '../resources/icons/development.gif';
import trashIcon from '../resources/icons/trash.gif';
import linksIcon from '../resources/icons/links.gif';
import musicIcon from '../resources/icons/music.gif';
import guestbookIcon from '../resources/icons/guestbook.png';
import loopTVIcon from '../resources/icons/loopTV.gif';
import websiteIcon from '../resources/icons/favicon.png';

import languages from '../resources/languages.json';

class MainWindowHeader extends Component {
  state = {
    programmingLanguage: undefined,
  }

  componentDidMount() {
    this.setState({
      programmingLanguage: Object.keys(languages).map(e => languages[e])[
        Math.floor(Math.random() * Object.keys(languages).map(e => languages[e]).length)
      ],
    });
  }

  render = () => {
    const { programmingLanguage } = this.state;

    return (
      <span>
        <img src={ websiteIcon } alt='main title' style={ { height: '15px' } }/> Computer.{programmingLanguage}
      </span>
    );
  }
}

class MainWindowBody extends Component {
  state = {
    windowsList: WindowsList(),
    iconsColliding: false,
  }

  componentDidMount() {
    $('#computer_icon').bind('mouseup', this.triggerUp);
    $('#computer_icon').bind('touchend', this.triggerUp);
    document.addEventListener('keydown', this.closeTopWindow);
  }

  componentWillUnmount() {
    $('#computer_icon').unbind('mouseup', this.triggerUp);
    $('#computer_icon').unbind('touchend', this.triggerUp);
    document.removeEventListener('keydown', this.closeTopWindow);
  }

  openWindow = (windowName) => {
    const { windowsList } = this.state;
    _.set(windowsList, `${windowName}.opened`, true);
    this.setState({ windowsList });
  }

  closeWindow = (windowName) => {
    const { windowsList } = this.state;
    _.set(windowsList, `${windowName}.opened`, false);
    this.setState({ windowsList });
  }

  isWindowOpened = (windowName) => {
    const { windowsList } = this.state;
    return _.get(windowsList, `${windowName}.opened`);
  }

  closeTopWindow = (event) => {
    if (event.keyCode === 27) {
      const { windowsList } = this.state;

      const topWindow = Object.keys(windowsList).reverse().find(item => windowsList[item].opened);

      if (topWindow !== undefined) {
        this.closeWindow(topWindow);
      }
    }
  }

  renderPopupWindows() {
    const { windowsList } = this.state;

    return Object.keys(windowsList).map((window, index) => {
      const windowOpened = _.get(windowsList, `${window}.opened`);
      const windowHeader = _.get(windowsList, `${window}.header`);
      const hasFullScreen = _.get(windowsList, `${window}.hasFullScreen`);
      const windowBody = _.get(windowsList, `${window}.body`);

      return <PopupWindow
        key={ `${window}_${index}` }
        isOpen={ windowOpened }
        closeWindow={ () => this.closeWindow(window) }
        header={ windowHeader }
        body={ windowBody }
        windowName={ window }
        displayExtraActions={ hasFullScreen }
      />;
    });
  }

  triggerUp = () => {
    const { iconsColliding } = this.state;
    const { onClickEgg } = this.props;

    if (iconsColliding) {
      onClickEgg();
    }
  }

  checkCollision = () => {
    const iconsColliding = this.divCollision($('#computer_icon'), $('#cestino_icon'));

    if (iconsColliding) {
      this.setState({ iconsColliding });
    }
  }

  divCollision = (div1, div2) => {
    const x1 = div1.offset().left;
    const y1 = div1.offset().top;
    const h1 = div1.outerHeight(true);
    const w1 = div1.outerWidth(true);
    const b1 = y1 + h1;
    const r1 = x1 + w1;
    const x2 = div2.offset().left;
    const y2 = div2.offset().top;
    const h2 = div2.outerHeight(true);
    const w2 = div2.outerWidth(true);
    const b2 = y2 + h2;
    const r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }

  render() {
    const { onClickTV } = this.props;
    const { iconsColliding } = this.state;
    const eggTriggered = sessionStorage.getItem('eggTriggered') === 'true';

    if (iconsColliding) {
      console.info('LINDAAAA?!?');
    }

    return (
      <div>
        {this.renderPopupWindows()}
        <Cutout className='cut-out'>
          <div className='last-row-icons'>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ onClickTV }
            >
              <img src={ loopTVIcon } className='icon' alt="projects"/>
              <figcaption className='icon-caption'>loop <span className='colored-text'>TV</span></figcaption>
            </Button>
            <Button id='cestino_icon' size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: localStorage.getItem('fixed') ? 'none' : 'inline-block' } }
              onClick={ () => this.openWindow('cestino') }
              active={ this.isWindowOpened('cestino') || iconsColliding }
            >
              <img src={ trashIcon } className='icon' alt="trash"/>
              <figcaption className='icon-caption'>Cestino</figcaption>
            </Button>
          </div>
          <div className='first-row-icons'>
            <Draggable
              handle='.handle_icon'
              onDrag={ this.checkCollision }
              bounds=".cut-out"
            >
              <Button
                id='computer_icon'
                size='lg'
                square
                className={ `button-item ${eggTriggered ? 'movable-icon handle_icon' : ''}` }
                onClick={ () => this.openWindow('about') }
                active={ this.isWindowOpened('about') }
                disabled={ eggTriggered }
                style={ { width: '85px', height: '85px', display: 'inline-block' } }
              >
                <img src={ aboutIcon } className={ `icon ${eggTriggered ? 'animated infinite bounce fast' : ''}` } alt="about"/>
                <figcaption className='icon-caption'>About</figcaption>
              </Button>
            </Draggable>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindow('projects') }
              active={ this.isWindowOpened('projects') }
            >
              <img src={ projectsIcon } className='icon' alt="projects"/>
              <figcaption className='icon-caption'>Projects</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindow('contact') }
              active={ this.isWindowOpened('contact') }
            >
              <img src={ contactIcon } className='icon' alt="contact"/>
              <figcaption className='icon-caption'>Contact</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindow('links') }
              active={ this.isWindowOpened('links') }
            >
              <img src={ linksIcon } className='icon' alt="links"/>
              <figcaption className='icon-caption'>Links</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindow('guestbook') }
              active={ this.isWindowOpened('guestbook') }
            >
              <img src={ guestbookIcon } className='icon' alt="links"/>
              <figcaption className='icon-caption' style={ { fontSize: '14px' } }>Guestbook</figcaption>
            </Button>
            <Anchor
              href='https://open.spotify.com/user/1192532714?si=_Z9kVqrCRJWOaJlWAE-hqA'
              target='_blank'
              style={ { color: '#000000', textDecoration: 'none' } }
            >
              <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } } >
                <img src={ musicIcon } className='icon' alt="music"/>
                <figcaption className='icon-caption'>Music</figcaption>
              </Button>
            </Anchor>
          </div>
        </Cutout>
        <MainWindowFooter onClick={ () => this.openWindow('credits') } active={ this.isWindowOpened('credits') }/>
      </div>
    );
  }
}

export { MainWindowHeader, MainWindowBody };

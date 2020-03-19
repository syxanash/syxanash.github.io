import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Draggable from 'react-draggable';
import {
  Cutout, Button,
} from 'react95';
import PopupWindow from './PopupWindow';
import MainWindowFooter from './additional/Footer';

import './MainWindow.css';

import aboutIcon from '../resources/icons/about.gif';
import contactIcon from '../resources/icons/contact.gif';
import projectsIcon from '../resources/icons/development.gif';
import trashIcon from '../resources/icons/trash.gif';
import emptyTrashIcon from '../resources/icons/empty_trash.gif';
import linksIcon from '../resources/icons/links.gif';
import musicIcon from '../resources/icons/music.gif';
import guestbookIcon from '../resources/icons/guestbook.png';
import loopTVIcon from '../resources/icons/loopTV.gif';

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
        Computer.{programmingLanguage}
      </span>
    );
  }
}

class MainWindowBody extends Component {
  state = {
    iconsColliding: false,
  }

  componentDidMount() {
    $('#computer_icon').bind('mouseup', this.triggerUp);
    $('#computer_icon').bind('touchend', this.triggerUp);
  }

  componentWillUnmount() {
    const { resetWindows } = this.props;

    resetWindows();

    $('#computer_icon').unbind('mouseup', this.triggerUp);
    $('#computer_icon').unbind('touchend', this.triggerUp);
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

  renderPopupWindows = () => {
    const {
      windowsList,
      focusWindow,
      closeWindow,
      openWindow,
    } = this.props;

    return Object.keys(windowsList).map((window, index) => {
      const windowOpened = _.get(windowsList, `${window}.opened`);
      const windowFocused = _.get(windowsList, `${window}.focused`);
      const windowHeader = _.get(windowsList, `${window}.header`);
      const hasFullScreen = _.get(windowsList, `${window}.hasFullScreen`);
      const canCloseWindow = _.get(windowsList, `${window}.canCloseWindow`);
      const windowBody = _.get(windowsList, `${window}.body`);
      const windowTheme = _.get(windowsList, `${window}.windowTheme`);

      return <div
        key={ `${window}_${index}` }
        id={ window }
        onClick={ () => focusWindow(window) }
      >{
          windowOpened
            ? <PopupWindow
              closeWindow={ () => closeWindow(window) }
              openWindow={ openWindow }
              focused={ windowFocused }
              header={ windowHeader }
              body={ windowBody }
              windowName={ window }
              displayExtraActions={ hasFullScreen }
              displayCloseButton={ canCloseWindow }
              windowTheme={ windowTheme }
            />
            : null
        }
      </div>;
    });
  }

  render() {
    const { onClickTV, openWindow, isWindowOpened } = this.props;
    const { iconsColliding } = this.state;
    const eggTriggered = sessionStorage.getItem('eggTriggered') === 'true';

    if (iconsColliding) {
      console.info('LINDAAAA?!?');
    }

    return (
      <div>
        <div id='windows-list'>{this.renderPopupWindows()}</div>
        <Cutout className='cut-out'>
          <div className='last-row-icons'>
            <Button id='cestino_icon' size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: localStorage.getItem('fixed') ? 'none' : 'inline-block' } }
              onClick={ () => openWindow('cestino') }
              active={ isWindowOpened('cestino') || iconsColliding }
            >
              <img src={ eggTriggered ? emptyTrashIcon : trashIcon } className='icon' alt="trash"/>
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
                onClick={ () => openWindow('about') }
                active={ isWindowOpened('about') }
                disabled={ eggTriggered }
                style={ { width: '85px', height: '85px', display: 'inline-block' } }
              >
                <img src={ aboutIcon } className={ `icon ${eggTriggered ? 'animated infinite bounce fast' : ''}` } alt="about"/>
                <figcaption className='icon-caption'>About</figcaption>
              </Button>
            </Draggable>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => openWindow('projects') }
              active={ isWindowOpened('projects') }
            >
              <img src={ projectsIcon } className='icon' alt="projects"/>
              <figcaption className='icon-caption'>Projects</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => openWindow('contact') }
              active={ isWindowOpened('contact') }
            >
              <img src={ contactIcon } className='icon' alt="contact"/>
              <figcaption className='icon-caption'>Contact</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => openWindow('links') }
              active={ isWindowOpened('links') }
            >
              <img src={ linksIcon } className='icon' alt="links"/>
              <figcaption className='icon-caption'>Links</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => openWindow('music') }
              active={ isWindowOpened('music') }>
              <img src={ musicIcon } className='icon' alt="music"/>
              <figcaption className='icon-caption'>Music</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => openWindow('guestbook') }
              active={ isWindowOpened('guestbook') }
            >
              <img src={ guestbookIcon } className='icon' alt="links"/>
              <figcaption className='icon-caption' style={ { fontSize: '14px' } }>Guestbook</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ onClickTV }
            >
              <img src={ loopTVIcon } className='icon' alt="projects"/>
              <figcaption className='icon-caption'>loop <span className='colored-text'>TV</span></figcaption>
            </Button>
          </div>
        </Cutout>
        <MainWindowFooter onClick={ () => openWindow('credits') } active={ isWindowOpened('credits') }/>
      </div>
    );
  }
}

export { MainWindowHeader, MainWindowBody };

import React, { Component } from 'react';
import $ from 'jquery';
import Draggable from 'react-draggable';
import {
  Cutout, Button, Anchor, Tooltip,
} from 'react95';

import MainWindowFooter from './additional/Footer';
import Util from './Util';

import './MainWindow.css';

import SoundEffects from './additional/SoundEffects';
import aboutIcon from '../resources/icons/about.gif';
import contactIcon from '../resources/icons/contact.gif';
import blogIcon from '../resources/icons/blog.gif';
import projectsIcon from '../resources/icons/development.gif';
import trashIcon from '../resources/icons/trash.gif';
import emptyTrashIcon from '../resources/icons/empty_trash.gif';
import linksIcon from '../resources/icons/links.gif';
import musicIcon from '../resources/icons/music.gif';
import guestbookIcon from '../resources/icons/guestbook.png';
import loopTVIcon from '../resources/icons/loopTV.gif';
import pizzaIcon from '../resources/icons/pizza.gif';
import corruptedFileIcon from '../resources/icons/corrupted.gif';
import lightbulbIcon from '../resources/icons/lightbulb.gif';
import staticImage from '../resources/images/static.gif';
import playerHeadImage from '../resources/images/head.gif';

import languages from '../resources/languages.json';

class MainWindowHeader extends Component {
  state = {
    programmingLanguage: undefined,
    assetsLoaded: false,
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
  constructor(props) {
    super(props);

    this.randomCaptionInterval = undefined;

    this.state = {
      randomCaption: 'Recipe',
      iconsColliding: false,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('fixed')) {
      this.randomCaptionInterval = setInterval(this.generateRandomCaption, 300);
    }

    $('#computer_icon').bind('mouseup', this.triggerUp);
    $('#computer_icon').bind('touchend', this.triggerUp);
  }

  componentWillUnmount() {
    const { resetWindows } = this.props;

    resetWindows();

    if (this.randomCaptionInterval !== undefined) {
      clearInterval(this.randomCaptionInterval);
    }

    $('#computer_icon').unbind('mouseup', this.triggerUp);
    $('#computer_icon').unbind('touchend', this.triggerUp);
  }

  generateRandomCaption = () => {
    const { randomCaption } = this.state;

    this.setState({
      randomCaption: Util.replaceRandomCharInWord(randomCaption),
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

    this.setState({ iconsColliding });
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

  openWindowIfNotOpened = (windowName) => {
    const { openWindow, isWindowOpened } = this.props;

    if (!isWindowOpened(windowName)) {
      openWindow(windowName);
    }
  }

  renderBulbButton = () => {
    const { isWindowOpened } = this.props;
    return (<Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
      onClick={ () => this.openWindowIfNotOpened('bulb') }
      active={ isWindowOpened('bulb') }
    >
      <img src={ lightbulbIcon } className='icon' alt="Lite Bulb"/>
      <figcaption className='icon-caption'>Lite Bulb</figcaption>
    </Button>);
  }

  preloadAssets = () => {
    const { assetsLoaded } = this.state;

    if (!assetsLoaded) {
      SoundEffects.loopTVSound.load();
      new Image().src = staticImage;
      new Image().src = playerHeadImage;

      this.setState({ assetsLoaded: true });
    }
  }

  render() {
    const { onClickTV, isWindowOpened } = this.props;
    const { iconsColliding, randomCaption } = this.state;
    const eggTriggered = sessionStorage.getItem('eggTriggered') === 'true';

    return (
      <React.Fragment>
        <Cutout className='cut-out'>
          <div className='last-row-icons'>
            <Button id='cestino_icon' size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: localStorage.getItem('fixed') ? 'none' : 'inline-block' } }
              onClick={ () => this.openWindowIfNotOpened('cestino') }
              disabled={ eggTriggered }
              active={ isWindowOpened('cestino') || iconsColliding }
            >
              <img src={ eggTriggered ? emptyTrashIcon : trashIcon } className='icon' alt="trash"/>
              { eggTriggered ? null : <figcaption className='icon-caption'>Cestino</figcaption> }
            </Button>
          </div>
          <div className='first-row-icons' onMouseEnter={ this.preloadAssets }>
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
                onClick={ () => this.openWindowIfNotOpened('about') }
                active={ isWindowOpened('about') }
                disabled={ eggTriggered }
                style={ { width: '85px', height: '85px', display: 'inline-block' } }
              >
                <img src={ aboutIcon } className={ `icon ${eggTriggered ? 'animated infinite bounce fast' : ''}` } alt="about"/>
                { eggTriggered ? null : <figcaption className='icon-caption'>About</figcaption> }
              </Button>
            </Draggable>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindowIfNotOpened('projects') }
              active={ isWindowOpened('projects') }
            >
              <img src={ projectsIcon } className='icon' alt="projects"/>
              <figcaption className='icon-caption'>Projects</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindowIfNotOpened('contact') }
              active={ isWindowOpened('contact') }
            >
              <img src={ contactIcon } className='icon' alt="contact"/>
              <figcaption className='icon-caption'>Contact</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindowIfNotOpened('blog') }
              active={ isWindowOpened('blog') }>
              <img src={ blogIcon } className='icon' alt="blog"/>
              <figcaption className='icon-caption'>Blog</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindowIfNotOpened('links') }
              active={ isWindowOpened('links') }
            >
              <img src={ linksIcon } className='icon' alt="links"/>
              <figcaption className='icon-caption'>Links</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindowIfNotOpened('music') }
              active={ isWindowOpened('music') }>
              <img src={ musicIcon } className='icon' alt="music"/>
              <figcaption className='icon-caption'>Music</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ () => this.openWindowIfNotOpened('guestbook') }
              active={ isWindowOpened('guestbook') }
            >
              <img src={ guestbookIcon } className='icon' alt="guestbook"/>
              <figcaption className='icon-caption' style={ { fontSize: '14px' } }>Guestbook</figcaption>
            </Button>
            <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: 'inline-block' } }
              onClick={ onClickTV }
            >
              <img src={ loopTVIcon } className='icon' alt="loop TV"/>
              <figcaption className='icon-caption'>loop <span className='colored-text'>TV</span></figcaption>
            </Button>
            { Util.isWebSocketsSupported() ? this.renderBulbButton() : null }
            <Tooltip text={ 'file corrupted' } delay={ 500 }>
              <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: localStorage.getItem('fixed') ? 'none' : 'inline-block' } } disabled={ true }>
                <img src={ corruptedFileIcon } className='icon' alt="corrupted file icon" style={ { filter: 'opacity(50%)' } } />
                <figcaption className='icon-caption'>{ randomCaption }</figcaption>
              </Button>
            </Tooltip>
            <Anchor
              href='https://gist.github.com/syxanash/7b2d135a566cfb2f03dfceba6b34e61a'
              target='_blank'
              style={ { color: '#000000', textDecoration: 'none' } }
            >
              <Button size='lg' square className='button-item' style={ { width: '85px', height: '85px', display: localStorage.getItem('fixed') ? 'inline-block' : 'none' } }>
                <img src={ pizzaIcon } className='icon' alt="pizza recipe"/>
                <figcaption className='icon-caption'>Recipe</figcaption>
              </Button>
            </Anchor>
          </div>
        </Cutout>
        <MainWindowFooter onClick={ () => this.openWindowIfNotOpened('credits') } active={ isWindowOpened('credits') }/>
      </React.Fragment>
    );
  }
}

export { MainWindowHeader, MainWindowBody };

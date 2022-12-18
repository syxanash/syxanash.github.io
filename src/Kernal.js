import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import {
  Window, WindowHeader, WindowContent,
} from 'react95';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Util from './components/Util';

import PopupWindow from './components/PopupWindow';
import WindowHead from './components/WindowHead';
import { NotFoundBody } from './components/windows/NotFound';
import Copyright from './components/additional/Copyright';
import CRTSwitch from './components/additional/CRTSwitch';
import { MainWindowBody } from './components/MainWindow';
import WindowsList from './components/WindowsList';
import Poweroff from './components/additional/Poweroff';
import LoopTV from './components/additional/LoopTV';
import ScheduledTV from './components/additional/ScheduledTV';
import BootScreen from './components/additional/BootScreen';
import ScreenSaver from './components/additional/ScreenSaver';
import BrokenScreen from './components/additional/BrokenScreen';
import XBill from './components/additional/XBill';
import TheAgent from './components/additional/TheAgent';
import SoundEffects from './components/additional/SoundEffects';
import LoaderCursor from './components/additional/LoaderCursor';

import hackedBackground from './resources/images/hack_bg.gif';

import PippoTheme from './themes/PippoTheme';
import PippoDistracted from './themes/PippoDistracted';

import './Kernal.css';

const backgroundImages = require.context('./resources/images/backgrounds', true);
const wallpapersNumber = 63;

class Kernal extends Component {
  constructor(props) {
    super(props);

    this.scrollTopElement = React.createRef();

    this.loadingIconTimeout = undefined;
    this.konamiKeysEntered = 0;

    this.screenSaverTimeout = undefined;
    this.activateScreenSaver = false;
    this.screenSaverTimer = 100000;
    this.screenSaverMovingMouseThreshold = 25;

    this.mouseMovingCounter = 0;

    this.state = {
      bgWallpapers: [...Array(wallpapersNumber).keys()].map(item => `BG_${item + 1}.png`),
      bgIndex: localStorage.getItem('bgIndex') === null
        ? Math.floor(Math.random() * wallpapersNumber)
        : JSON.parse(localStorage.getItem('bgIndex')),
      showLoaderPointer: false,
      showXBill: false,
      displayWindowBody: true,
      pageBodyRoutes: undefined,
      poweredOff: false,
      screenSaverMode: false,
      loopTVon: false,
      scheduledTVOn: false,
      bootScreenMode: localStorage.getItem('firstBootDone') === null,
      hasCrashed: false,
      isBrokenScreen: false,
      crtEnabled: localStorage.getItem('crt') === null
        || !!JSON.parse(localStorage.getItem('crt')),
      mainTheme: PippoTheme,
      mainUnfocusedTheme: PippoDistracted,
      windowsList: WindowsList(),
    };
  }

  componentDidMount() {
    const { windowsList } = this.state;

    window.addEventListener('popstate', this.changeTheme);
    document.addEventListener('keydown', this.closeTopWindow);
    document.addEventListener('keydown', this.konamiHandler);

    $(window).focus(() => {
      this.activateScreenSaver = false;
      clearTimeout(this.screenSaverTimeout);
    }).blur(this.setScreenSaver);

    document.addEventListener('mousemove', this.onMouseUpdate);
    document.addEventListener('mouseenter', this.onMouseUpdate);
    document.addEventListener('click', this.unsetScreenSaver);

    const pageBodyRoutes = Object.keys(windowsList)
      .filter(window => _.get(windowsList, `${window}.hasFullScreen`))
      .map((window, index) => {
        const WindowBodyComponent = _.get(windowsList, `${window}.body`);

        return <Route
          exact
          key={ `${window}_${index}` }
          path={ `/${window}` }
          component={ () => <WindowBodyComponent
            windowsList={ windowsList }
            resetWindows={ this.resetWindows }
            openWindow={ this.openWindow }
            focusWindow={ this.focusWindow }
            closeWindow={ this.closeWindow }
            isWindowOpened={ this.isWindowOpened }
            isFullscreen={ true }
            poweroff={ this.poweroff }
            crashWindow={ this.kernelPanic }
          /> }
        />;
      });

    this.changeTheme();

    this.setState({
      pageBodyRoutes,
      isBrokenScreen: localStorage.getItem('broken'),
    });
  }

  componentWillUnmount() {
    if (this.loadingIconTimeout) {
      clearTimeout(this.loadingIconTimeout);
    }

    document.removeEventListener('keydown', this.closeTopWindow);
    document.removeEventListener('keydown', this.konamiHandler);

    document.removeEventListener('mousemove', this.onMouseUpdate);
    document.removeEventListener('mouseenter', this.onMouseUpdate);

    document.removeEventListener('click', this.unsetScreenSaver);
    window.removeEventListener('popstate', this.changeTheme);

    if (this.screenSaverTimeout) {
      clearTimeout(this.screenSaverTimeout);
    }
  }

  onMouseUpdate = () => {
    const { screenSaverMode } = this.state;
    this.mouseMovingCounter = this.mouseMovingCounter + 1;

    if (this.mouseMovingCounter >= this.screenSaverMovingMouseThreshold && screenSaverMode) {
      this.unsetScreenSaver();
    }
  }

  isInSpecialState = () => {
    const {
      poweredOff, isBrokenScreen, loopTVon, bootScreenMode, screenSaverMode,
      scheduledTVOn,
    } = this.state;

    return poweredOff
      || isBrokenScreen
      || loopTVon
      || scheduledTVOn
      || screenSaverMode
      || bootScreenMode;
  }

  scrollToTop = () => {
    if (this.scrollTopElement.current !== null) {
      this.scrollTopElement.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onLeftsideButton = () => {
    if (!this.isWindowOpened('osinfowindow')) {
      this.openWindow('osinfowindow');
    }
  }

  resetWindows = () => {
    this.setState({ windowsList: WindowsList() });
  }

  openWindow = (windowName, subWindow = false) => {
    const { windowsList } = this.state;

    const openWindowFunction = () => {
      _.set(windowsList, `${windowName}.opened`, true);
      this.focusWindow(windowName);
      this.setState({ windowsList });

      this.scrollToTop();
    };

    if (subWindow) {
      // this delay for the sub window is created to solve an annoying bug:
      // when open window is called to open a sub window the focus erroneously goes back
      // to the original window who called the sub window thus hiding the sub window.
      Util.delay(10).then(openWindowFunction);
    } else {
      this.loadingIconTimeout = setTimeout(() => {
        this.setState({ showLoaderPointer: false });
      }, 1200);

      openWindowFunction();

      this.setState({ showLoaderPointer: true });
    }
  }

  closeWindow = (windowName) => {
    const { windowsList } = this.state;
    _.set(windowsList, `${windowName}.opened`, false);

    const parent = document.getElementById('windows-list');
    const domElements = Array.prototype.slice.call(parent.childNodes).slice().reverse();
    const topWindowDiv = domElements.find(element => element.hasChildNodes()
      && element.id !== windowName);

    if (topWindowDiv !== undefined) {
      Util.delay(10).then(() => this.focusWindow(topWindowDiv.id));
    }

    this.setState({ windowsList });
  }

  closeAllWindows = () => {
    const { windowsList } = this.state;

    Object.keys(windowsList).forEach((window) => {
      this.closeWindow(window);
    });
  }

  isMainUnfocused = () => {
    const { windowsList, displayWindowBody } = this.state;

    const fullscreenWindow = _.last(window.location.href.split('/'));
    const windowsOpened = Object.keys(windowsList)
      .filter(windowName => this.isWindowOpened(windowName));

    return windowsOpened.length > 0
      && !(windowsOpened.length === 1 && _.first(windowsOpened) === fullscreenWindow)
      && displayWindowBody;
  }

  isWindowOpened = (windowName) => {
    const { windowsList } = this.state;
    return _.get(windowsList, `${windowName}.opened`)
      || _.last(window.location.href.split('/')) === windowName;
  }

  closeTopWindow = (event) => {
    if (event.keyCode === 27) { // pressed ESC key
      const parent = document.getElementById('windows-list');
      const domElements = Array.prototype.slice.call(parent.childNodes).slice().reverse();
      const topWindowDiv = domElements.find(element => element.hasChildNodes());

      if (topWindowDiv !== undefined) {
        this.closeWindow(topWindowDiv.id);
      }
    }
  }

  focusWindow = (chosenWindow) => {
    const chosenWindowDiv = document.getElementById(chosenWindow);
    const windowsContainer = document.getElementById('windows-list');
    const lastElement = windowsContainer.lastChild;

    const domElements = Array.prototype.slice.call(windowsContainer.childNodes).slice().reverse();
    const topWindowOpened = domElements.find(element => element.hasChildNodes());

    // make sure the window we chose is not already on top of the others
    if (chosenWindow !== lastElement.previousSibling.id || topWindowOpened === undefined) {
      windowsContainer.insertBefore(chosenWindowDiv, lastElement);

      const { windowsList } = this.state;
      _.set(windowsList, `${chosenWindowDiv.previousSibling.id}.focused`, false);
      _.set(windowsList, `${chosenWindowDiv.id}.focused`, true);
      this.setState({ windowsList });
    }
  }

  changeTheme = () => {
    const { windowsList } = this.state;

    const pageName = _.last(window.location.href.split('/'));
    const newTheme = _.get(windowsList, `${pageName}.windowTheme`, PippoTheme);
    const newUnfocusedTheme = _.get(windowsList, `${pageName}.unfocusedTheme`, PippoDistracted);

    this.setState({ mainTheme: newTheme, mainUnfocusedTheme: newUnfocusedTheme });
  }

  kernelPanic = () => {
    if (!this.isInSpecialState()) {
      this.closeAllWindows();
      this.setState({
        bootScreenMode: true,
        hasCrashed: true,
      });
    }
  }

  toggleBootScreen = (mode) => {
    if (!mode) {
      this.scrollToTop();
    }

    this.setState({ bootScreenMode: mode });
  }

  konamiHandler = (event) => {
    const {
      isBrokenScreen, poweredOff, bootScreenMode,
    } = this.state;

    if (isBrokenScreen || poweredOff || bootScreenMode) {
      return;
    }

    const pattern = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b', 'a',
    ];

    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[this.konamiKeysEntered]) {
      this.konamiKeysEntered = 0;
      return;
    }

    this.konamiKeysEntered += 1;

    if (pattern.length === this.konamiKeysEntered) {
      this.konamiKeysEntered = 0;
      this.openWindow('gabrieleswindow');
    }
  }

  toggleCRT = () => {
    const { crtEnabled } = this.state;
    localStorage.setItem('crt', JSON.stringify(!crtEnabled));
    this.setState({ crtEnabled: !crtEnabled });
  }

  generateWallpaper = () => {
    const { bgIndex, bgWallpapers } = this.state;

    const nextImageIndex = (bgIndex + 2) % bgWallpapers.length;
    new Image().src = backgroundImages(`./${bgWallpapers[nextImageIndex]}`);

    const nextIndex = (bgIndex + 1) % bgWallpapers.length;

    localStorage.setItem('bgIndex', JSON.stringify(nextIndex));
    this.setState({ bgIndex: nextIndex });
  }

  toggleBody = () => {
    const { displayWindowBody } = this.state;

    this.setState({ displayWindowBody: !displayWindowBody });
  }

  poweroff = () => {
    if (!this.isInSpecialState()) {
      this.closeAllWindows();

      SoundEffects.poweroffSound.load();
      SoundEffects.poweroffSound.play();

      this.setState({ poweredOff: true });
    }
  }

  setScreenSaver = () => {
    const { windowsList } = this.state;

    this.mouseMovingCounter = 0;
    this.activateScreenSaver = true;

    this.screenSaverTimeout = setTimeout(() => {
      const hasDisabledScreensaverWindows = Object.keys(windowsList)
        .some(windowName => (
          !_.get(windowsList, `${windowName}.hasScreensaver`) && this.isWindowOpened(windowName)
        ));

      if (!this.isInSpecialState()
        && this.activateScreenSaver
        && !hasDisabledScreensaverWindows) {
        this.activateScreenSaver = false;
        this.setState({ screenSaverMode: true });
      }
    }, this.screenSaverTimer * 1000);
  }

  unsetScreenSaver = () => {
    const { screenSaverMode } = this.state;

    if (screenSaverMode) {
      this.activateScreenSaver = false;
      this.setState({ screenSaverMode: false });
    }
  }

  turnOnTV = () => {
    SoundEffects.loopTVSound.play();
    this.setState({ loopTVon: true });
  }

  turnOffTV = () => {
    this.setState({ loopTVon: false });
  }

  closeScheduledTV = () => {
    this.setState({ scheduledTVOn: false });
  }

  openScheduledTV = () => {
    this.unsetScreenSaver();
    this.toggleBootScreen(false);
    this.setState({ scheduledTVOn: true });
  }

  triggerEasterEgg = () => {
    SoundEffects.errorSound.load();
    SoundEffects.errorSound.play();

    this.closeAllWindows();

    localStorage.setItem('broken', true);
    this.setState({ isBrokenScreen: true });
  }

  displayXBill = () => {
    this.setState({ showXBill: true });
  }

  renderXBill = () => {
    const { showXBill } = this.state;

    if (this.isInSpecialState() || !showXBill) {
      return null;
    }

    const haflsizeXBill = (76 / 2);
    const copyrightWatermarkComponent = document.getElementById('copyrightWatermark').getBoundingClientRect();

    return (
      <XBill
        kernelPanic={ this.kernelPanic }
        initialX={ copyrightWatermarkComponent.x }
        initialY={ copyrightWatermarkComponent.y - haflsizeXBill }
      />
    );
  };

  renderMainWindow = () => {
    const { windowsList } = this.state;

    return (<MainWindowBody
      windowsList={ windowsList }
      resetWindows={ this.resetWindows }
      openWindow={ this.openWindow }
      focusWindow={ this.focusWindow }
      closeWindow={ this.closeWindow }
      isWindowOpened={ this.isWindowOpened }
      onClickEgg={ this.triggerEasterEgg }
      onClickTV={ this.turnOnTV }
    />);
  }

  renderPopupWindows = () => {
    const { windowsList } = this.state;

    return Object.keys(windowsList).map((window, index) => {
      const windowOpened = _.get(windowsList, `${window}.opened`);
      const windowFocused = _.get(windowsList, `${window}.focused`);
      const windowHeader = _.get(windowsList, `${window}.header`);
      const hasFullScreen = _.get(windowsList, `${window}.hasFullScreen`);
      const hasCustomBody = _.get(windowsList, `${window}.hasCustomBody`);
      const tiltAnimation = _.get(windowsList, `${window}.tiltAnimation`);
      const canCloseWindow = _.get(windowsList, `${window}.canCloseWindow`);
      const windowBody = _.get(windowsList, `${window}.body`);
      const windowTheme = _.get(windowsList, `${window}.windowTheme`);
      const unfocusedTheme = _.get(windowsList, `${window}.unfocusedTheme`);

      return <div
        key={ `${window}_${index}` }
        id={ window }
        onClick={ () => this.focusWindow(window) }
      >{
          windowOpened
            && <PopupWindow
              closeWindow={ this.closeWindow }
              openWindow={ this.openWindow }
              isWindowOpened={ this.isWindowOpened }
              poweroff={ this.poweroff }
              crashWindow={ this.kernelPanic }
              focused={ windowFocused }
              header={ windowHeader }
              body={ windowBody }
              windowName={ window }
              hasCustomBody={ hasCustomBody }
              displayExtraActions={ hasFullScreen }
              tiltAnimation={ tiltAnimation }
              displayCloseButton={ canCloseWindow }
              windowTheme={ windowTheme }
              unfocusedTheme={ unfocusedTheme }
            />
        }
      </div>;
    });
  }

  render() {
    const {
      bgWallpapers, bgIndex, displayWindowBody, pageBodyRoutes, showLoaderPointer, crtEnabled,
      poweredOff, loopTVon, isBrokenScreen, bootScreenMode, mainTheme, screenSaverMode,
      mainUnfocusedTheme, hasCrashed,
    } = this.state;

    const eggTriggered = sessionStorage.getItem('eggTriggered') === 'true';

    return (
      <HashRouter>
        <div ref={ this.scrollTopElement } />
        <div className='window-centered'>
          <div style={ { display: this.isInSpecialState() ? 'none' : 'block' } }>
            <Helmet>
              <style>
                {
                  `body {
                    background: url(${eggTriggered ? hackedBackground : backgroundImages(`./${bgWallpapers[bgIndex]}`)});
                    background-color : #a1a3ca;
                  }`
                }
              </style>
            </Helmet>
            <ThemeProvider theme={ this.isMainUnfocused() ? mainUnfocusedTheme : mainTheme }>
              <Window shadow={ true } style={ { width: '100%' } }>
                <WindowHeader>
                  <WindowHead
                    onLeftsideButton={ this.onLeftsideButton }
                    isLeftsideButtonActive={ this.isWindowOpened('osinfowindow') }
                    onClickLeft={ this.toggleBody }
                    onClickMiddle={ this.generateWallpaper }
                    onRightClick={ this.poweroff }
                  />
                </WindowHeader>
                <WindowContent style={ { display: displayWindowBody ? 'block' : 'none' } }>
                  <div id='windows-list'>{this.renderPopupWindows()}</div>
                  <Switch>
                    <Route exact path='/' component={ this.renderMainWindow }/>
                    {pageBodyRoutes}
                    <Route component={ NotFoundBody }/>
                  </Switch>
                  <Copyright onClickWatermark={ this.displayXBill } />
                  <CRTSwitch toggle={ this.toggleCRT } crtEnabled={ crtEnabled } />
                </WindowContent>
              </Window>
            </ThemeProvider>
            { !displayWindowBody && <TheAgent /> }
          </div>
        </div>
        { this.renderXBill() }
        { loopTVon && <LoopTV turnOff={ this.turnOffTV } /> }
        { screenSaverMode && <ScreenSaver /> }
        <Poweroff shouldPoweroff={ poweredOff } />
        { bootScreenMode && <BootScreen
          hasCrashed={ hasCrashed }
          toggleBootScreen={ this.toggleBootScreen }
        /> }
        <BrokenScreen isScreenBroken={ isBrokenScreen } />
        <ScheduledTV
          openScheduledTV={ this.openScheduledTV }
          closeScheduledTV={ this.closeScheduledTV }
        />
        { showLoaderPointer && <LoaderCursor /> }
        { crtEnabled && <div className='scan-lines'></div> }
      </HashRouter>
    );
  }
}

export default Kernal;

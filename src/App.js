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
import { MainWindowBody } from './components/MainWindow';
import WindowsList from './components/WindowsList';
import Poweroff from './components/additional/Poweroff';
import LoopTV from './components/additional/LoopTV';
import StoppedProgram from './components/additional/StoppedProgram';
import ScreenSaver from './components/additional/ScreenSaver';
import BrokenScreen from './components/additional/BrokenScreen';
import XBill from './components/additional/XBill';
import TheAgent from './components/additional/TheAgent';
import SoundEffects from './components/additional/SoundEffects';
import LoaderCursor from './components/additional/LoaderCursor';

import PippoTheme from './themes/PippoTheme';
import ThemeContext from './ThemeContext';

import './App.css';

import bgList from './resources/backgrounds-list.json';

const backgroundImages = require.context('./resources/images/backgrounds', true);

class App extends Component {
  constructor(props) {
    super(props);

    this.scrollTop = React.createRef();

    this.loadingIconTimeout = undefined;
    this.konamiKeysEntered = 0;

    this.screenSaverTimeout = undefined;
    this.activateScreenSaver = false;
    this.screenSaverTimer = 10;
    this.screenSaverMovingMouseThreshold = 45;

    this.mouseMovingCounter = 0;

    this.state = {
      bgWallpapers: _.shuffle(bgList),
      bgIndex: 0,
      showLoaderPointer: false,
      showXBill: false,
      displayWindowBody: true,
      pageBodyRoutes: undefined,
      poweredOff: false,
      screenSaverMode: false,
      loopTVon: false,
      stoppedWindowProgram: undefined,
      isBrokenScreen: false,
      mainTheme: PippoTheme,
      mainWindowName: 'main',
      windowsList: WindowsList(),
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.closeTopWindow);
    document.addEventListener('keydown', this.stoppedProgram);
    document.addEventListener('keydown', this.konamiHandler);

    $(window).focus(() => {
      this.activateScreenSaver = false;
      clearTimeout(this.screenSaverTimeout);
    }).blur(this.setScreenSaver);

    document.addEventListener('mousemove', this.onMouseUpdate);
    document.addEventListener('mouseenter', this.onMouseUpdate);
    document.addEventListener('click', this.unsetScreenSaver);

    const windowsList = WindowsList();

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
          /> }
        />;
      });

    const currentPage = this.getFullscreenWindowName();
    const pageTheme = _.get(windowsList, `${currentPage}.windowTheme`, PippoTheme);

    this.setState({
      mainTheme: pageTheme,
      pageBodyRoutes,
      isBrokenScreen: localStorage.getItem('broken'),
    });
  }

  componentWillUnmount() {
    if (this.loadingIconTimeout) {
      clearTimeout(this.loadingIconTimeout);
    }

    document.removeEventListener('keydown', this.closeTopWindow);
    document.removeEventListener('keydown', this.stoppedProgram);
    document.removeEventListener('keydown', this.konamiHandler);

    document.removeEventListener('mousemove', this.onMouseUpdate);
    document.removeEventListener('mouseenter', this.onMouseUpdate);

    document.removeEventListener('click', this.unsetScreenSaver);

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
      poweredOff, isBrokenScreen, loopTVon, stoppedWindowProgram, screenSaverMode,
    } = this.state;

    return poweredOff
      || isBrokenScreen
      || loopTVon
      || screenSaverMode
      || stoppedWindowProgram;
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

      if (this.scrollTop.current !== null) {
        this.scrollTop.current.scrollIntoView({ behavior: 'smooth' });
      }
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

  isWindowOpened = (windowName) => {
    const { windowsList } = this.state;
    return _.get(windowsList, `${windowName}.opened`);
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

  changeTheme = (pageName) => {
    const windowsList = WindowsList();
    const newTheme = _.get(windowsList, `${pageName}.windowTheme`, PippoTheme);

    this.setState({ mainTheme: newTheme });
  }

  stoppedProgram = (event) => {
    const {
      loopTVon, stoppedWindowProgram,
    } = this.state;

    if (((event.ctrlKey && event.key === 'c')
      || (event.ctrlKey && event.key === 'C'))
      && stoppedWindowProgram === undefined && !loopTVon) {
      this.setState({
        stoppedWindowProgram: !this.isInSpecialState(),
      });
    }
  }

  konamiHandler = (event) => {
    const {
      isBrokenScreen, poweredOff, stoppedWindowProgram,
    } = this.state;

    if (isBrokenScreen || poweredOff || stoppedWindowProgram) {
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
      this.openWindow('konamicode');
    }
  }

  generateWallpaper = () => {
    const { bgIndex, bgWallpapers } = this.state;

    this.setState({ bgIndex: (bgIndex + 1) % bgWallpapers.length });
  }

  toggleBody = () => {
    const { displayWindowBody } = this.state;

    this.setState({ displayWindowBody: !displayWindowBody });
  }

  poweroff = () => {
    this.setState({ poweredOff: true });
  }

  getFullscreenWindowName = () => {
    const currentWindow = _.last(window.location.href.split('/'));
    return _.isEmpty(currentWindow) ? this.state.mainWindowName : currentWindow;
  }

  setScreenSaver = () => {
    this.mouseMovingCounter = 0;

    this.activateScreenSaver = true;

    this.screenSaverTimeout = setTimeout(() => {
      if (!this.isInSpecialState()
        && this.activateScreenSaver
        && !this.isWindowOpened('bulb')
        && this.getFullscreenWindowName() !== 'bulb') {
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
    SoundEffects.loopTVSound.load();
    SoundEffects.loopTVSound.play();
    this.setState({ loopTVon: true });
  }

  turnOffTV = () => {
    this.setState({ loopTVon: false });
  }

  triggerEasterEgg = () => {
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
            ? <PopupWindow
              closeWindow={ () => this.closeWindow(window) }
              openWindow={ this.openWindow }
              isWindowOpened={ this.isWindowOpened }
              poweroff={ this.poweroff }
              focused={ windowFocused }
              header={ windowHeader }
              body={ windowBody }
              windowName={ window }
              displayExtraActions={ hasFullScreen }
              tiltAnimation={ tiltAnimation }
              displayCloseButton={ canCloseWindow }
              windowTheme={ windowTheme }
              unfocusedTheme={ unfocusedTheme }
            />
            : null
        }
      </div>;
    });
  }

  render() {
    const {
      bgWallpapers, bgIndex, displayWindowBody, pageBodyRoutes, showLoaderPointer,
      poweredOff, loopTVon, isBrokenScreen, stoppedWindowProgram, mainTheme, screenSaverMode,
    } = this.state;

    return (
      <HashRouter>
        <div ref={ this.scrollTop } />
        <div className='window-centered'>
          <div style={ { display: this.isInSpecialState() ? 'none' : 'block' } }>
            <Helmet>
              <style>
                {
                  `body {
                    background: url(${backgroundImages(`./${bgWallpapers[bgIndex]}`)});
                    background-color : #a1a3ca;
                  }`
                }
              </style>
            </Helmet>
            <ThemeContext.Provider value={ { changeTheme: this.changeTheme } }>
              <ThemeProvider theme={ mainTheme }>
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
                  </WindowContent>
                </Window>
              </ThemeProvider>
            </ThemeContext.Provider>
            { displayWindowBody ? null : <TheAgent /> }
          </div>
        </div>
        { this.renderXBill() }
        { loopTVon ? <LoopTV turnOff={ this.turnOffTV } /> : null }
        { screenSaverMode ? <ScreenSaver /> : null }
        <Poweroff shouldPoweroff={ poweredOff } />
        <StoppedProgram shouldStopWindowing={ stoppedWindowProgram } />
        <BrokenScreen isScreenBroken={ isBrokenScreen } />
        { showLoaderPointer ? <LoaderCursor /> : null }
        <div className='scan-lines'></div>
      </HashRouter>
    );
  }
}

export default App;

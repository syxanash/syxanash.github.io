import React, { Component } from 'react';
import _ from 'lodash';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import {
  Window, WindowHeader, WindowContent,
} from 'react95';
import { HashRouter, Switch, Route } from 'react-router-dom';

import PopupWindow from './components/PopupWindow';
import WindowHead from './components/WindowHead';
import SoundEffects from './components/additional/SoundEffects';
import { NotFoundBody } from './components/windows/NotFound';
import Copyright from './components/additional/Copyright';
import { MainWindowBody } from './components/MainWindow';
import WindowsList from './components/WindowsList';
import Poweroff from './components/additional/Poweroff';
import LoopTV from './components/additional/LoopTV';
import StoppedProgram from './components/additional/StoppedProgram';
import BrokenScreen from './components/additional/BrokenScreen';
import TheAgent from './components/additional/TheAgent';

import PippoTheme from './themes/PippoTheme';
import ThemeContext from './ThemeContext';

import './App.css';

import bgList from './resources/backgrounds-list.json';

const backgroundImages = require.context('./resources/images/backgrounds', true);

class App extends Component {
  state = {
    bgWallpapers: _.shuffle(bgList),
    bgIndex: 0,
    displayWindowBody: true,
    pageBodyRoutes: undefined,
    poweredOff: false,
    loopTVon: false,
    stoppedWindowProgram: false,
    isBrokenScreen: false,
    mainTheme: PippoTheme,
    windowsList: WindowsList(),
  }

  componentDidMount() {
    document.addEventListener('keydown', this.closeTopWindow);
    document.addEventListener('keydown', this.stoppedProgram);
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
          /> }
        />;
      });

    const currentPage = _.last(window.location.href.split('/'));
    const pageTheme = _.get(windowsList, `${currentPage}.windowTheme`, PippoTheme);

    this.setState({
      mainTheme: pageTheme,
      pageBodyRoutes,
      isBrokenScreen: localStorage.getItem('broken'),
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeTopWindow);
    document.removeEventListener('keydown', this.stoppedProgram);
  }

  onLeftsideButton = () => {
    this.openWindow('osinfowindow');
  }

  resetWindows = () => {
    this.setState({ windowsList: WindowsList() });
  }

  openWindow = (windowName) => {
    // the promise created in order to fix an annoying bug with
    // focusing the new window opened

    const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

    delay(0).then(() => {
      const { windowsList } = this.state;
      _.set(windowsList, `${windowName}.opened`, true);
      this.focusWindow(windowName);
      this.setState({ windowsList });
    });
  }

  closeWindow = (windowName) => {
    const { windowsList } = this.state;
    _.set(windowsList, `${windowName}.opened`, false);

    const currentWindow = document.getElementById(windowName);
    const backgroundWindow = currentWindow.previousSibling;
    this.focusWindow(backgroundWindow.id);

    this.setState({ windowsList });
  }

  isWindowOpened = (windowName) => {
    const { windowsList } = this.state;
    return _.get(windowsList, `${windowName}.opened`);
  }

  closeTopWindow = (event) => {
    if (event.keyCode === 27) {
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
    const { isBrokenScreen, poweredOff, loopTVon } = this.state;

    if ((event.ctrlKey && event.key === 'c')
      || (event.ctrlKey && event.key === 'C')) {
      this.setState({ stoppedWindowProgram: !isBrokenScreen && !poweredOff && !loopTVon });
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

  turnOnTV = () => {
    document.getElementById('loopTvSound').play();
    this.setState({ loopTVon: true });
  }

  turnOffTV = () => {
    this.setState({ loopTVon: false });
  }

  triggerEasterEgg = () => {
    localStorage.setItem('broken', true);
    this.setState({ isBrokenScreen: true });
  }

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
      const canCloseWindow = _.get(windowsList, `${window}.canCloseWindow`);
      const windowBody = _.get(windowsList, `${window}.body`);
      const windowTheme = _.get(windowsList, `${window}.windowTheme`);

      return <div
        key={ `${window}_${index}` }
        id={ window }
        onClick={ () => this.focusWindow(window) }
      >{
          windowOpened
            ? <PopupWindow
              closeWindow={ () => this.closeWindow(window) }
              openWindow={ this.openWindow }
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
    const {
      bgWallpapers, bgIndex, displayWindowBody, pageBodyRoutes,
      poweredOff, loopTVon, isBrokenScreen, stoppedWindowProgram, mainTheme,
    } = this.state;

    return (
      <HashRouter>
        <SoundEffects />
        <div className='window-centered'>
          <div style={ { display: poweredOff || isBrokenScreen || loopTVon || stoppedWindowProgram ? 'none' : 'block' } }>
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
                <Window shadow={ false } style={ { width: '100%' } }>
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
                    <Copyright />
                  </WindowContent>
                </Window>
              </ThemeProvider>
            </ThemeContext.Provider>
            <TheAgent displayAgent={ !displayWindowBody } />
          </div>
        </div>
        <LoopTV shouldPowerOn={ loopTVon } turnOff={ this.turnOffTV } />
        <Poweroff shouldPoweroff={ poweredOff } />
        <StoppedProgram shouldStopWindowing={ stoppedWindowProgram } />
        <BrokenScreen isScreenBroken={ isBrokenScreen } />
        <div className='scan-lines'></div>
      </HashRouter>
    );
  }
}

export default App;

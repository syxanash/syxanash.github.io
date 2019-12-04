import React, { Component } from 'react';
import _ from 'lodash';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import {
  Window, WindowHeader, WindowContent,
} from 'react95';
import { HashRouter, Switch, Route } from 'react-router-dom';

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
  }

  componentDidMount() {
    document.addEventListener('keydown', this.stoppedProgram);
    const windowsList = WindowsList();

    const pageBodyRoutes = Object.keys(windowsList)
      .filter(window => _.get(windowsList, `${window}.hasFullScreen`))
      .map((window, index) => {
        const WindowBodyComponent = _.get(windowsList, `${window}.body`);

        return <Route exact key={ `${window}_${index}` } path={ `/${window}` } component={ () => <WindowBodyComponent /> } />;
      });

    this.setState({ pageBodyRoutes, isBrokenScreen: localStorage.getItem('broken') });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.stoppedProgram);
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

  renderMainWindow = () => <MainWindowBody
    onClickEgg={ this.triggerEasterEgg }
    onClickTV={ this.turnOnTV }
  />

  render() {
    const {
      bgWallpapers, bgIndex, displayWindowBody, pageBodyRoutes,
      poweredOff, loopTVon, isBrokenScreen, stoppedWindowProgram,
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
                    background-color : #3975A9;
                  }`
                }
              </style>
            </Helmet>
            <ThemeProvider theme={ PippoTheme }>
              <Window shadow={ false } style={ { width: '100%' } }>
                <WindowHeader>
                  <WindowHead
                    onClickLeft={ this.toggleBody }
                    onClickMiddle={ this.generateWallpaper }
                    onRightClick={ this.poweroff }
                  />
                </WindowHeader>
                <WindowContent style={ { display: displayWindowBody ? 'block' : 'none' } }>
                  <Switch>
                    <Route exact path='/' component={ this.renderMainWindow }/>
                    {pageBodyRoutes}
                    <Route component={ NotFoundBody }/>
                  </Switch>
                  <Copyright />
                </WindowContent>
              </Window>
            </ThemeProvider>
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

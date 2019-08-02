import React, { Component } from 'react';
import _ from 'lodash';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import {
  Window, WindowHeader, WindowContent,
} from 'react95';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'animate.css';

import WindowHead from './components/WindowHead';
import SoundEffects from './components/additional/SoundEffects';
import { NotFoundBody } from './components/windows/NotFound';
import Copyright from './components/additional/Copyright';
import { MainWindowBody } from './components/MainWindow';
import WindowsList from './components/WindowsList';
import Poweroff from './components/additional/Poweroff';
import BrokenScreen from './components/additional/BrokenScreen';

import PippoTheme from './PippoTheme';

import bgList from './resources/backgrounds-list.json';

import './App.css';

class App extends Component {
  state = {
    bgWallpapers: _.shuffle(bgList),
    bgIndex: 0,
    displayWindowBody: true,
    pageBodyRoutes: undefined,
    poweredOff: false,
    isBrokenScreen: false,
  }

  componentDidMount() {
    const windowsList = WindowsList();

    const pageBodyRoutes = Object.keys(windowsList)
      .filter(window => _.get(windowsList, `${window}.hasFullScreen`))
      .map((window, index) => {
        const WindowBodyComponent = _.get(windowsList, `${window}.body`);

        return <Route exact key={ `${window}_${index}` } path={ `/${window}` } component={ () => <WindowBodyComponent /> } />;
      });

    this.setState({ pageBodyRoutes, isBrokenScreen: localStorage.getItem('broken') });
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

  triggerEasterEgg = () => {
    localStorage.setItem('broken', true);
    this.setState({ isBrokenScreen: true });
  }

  renderMainWindow = () => <MainWindowBody onClickEgg={ this.triggerEasterEgg } />

  render() {
    const {
      bgWallpapers, bgIndex, displayWindowBody, pageBodyRoutes, poweredOff, isBrokenScreen,
    } = this.state;

    return (
      <HashRouter>
        <SoundEffects />
        <div className='window-centered'>
          <div style={ { display: poweredOff || isBrokenScreen ? 'none' : 'block' } }>
            <Helmet>
              <style>
                {
                  `body {
                    background: url(/backgrounds/${bgWallpapers[bgIndex]});
                  }`
                }
              </style>
              <meta name="description" content="Simone Marzulli's personal website, feel free to click the buttons!" />
            </Helmet>
            <ThemeProvider theme={ PippoTheme }>
              <Window className='animated fadeIn faster' shadow={ false }>
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
          </div>
        </div>
        <Poweroff shouldPoweroff={ poweredOff } />
        <BrokenScreen isScreenBroken={ isBrokenScreen } />
      </HashRouter>
    );
  }
}

export default App;

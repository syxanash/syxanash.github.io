import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
import {
  Button, Window, WindowHeader, WindowContent,
} from 'react95';
import Draggable from 'react-draggable';
import 'animate.css';

import PippoTheme from '../PippoTheme';
import PippoDistracted from '../PippoDistracted';

import './PopupWindow.css';

class PopupWindow extends Component {
  state = {
    displayWindowBody: true,
    openAnimation: true,
  }

  toggleBody = () => {
    const { displayWindowBody } = this.state;

    this.setState({ displayWindowBody: !displayWindowBody });
  }

  closeCurrentWindow = () => {
    const { closeWindow } = this.props;
    closeWindow();
  }

  renderExtraActionButtons = () => {
    const { displayWindowBody } = this.state;
    const { windowName } = this.props;

    return (
      <React.Fragment>
        <Button
          size='sm'
          square
          onClick={ this.toggleBody }
        >
          <span style={ { transform: 'translateY(-1px)' } }>{displayWindowBody ? '▲' : '▼'}</span>
        </Button>
        <Button
          size='sm'
          square
          style={ { marginRight: '3px' } }
          onClick={ () => this.props.history.push(`/${windowName}`) }
        >
          <span style={ { transform: 'translateY(-1px)' } }>⌘</span>
        </Button>
      </React.Fragment>
    );
  }

  removeOpeningAnimation = () => {
    this.setState({ openAnimation: false });
  }

  componentDidMount() {
    const { windowName } = this.props;
    this.windowElement = document.getElementById(windowName);
    this.windowElement.addEventListener('animationend', this.removeOpeningAnimation);
  }

  componentWillUnmount() {
    this.windowElement.removeEventListener('animationend', this.removeOpeningAnimation);
  }

  render() {
    const { displayWindowBody, openAnimation } = this.state;
    const {
      header, body, displayExtraActions, focused,
    } = this.props;

    const PopupWindowHeader = header;
    const PopupWindowBody = body;

    return (
      <Draggable
        handle='.handle'
      >
        <div className='popup-window-container'>
          <ThemeProvider theme={ focused ? PippoTheme : PippoDistracted }>
            <Window className={ openAnimation ? `animated ${displayExtraActions ? 'zoomIn faster' : 'bounceIn faster'}` : '' }>
              <WindowHeader className="handle">
                <div className='window-header popup-movable-header'>
                  <span className='window-title-text' >
                    <PopupWindowHeader />
                  </span>
                  <span className='window-title-buttons'>
                    { displayExtraActions ? this.renderExtraActionButtons() : null }
                    <Button
                      size='sm'
                      square
                      onClick={ this.closeCurrentWindow }
                    >
                      <span style={ { fontWeight: 'bold', transform: 'translateY(-1px)' } }>◐</span>
                    </Button>
                  </span>
                </div>
              </WindowHeader>
              <WindowContent style={ { display: displayWindowBody ? 'block' : 'none' } }>
                <PopupWindowBody closeWindow={ this.closeCurrentWindow } />
              </WindowContent>
            </Window>
          </ThemeProvider>
        </div>
      </Draggable>
    );
  }
}

export default withRouter(PopupWindow);

import React, { Component } from 'react';
import Tilt from 'react-tilt';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
import {
  Button, Window, WindowHeader, WindowContent,
} from 'react95';
import Draggable from 'react-draggable';
import 'animate.css';

import ThemeContext from '../ThemeContext';
import PippoDistracted from '../themes/PippoDistracted';

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

  renderCloseButton = () => (
    <Button
      size='sm'
      square
      onClick={ this.closeCurrentWindow }
    >
      <span style={ { fontWeight: 'bold', transform: 'translateY(-1px)' } }>X</span>
    </Button>
  );

  renderExtraActionButtons = () => {
    const { displayWindowBody } = this.state;
    const { windowName } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
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
              onClick={ () => {
                const { history, closeWindow } = this.props;
                history.push(`/${windowName}`);
                closeWindow();
                changeTheme(windowName);
              } }
            >
              <span style={ { transform: 'translateY(-1px)' } }>⌘</span>
            </Button>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
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

  renderInnerWindow = () => {
    const { displayWindowBody, openAnimation } = this.state;
    const {
      header, body, displayExtraActions, displayCloseButton,
      focused, windowTheme, openWindow, poweroff,
    } = this.props;

    const PopupWindowHeader = header;
    const PopupWindowBody = body;

    return (
      <ThemeProvider theme={ focused ? windowTheme : PippoDistracted }>
        <Window className={ openAnimation ? `animated ${displayExtraActions ? 'zoomIn faster' : 'bounceIn faster'}` : '' }>
          <WindowHeader className="handle">
            <div className='window-header popup-movable-header'>
              <span className='window-title-text' >
                <PopupWindowHeader />
              </span>
              <span className='window-title-buttons'>
                { displayExtraActions ? this.renderExtraActionButtons() : null }
                { displayCloseButton ? this.renderCloseButton() : null }
              </span>
            </div>
          </WindowHeader>
          <WindowContent style={ { display: displayWindowBody ? 'block' : 'none' } }>
            <PopupWindowBody
              closeWindow={ this.closeCurrentWindow }
              openWindow={ openWindow }
              poweroff={ poweroff }
            />
          </WindowContent>
        </Window>
      </ThemeProvider>
    );
  }

  renderAnimatedInnerWindow = () => <Tilt>{this.renderInnerWindow()}</Tilt>

  render() {
    const { tiltAnimation } = this.props;

    return (
      <Draggable
        handle='.handle'
      >
        <div id='window-container' className='popup-window-container'>
          { tiltAnimation ? this.renderAnimatedInnerWindow() : this.renderInnerWindow() }
        </div>
      </Draggable>
    );
  }
}

export default withRouter(PopupWindow);

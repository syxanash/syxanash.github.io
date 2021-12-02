import React, { Component } from 'react';
import Tilt from 'react-tilt';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
import {
  Button, Window, WindowHeader, WindowContent,
} from 'react95';
import Draggable from 'react-draggable';
import 'animate.css';

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
    const { closeWindow, windowName } = this.props;
    closeWindow(windowName);
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
            const { history } = this.props;
            history.push(`/${windowName}`);
            this.closeCurrentWindow();
          } }
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

  renderPopupWindowBody = () => {
    const {
      body, isWindowOpened,
      openWindow, poweroff, closeWindow,
    } = this.props;

    const PopupWindowBody = body;

    return (
      <PopupWindowBody
        closeWindow={ closeWindow }
        closeCurrentWindow={ this.closeCurrentWindow }
        openWindow={ openWindow }
        isWindowOpened={ isWindowOpened }
        poweroff={ poweroff }
        isFullscreen={ false }
      />
    );
  }

  renderInnerWindow = () => {
    const { displayWindowBody, openAnimation } = this.state;
    const {
      header, displayExtraActions, displayCloseButton,
      focused, windowTheme, unfocusedTheme, hasCustomBody,
    } = this.props;

    const PopupWindowHeader = header;

    return (
      <div className={ `${focused ? 'window-shadow-primary' : ''} ${openAnimation ? `animated ${displayExtraActions ? 'zoomIn faster' : 'bounceIn faster'}` : ''}` }>
        <ThemeProvider theme={ focused ? windowTheme : unfocusedTheme }>
          <Window shadow={ !focused }>
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
            { hasCustomBody
              ? this.renderPopupWindowBody()
              : <WindowContent style={ { display: displayWindowBody ? 'block' : 'none' } }>
                {this.renderPopupWindowBody()}
              </WindowContent>
            }
          </Window>
        </ThemeProvider>
      </div>
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

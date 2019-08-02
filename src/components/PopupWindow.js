import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
import {
  Button, Window, WindowHeader, WindowContent,
} from 'react95';
import Draggable from 'react-draggable';
import 'animate.css';

import PippoTheme from '../PippoTheme';

import './PopupWindow.css';

const DEFAULT_POSITION = { x: 0, y: 0 };

class PopupWindow extends Component {
  state = {
    displayWindowBody: true,
    windowPosition: DEFAULT_POSITION,
  }

  toggleBody = () => {
    const { displayWindowBody } = this.state;

    this.setState({ displayWindowBody: !displayWindowBody });
  }

  closeCurrentWindow = () => {
    const { closeWindow } = this.props;
    this.setState({ displayWindowBody: true, windowPosition: DEFAULT_POSITION });
    closeWindow();
  }

  updateWindowPosition = (e, ui) => {
    const { windowPosition } = this.state;
    const { x, y } = windowPosition;

    this.setState({
      windowPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  }

  renderExtraActionButtons = () => {
    const { displayWindowBody } = this.state;
    const { windowName } = this.props;

    return (
      <React.Fragment>
        <Button
          size='sm'
          square
          style={ { marginRight: '3px' } }
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

  render() {
    const { displayWindowBody, windowPosition } = this.state;
    const {
      isOpen, header, body, displayExtraActions,
    } = this.props;

    const PopupWindowHeader = header;
    const PopupWindowBody = body;

    const displayProp = isOpen ? 'block' : 'none';

    return (
      <Draggable
        handle='.handle'
        defaultPosition={ DEFAULT_POSITION }
        position={ windowPosition }
        onDrag={ this.updateWindowPosition }
      >
        <div className='popup-window-container' style={ { display: displayProp } }>
          <ThemeProvider theme={ PippoTheme }>
            <Window className={ `animated ${displayExtraActions ? 'zoomIn faster' : 'swing faster'}` }>
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
                <PopupWindowBody />
              </WindowContent>
            </Window>
          </ThemeProvider>
        </div>
      </Draggable>
    );
  }
}

export default withRouter(PopupWindow);

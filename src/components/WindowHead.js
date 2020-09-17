import React, { Component } from 'react';
import _ from 'lodash';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  Button,
} from 'react95';
import 'animate.css';

import './WindowHead.css';
import { MainWindowHeader } from './MainWindow';
import { NotFoundHeader } from './windows/NotFound';
import WindowsList from './WindowsList';
import ThemeContext from '../ThemeContext';

class WindowHead extends Component {
  state = {
    windowMinimized: false,
    pageHeaderRoutes: undefined,
  }

  componentDidMount() {
    const windowsList = WindowsList();

    const pageHeaderRoutes = Object.keys(windowsList)
      .filter(window => _.get(windowsList, `${window}.hasFullScreen`))
      .map((window, index) => {
        const WindowHeaderComponent = _.get(windowsList, `${window}.header`);

        return <Route exact key={ `${window}_${index}` } path={ `/${window}` } component={ () => <WindowHeaderComponent /> } />;
      });

    this.setState({ pageHeaderRoutes });
  }

  toggleMinimizeIcon = () => {
    const { windowMinimized } = this.state;
    const { onClickLeft } = this.props;

    if (localStorage.getItem('fixed') === 'true'
      && localStorage.getItem('agentVisited') === null) {
      localStorage.setItem('agentVisited', true);
    }

    onClickLeft();
    this.setState({ windowMinimized: !windowMinimized });
  }

  renderLeftsideButton = () => {
    const { windowMinimized } = this.state;
    const { onLeftsideButton, isLeftsideButtonActive } = this.props;

    const isActive = isLeftsideButtonActive && !windowMinimized;

    return (
      <Button
        size='sm'
        square
        active={ isActive }
        onClick={ onLeftsideButton }
        disabled={ windowMinimized }
      >
        <span style={ { transform: `translate(${isActive ? '0' : '-1'}px, -1px)` } }>
          {isActive ? '◖◗' : '●' }
        </span>
      </Button>
    );
  }

  render() {
    const { windowMinimized, pageHeaderRoutes } = this.state;
    const { onClickMiddle, onRightClick } = this.props;
    const isCurrentPathRoot = this.props.location.pathname === '/';
    const rightActionButton = isCurrentPathRoot ? '◓' : '↵';

    const shouldBeat = localStorage.getItem('fixed') === 'true'
      && localStorage.getItem('agentVisited') === null;

    return (
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <div className='window-header'>
            <span>
              <span style={ { marginLeft: '-5px' } }>
                { isCurrentPathRoot ? this.renderLeftsideButton() : null }
              </span>
              <span style={ { marginLeft: '5px' } }>
                <Switch>
                  <Route exact path='/' component={ MainWindowHeader }/>
                  {pageHeaderRoutes}
                  <Route component={ NotFoundHeader }/>
                </Switch>
              </span>
            </span>
            <span className='window-title-buttons'>
              <Button
                size='sm'
                square
                onClick={ this.toggleMinimizeIcon }
                className={ `${shouldBeat ? 'animated infinite heartBeat delay-1s' : ''}` }
              >
                <span style={ { transform: 'translateY(-1px)' } }>{ windowMinimized ? '▼' : '▲'}</span>
              </Button>
              <Button
                size='sm'
                square
                onClick={ onClickMiddle }
                style={ { marginRight: '3px' } }
              >
                <span style={ { transform: 'translateY(-1px)' } }>▦</span>
              </Button>
              <Button
                size='sm'
                square
                onClick={ () => {
                  if (isCurrentPathRoot) {
                    onRightClick();
                  } else {
                    changeTheme('/');
                    this.props.history.push('/');
                  }

                  if (windowMinimized) {
                    this.toggleMinimizeIcon();
                  }
                } }
              >
                <span style={ { transform: 'translateY(-1px)' } }>{ rightActionButton }</span>
              </Button>
            </span>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default withRouter(WindowHead);

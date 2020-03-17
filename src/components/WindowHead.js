import React, { Component } from 'react';
import _ from 'lodash';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  Button,
} from 'react95';

import './WindowHead.css';
import { MainWindowHeader } from './MainWindow';
import { NotFoundHeader } from './windows/NotFound';
import WindowsList from './WindowsList';
import ThemeContext from '../ThemeContext';
import faviconImg from '../resources/icons/favicon.gif';

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

    onClickLeft();
    this.setState({ windowMinimized: !windowMinimized });
  }

  renderLeftsideButton = () => {
    const { onLeftsideButton, isLeftsideButtonActive } = this.props;

    return (<Button
        size='sm'
        square
        active={ isLeftsideButtonActive }
        onClick={ onLeftsideButton }
      >
        <span>
          <img
            src={ faviconImg }
            alt='main icon'
            style={ { height: '15px', marginLeft: '-1px', marginBottom: '-1px' } }
          />
        </span>
      </Button>);
  }

  render() {
    const { windowMinimized, pageHeaderRoutes } = this.state;
    const { onClickMiddle, onRightClick } = this.props;
    const isCurrentPathRoot = this.props.location.pathname === '/';
    const rightActionButton = isCurrentPathRoot ? '◓' : '↵';

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
                  changeTheme('/');

                  this.props.history.push('/');

                  if (isCurrentPathRoot) {
                    onRightClick();
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

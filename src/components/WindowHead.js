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

  render() {
    const { windowMinimized, pageHeaderRoutes } = this.state;
    const { onClickMiddle, onRightClick } = this.props;
    const currentPathname = this.props.location.pathname;
    const rightActionButton = currentPathname === '/' ? '◓' : '↵';

    return <div className='window_header'>
      <span className='window_title_text' >
        <Switch>
          <Route exact path='/' component={ MainWindowHeader }/>
          {pageHeaderRoutes}
          <Route component={ NotFoundHeader }/>
        </Switch>
      </span>
      <span className='window_title_buttons'>
        <Button
          size='sm'
          square
          style={ { marginRight: '3px' } }
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
            this.props.history.push('/');

            if (currentPathname === '/') {
              onRightClick();
            }
          } }
        >
          <span style={ { transform: 'translateY(-1px)' } }>{ rightActionButton }</span>
        </Button>
      </span>
    </div>;
  }
}

export default withRouter(WindowHead);

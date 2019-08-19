import React, { Component } from 'react';

import mainIcon from '../../resources/icons/favicon.png';
import './NotFound.css';

class FixHeader extends Component {
  render = () => (
    <span>
      <img src={ mainIcon } alt='main logo' style={ { height: '15px' } }/>
    </span>
  )
}

class FixBody extends Component {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    if (localStorage.getItem('broken')) {
      localStorage.removeItem('broken');
      localStorage.setItem('fixed', true);
      window.location.reload();
    }
  }

  render = () => (<div className='notfound-window'>
    <h1 style={ { textAlign: 'center' } }>
      {
        localStorage.getItem('fixed')
          ? 'The computer has been fixed...'
          : 'You shouldn\'t fix what is not broken!'
      }
    </h1>
  </div>
  )
}

export { FixHeader, FixBody };

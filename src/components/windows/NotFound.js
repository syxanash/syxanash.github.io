import React, { Component } from 'react';

import mainIcon from '../../resources/icons/favicon.png';
import './NotFound.css';

class NotFoundHeader extends Component {
  render = () => (
    <span>
      <img src={ mainIcon } alt='404' style={ { height: '15px' } }/> File Not Found
    </span>
  )
}

class NotFoundBody extends Component {
  state = {
    randomColor: '#000000',
    intervalId: undefined,
  }

  componentDidMount() {
    const intervalId = setInterval(this.generateColor, 100);

    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateColor = () => {
    this.setState({ randomColor: this.getRandomColor() });
  }


  render = () => {
    const { randomColor } = this.state;
    return (<div className='notfound_window'>
      <h1 style={ { textAlign: 'center', color: randomColor } }>404</h1>
      <span>Whatever you were looking for is not here.</span>
      <p>Stop using internet, go out and love someone!</p>
    </div>
    );
  }
}

export { NotFoundHeader, NotFoundBody };

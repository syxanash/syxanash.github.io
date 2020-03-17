import React, { Component } from 'react';

import mainIcon from '../../resources/icons/favicon.gif';

class NotFoundHeader extends Component {
  render = () => (
    <span>
      <img src={ mainIcon } alt='404' style={ { height: '15px' } }/> File Not Found
    </span>
  )
}

class NotFoundBody extends Component {
  constructor(props) {
    super(props);

    this.intervalId = undefined;

    this.state = {
      randomColor: '#000000',
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.generateColor, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
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
    return (<div>
      <h1 style={ { textAlign: 'center', color: randomColor } }>404</h1>
      <span>Whatever you were looking for is not here.</span>
      <p>Stop using internet, go out and love someone!</p>
    </div>
    );
  }
}

export { NotFoundHeader, NotFoundBody };

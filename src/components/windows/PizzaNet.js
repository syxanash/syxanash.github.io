import React, { Component } from 'react';

import pizzaIcon from '../../resources/icons/pizza.gif';

class PizzaNetHeader extends Component {
  render = () => (
    <span>
      <img src={ pizzaIcon } alt='pizza' style={ { height: '15px' } }/> Pizza Net
    </span>
  )
}

class PizzaNetBody extends Component {
  // eslint-disable-next-line arrow-body-style
  render = () => {
    return (
      <div>Hello pizza</div>
    );
  }
}

export { PizzaNetHeader, PizzaNetBody };

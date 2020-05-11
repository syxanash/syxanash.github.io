import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

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
    const input = '# This is a header\n\nAnd this is a paragraph';

    return (
      <ReactMarkdown source={ input } />
    );
  }
}

export { PizzaNetHeader, PizzaNetBody };

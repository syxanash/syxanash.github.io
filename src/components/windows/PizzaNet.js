import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  Divider, Button, Progress,
} from 'react95';

import './PizzaNet.css';
import pizzaSteps from '../additional/PizzaSteps';
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
      <div>
        <div className='pizza-wizard-container'>
          <div>
            <img className='pizza-wizard-side-image' src='https://live.staticflickr.com/65535/49882208456_8f708222a8_k.jpg' alt='pizza' />
          </div>
          <div className='pizza-wizard-text-container'>
            <ReactMarkdown source={ pizzaSteps.introduction } />
          </div>
        </div>
        <div className='pizza-wizard-progress'>
          <div style={ { display: 'block' } }>
            <div style={ { paddingBottom: '5px' } }><b>Recipe progress...</b></div>
            <div><Progress percent={ 0 } shadow={ false } style={ { maxWidth: '100%' } } /></div>
          </div>
        </div>
        <Divider />
        <div className='pizza-wizard-buttons-container'>
          <Button
            style={ { width: '120px' } }
            size='lg'
          >&lt; <span className='underline-text'>B</span>ack</Button>
          <Button
            style={ { width: '120px' } }
            size='lg'
          ><span className='underline-text'>N</span>ext &gt;</Button>
          <Button
            style={ { marginLeft: '10px', width: '120px' } }
            size='lg'
          >Cancel</Button>
        </div>
      </div>
    );
  }
}

export { PizzaNetHeader, PizzaNetBody };

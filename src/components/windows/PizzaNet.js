import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  Divider, Button, Progress,
} from 'react95';

import './PizzaNet.css';
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
    const input = '# This is a header\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliqui';

    return (
      <div>
        <div className='pizza-wizard-container'>
          <div>
            <img className='pizza-wizard-side-image' src='https://live.staticflickr.com/65535/49882208456_8f708222a8_k.jpg' alt='pizza' />
          </div>
          <div className='pizza-wizard-text-container'>
            <ReactMarkdown source={ input } />
          </div>
        </div>
        <div className='pizza-wizard-progress'>
          <div style={ { display: 'block' } }>
            <div style={ { paddingBottom: '5px' } }><span>Recipe progres...</span></div>
            <div><Progress percent={ 0 } shadow={ false } style={ { maxWidth: '100%' } } /></div>
          </div>
        </div>
        <Divider />
        <div className='pizza-wizard-buttons-container'>
          <Button
            style={ { width: '120px' } }
            size='lg'
          ><b>&lt; <span className='underline-text'>B</span>ack</b></Button>
          <Button
            style={ { width: '120px' } }
            size='lg'
          ><b><span className='underline-text'>N</span>ext &gt;</b></Button>
          <Button
            style={ { marginLeft: '10px', width: '120px' } }
            size='lg'
          ><b>Cancel</b></Button>
        </div>
      </div>
    );
  }
}

export { PizzaNetHeader, PizzaNetBody };

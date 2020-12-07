import React, { Component } from 'react';
import axios from 'axios';
import {
  Cutout,
} from 'react95';
import ReactMarkdown from 'react-markdown/with-html';

import './Foglio.css';

import foglioIcon from '../../resources/icons/blog.gif';

class FoglioHeader extends Component {
  render = () => (
    <span>
      <img src={ foglioIcon } alt='main logo' style={ { height: '15px' } }/> Foglio
    </span>
  )
}

class FoglioBody extends Component {
  state = {
    textDocument: 'Loading...',
  }

  componentDidMount = () => {
    axios.get('https://themightybackend.herokuapp.com')
      .then((res) => {
        this.setState({
          textDocument: res.data,
        });
      }).catch(() => {
        this.setState({
          textDocument: 'error occurred while retrieving data...',
        });
      });
  }

  render = () => {
    const { textDocument } = this.state;

    return (<React.Fragment>
      <Cutout className='foglio-cutout'>
        <div className='document-style'>
          <ReactMarkdown source={ textDocument } escapeHtml={ false } />
        </div>
      </Cutout>
    </React.Fragment>);
  }
}

export { FoglioHeader, FoglioBody };

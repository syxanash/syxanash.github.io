import React, { Component } from 'react';
import axios from 'axios';
import {
  Cutout, Button,
} from 'react95';
import ReactMarkdown from 'react-markdown/with-html';

import Util from '../Util';

import './Foglio.css';

import hyperlinkIcon from '../../resources/icons/hyperlink.gif';
import questionIcon from '../../resources/icons/question-mark.gif';
import foglioIcon from '../../resources/icons/blog.gif';

const BACKEND_URL = 'https://themightybackend.herokuapp.com';

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
    postDate: new Date(),
  }

  componentDidMount = () => {
    axios.get(BACKEND_URL)
      .then((res) => {
        this.setState({
          textDocument: res.data.post_content,
          postDate: new Date(res.data.published_date),
        });
      }).catch(() => {
        this.setState({
          textDocument: 'error occurred while retrieving data...',
        });
      });
  }

  render = () => {
    const { textDocument, postDate } = this.state;

    return (<React.Fragment>
      <Cutout className='foglio-cutout'>
        <div className='document-style'>
          <ReactMarkdown source={ textDocument } escapeHtml={ false } />
        </div>
        <div style={ {
          fontWeight: 'bold',
          padding: '15px',
          paddingTop: '0px',
          textAlign: 'right',
        } }><i>
            <span>Posted on { postDate.toDateString() }</span>
          </i>
        </div>
      </Cutout>
      <Cutout className='foglio-footer-cut-out'>
        <div className='foglio-footer-buttons' style={ { float: 'right' } }>
          <Button fullWidth>
            <figcaption><b>What is this</b></figcaption>
            <img src={ questionIcon } className='small-icon' alt="question mark"/>
          </Button>
        </div>
        <div className='foglio-footer-buttons' style={ { float: 'left' } }>
          <Button fullWidth onClick={ () => Util.openWebsiteURL({ url: `${BACKEND_URL}/rss.xml` }) }>
            <img src={ hyperlinkIcon } className='small-icon' alt="hyperlink icon"/>
            <figcaption>Feed RSS</figcaption>
          </Button>
        </div>
      </Cutout>
    </React.Fragment>);
  }
}

export { FoglioHeader, FoglioBody };

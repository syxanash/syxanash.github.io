import React, { Component } from 'react';
import axios from 'axios';
import {
  Cutout, Button, Progress,
} from 'react95';
import ReactMarkdown from 'react-markdown/with-html';

import Util from '../Util';

import './Foglio.css';

import errorIcon from '../../resources/icons/error.png';
import hyperlinkIcon from '../../resources/icons/hyperlink.gif';
import questionIcon from '../../resources/icons/question-mark.gif';
import foglioIcon from '../../resources/icons/blog.gif';

const BACKEND_URL = 'https://simonesmightybackend.herokuapp.com';

class FoglioHeader extends Component {
  render = () => (
    <span>
      <img src={ foglioIcon } alt='main logo' style={ { height: '15px' } }/> Foglio
    </span>
  )
}

class FoglioBody extends Component {
  constructor(props) {
    super(props);

    this.loaderInterval = undefined;

    this.state = {
      showReport: false,
      loaderInteger: 0,
      postLoaded: undefined,
      backendResponse: undefined,
      postDate: new Date(),
    };
  }

  componentDidMount = () => {
    this.loaderInterval = setInterval(this.increaseLoader, 15);

    axios.get(`${BACKEND_URL}/post`)
      .then((res) => {
        this.setState({
          postLoaded: true,
          backendResponse: res.data.post_content,
          postDate: new Date(res.data.published_date),
        });
      }).catch((errorObject) => {
        clearInterval(this.loaderInterval);
        this.setState({
          postLoaded: false,
          backendResponse: errorObject,
        });
      });
  }

  componentWillUnmount = () => {
    if (this.loaderInterval !== undefined) {
      clearInterval(this.loaderInterval);
    }
  }

  increaseLoader = () => {
    const { loaderInteger } = this.state;

    if (loaderInteger < 99) { // lol
      this.setState({ loaderInteger: loaderInteger + 1 });
    } else {
      clearInterval(this.loaderInterval);
    }
  }

  toggleReport = () => { this.setState({ showReport: true }); }

  render = () => {
    const { openWindow } = this.props;
    const {
      backendResponse, postDate, postLoaded, loaderInteger, showReport,
    } = this.state;

    if (postLoaded === undefined) {
      return (
        <div style={ { textAlign: 'center' } }>
          <h2 style={ { marginTop: '0' } }>LOADING POST...</h2>
          <Progress percent={ loaderInteger } shadow={ false } />
        </div>
      );
    }

    if (!postLoaded) {
      return (<React.Fragment>
        <div className='header-error'>
          <span>
            <img
              src={ errorIcon }
              alt='trembling error'
              className='error-icon shake'
            />
            Pippo OS has encountered a problem and needs to close.
            We are sorry for the inconvenience.
          </span>
        </div>
        <div className='useless-error-message'>
          <p>
            if you were in the middle of something,
            the information you were working on might be lost.
          </p>
          <p>
            <span style={ { fontWeight: 'bolder' } }>Please tell Simone about this problem.</span><br />
            <span>
              We have created an error report that you can
              send to help us improve Pippo OS.
              We will treat this report as confidential and anonymous.
            </span>
          </p>
          <p>
            To see what data this error report contains,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='error-report-link' onClick={ this.toggleReport }>click here.</span></p>
        </div>
        <Cutout style={ { display: showReport ? 'block' : 'none' } } className='error-cutout'>
          <div className='error-report-space'>
            <p>Error: {backendResponse.message}</p>
            <br />
            <br />
          </div>
        </Cutout>
        <div className='bottom-buttons'>
          <Button
            style={ { width: '160px' } }
            size='md'
            onClick={ () => { openWindow('contact', true); } }
          ><span className='underline-text'>S</span>end Error Report</Button>
        </div>
      </React.Fragment>);
    }

    return (<React.Fragment>
      <Cutout className='foglio-cutout'>
        <div className='document-style'>
          <ReactMarkdown source={ backendResponse } escapeHtml={ false } />
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
          <Button fullWidth onClick={ () => openWindow('fogliopopup', true) }>
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

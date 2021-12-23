import React, { Component } from 'react';
import {
  Cutout, Button, Progress, Anchor,
} from 'react95';
import ReactMarkdown from 'react-markdown/with-html';

import configUrls from '../../resources/config-urls.json';
import './Blog.css';

import htmlLinkIcon from '../../resources/icons/htmlLink.gif';
import hyperlinkIcon from '../../resources/icons/hyperlink.gif';
import prevArrowIcon from '../../resources/icons/prev_white.gif';
import prevArrowBlueIcon from '../../resources/icons/prev_blue.gif';
import nextArrowIcon from '../../resources/icons/next_white.gif';
import nextArrowBlueIcon from '../../resources/icons/next_blue.gif';

import blogIcon from '../../resources/icons/blog.gif';

class BlogHeader extends Component {
  render = () => (
    <span>
      <img src={ blogIcon } alt='main logo' style={ { height: '15px' } }/> Simone's Blog
    </span>
  )
}

class BlogBody extends Component {
  constructor(props) {
    super(props);

    this.scrollTopBlog = React.createRef();

    this.loaderInterval = undefined;
    this.hopeTimeout = undefined;

    this.state = {
      loaderInteger: 0,
      maxPostsNumber: undefined,
      currentPostIndex: undefined,
      postLoaded: undefined,
      backendResponse: undefined,
      headerText: 'LOADING POST...',
    };
  }

  componentDidMount = () => {
    this.loaderInterval = setInterval(this.increaseLoader, 20);

    fetch(`${configUrls.backendUrl}/blogpost`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          postLoaded: true,
          backendResponse: data.post_content,
          maxPostsNumber: data.posts_count,
          currentPostIndex: data.posts_count,
        });
      }).catch((errorObject) => {
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

    if (this.hopeTimeout !== undefined) {
      clearTimeout(this.hopeTimeout);
    }
  }

  startDecreaseLoader = () => {
    this.setState({ headerText: 'LOADING ABORTED' });
    this.loaderInterval = setInterval(this.decreaseLoader, 5);
  }

  increaseLoader = () => {
    const { loaderInteger, postLoaded } = this.state;

    const percentageStop = postLoaded === undefined ? 99 : 80;

    if (loaderInteger < percentageStop) {
      this.setState({ loaderInteger: loaderInteger + 1 });
    } else {
      clearInterval(this.loaderInterval);
      if (!postLoaded && postLoaded !== undefined) {
        this.hopeTimeout = setTimeout(this.startDecreaseLoader, 1500);
      }
    }
  }

  decreaseLoader = () => {
    const { loaderInteger } = this.state;

    if (loaderInteger > 0) {
      this.setState({ loaderInteger: loaderInteger - 1 });
    } else {
      clearInterval(this.loaderInterval);
    }
  }

  loadBlogPost = (postIndex) => {
    fetch(`${configUrls.backendUrl}/blogpost/${postIndex}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          currentPostIndex: postIndex,
          postLoaded: true,
          backendResponse: data.post_content,
        });

        if (this.scrollTopBlog.current !== null) {
          this.scrollTopBlog.current.scrollIntoView({ behavior: 'smooth' });
        }
      }).catch((errorObject) => {
        this.setState({
          postLoaded: false,
          backendResponse: errorObject,
        });
      });
  }

  previousPost = () => {
    const { currentPostIndex } = this.state;
    this.loadBlogPost(currentPostIndex - 1);
  }

  nextPost = () => {
    const { currentPostIndex } = this.state;
    this.loadBlogPost(currentPostIndex + 1);
  }

  render = () => {
    const {
      backendResponse, postLoaded, loaderInteger, headerText,
      currentPostIndex, maxPostsNumber,
    } = this.state;

    if (postLoaded === undefined) {
      return (
        <div style={ { textAlign: 'center' } }>
          <h2 style={ { marginTop: '0' } }>{ headerText }</h2>
          <Progress percent={ loaderInteger } shadow={ false } />
        </div>
      );
    }

    if (!postLoaded) {
      return (
        <React.Fragment>
          <div style={ { textAlign: 'center' } }>
            <h2 style={ { marginTop: '0' } }>{ headerText }</h2>
            <Progress percent={ loaderInteger } shadow={ false } />
          </div>
          <Cutout style={ { display: loaderInteger === 0 ? 'block' : 'none', backgroundColor: 'white', marginTop: '20px' } }>
            <div style={ { padding: '15px' } }>
              <p>Error: { backendResponse.message } <Anchor href={ `${configUrls.repositoryUrl}/blob/development/src/components/windows/Blog.js` } target="_blank">@ Blog.js</Anchor></p>
              <br />
            </div>
          </Cutout>
        </React.Fragment>
      );
    }

    return (<React.Fragment>
      <div ref={ this.scrollTopBlog } />
      <Cutout className='blog-cutout'>
        <div className='document-style'>
          <ReactMarkdown source={ backendResponse } escapeHtml={ false } />
        </div>
      </Cutout>
      <Cutout className='blog-footer-cut-out'>
        <div className='blog-footer-buttons'>
          <Button
            fullWidth
            onClick={ this.nextPost }
            disabled={ currentPostIndex + 1 > maxPostsNumber }
            style={ { textDecoration: 'none' } }
          >
            <img
              src={ currentPostIndex + 1 > maxPostsNumber ? nextArrowIcon : nextArrowBlueIcon }
              className='small-icon'
              alt="left arrow"
            />
            <figcaption><b>Next post</b></figcaption>
          </Button>
        </div>
        <div className='blog-footer-buttons'>
          <div className='blog-footer-center-buttons'>
            <a href={ `${configUrls.backendUrl}/rss.xml` } style={ { width: '100%', textDecoration: 'none' } } rel='noopener noreferrer'>
              <Button fullWidth>
                <img src={ hyperlinkIcon } className='small-icon' alt="hyperlink icon"/>
                <figcaption><b>RSS</b></figcaption>
              </Button>
            </a>
            <a href={ `${configUrls.backendUrl}/fancyblogpost/${currentPostIndex}` } style={ { width: '100%', textDecoration: 'none' } } rel='noopener noreferrer'>
              <Button fullWidth>
                <img src={ htmlLinkIcon } className='small-icon' alt="direct link icon"/>
                <figcaption><b>html</b></figcaption>
              </Button>
            </a>
          </div>
        </div>
        <div className='blog-footer-buttons'>
          <Button
            fullWidth
            onClick={ this.previousPost }
            disabled={ currentPostIndex - 1 === 0 }
            style={ { textDecoration: 'none' } }
          >
            <figcaption><b>Previous post</b></figcaption>&nbsp;
            <img
              src={ currentPostIndex - 1 === 0 ? prevArrowIcon : prevArrowBlueIcon }
              className='small-icon'
              alt="right arrow"
            />
          </Button>
        </div>
      </Cutout>
    </React.Fragment>);
  }
}

export { BlogHeader, BlogBody };

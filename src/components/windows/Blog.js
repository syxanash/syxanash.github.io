import React, { Component } from 'react';
import {
  Cutout, Button, Progress, Anchor, Toolbar,
} from 'react95';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import _ from 'lodash';

import DesktopContext from '../../DesktopContext';

import configUrls from '../../resources/config-urls.json';
import './Blog.css';

import Util from '../Util';

import htmlLinkIcon from '../../resources/icons/htmlLink.gif';
import RSSIcon from '../../resources/icons/RSS.png';
import calendarIcon from '../../resources/icons/calendar.gif';
import prevArrowIcon from '../../resources/icons/prev_white.gif';
import prevArrowBlueIcon from '../../resources/icons/prev_blue.gif';
import nextArrowIcon from '../../resources/icons/next_white.gif';
import nextArrowBlueIcon from '../../resources/icons/next_blue.gif';

import blogIcon from '../../resources/icons/blog.gif';

class BlogHeader extends Component {
  render = () => (
    <React.Fragment>
      <img src={ blogIcon } alt='main logo' style={ { height: '15px' } }/> Simone's Blog
    </React.Fragment>
  )
}

class BlogBody extends Component {
  constructor(props) {
    super(props);

    this.loaderInterval = undefined;
    this.hopeTimeout = undefined;

    this.state = {
      loaderInteger: 0,
      postLoaded: undefined,
      backendResponse: undefined,

      publishedDate: undefined,
      previousPost: undefined,
      nextPost: undefined,
      currentPost: undefined,

      headerText: 'LOADING POST...',
    };
  }

  componentDidMount = () => {
    this.loaderInterval = setInterval(this.increaseLoader, 20);

    this.updateDesktopContext({ postLoaded: undefined });
    this.setState({ loaderInteger: 0 });

    fetch(`${configUrls.backendUrl}/blogapi`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((data) => {
        this.updateDesktopContext({
          postLoaded: true,
          backendResponse: data.post_content,
          publishedDate: new Date(data.published_date),
          currentPost: data.current,
          previousPost: data.previous,
          nextPost: data.next,
        });
      })
      .catch((errorObject) => {
        this.updateDesktopContext({
          postLoaded: false,
          backendResponse: errorObject,
        });
      });
  }

  componentWillUnmount = () => {
    const { setDesktopContext, desktopContext } = this.context;
    const { isWindowOpened, closeWindow } = this.props;

    if (this.loaderInterval !== undefined) {
      clearInterval(this.loaderInterval);
    }

    if (this.hopeTimeout !== undefined) {
      clearTimeout(this.hopeTimeout);
    }

    if (isWindowOpened('blogPostList')) {
      closeWindow('blogPostList');
    }

    _.set(desktopContext, 'blog', {});
    setDesktopContext(desktopContext);
  }

  updateDesktopContext = (object) => {
    const { setDesktopContext, desktopContext } = this.context;

    _.set(desktopContext, 'blog', object);
    setDesktopContext(desktopContext);

    this.setState({ ...object });
  }

  loadBlogPost = (postId) => {
    this.loaderInterval = setInterval(this.increaseLoader, 20);

    this.updateDesktopContext({ postLoaded: undefined });
    this.setState({ loaderInteger: 0 });

    fetch(`${configUrls.backendUrl}/blogapi/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((data) => {
        this.updateDesktopContext({
          postLoaded: true,
          backendResponse: data.post_content,
          publishedDate: new Date(data.published_date),
          currentPost: data.current,
          previousPost: data.previous,
          nextPost: data.next,
        });
      })
      .catch((errorObject) => {
        this.updateDesktopContext({
          postLoaded: false,
          backendResponse: errorObject,
        });
      });
  }

  clickPreviousPost = () => {
    const { desktopContext } = this.context;
    const blogObject = _.get(desktopContext, 'blog');

    const { previousPost } = _.isEmpty(blogObject) ? this.state : blogObject;

    this.loadBlogPost(previousPost);
  }

  clickNextPost = () => {
    const { desktopContext } = this.context;
    const blogObject = _.get(desktopContext, 'blog');

    const { nextPost } = _.isEmpty(blogObject) ? this.state : blogObject;

    this.loadBlogPost(nextPost);
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

  openPostList = () => {
    const { openWindow } = this.props;
    openWindow('blogPostList', true);
  }

  render = () => {
    const { desktopContext } = this.context;

    const blogObject = _.get(desktopContext, 'blog');
    const isCacheEmpty = _.isEmpty(blogObject);

    const {
      backendResponse, postLoaded,
      previousPost, nextPost, currentPost, publishedDate,
    } = isCacheEmpty ? this.state : blogObject;

    const { loaderInteger, headerText } = this.state;

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
      <div className='toolbar-container'>
        <Toolbar>
          <Button onClick={ this.openPostList } variant="menu"><img src={ calendarIcon } className='small-icon' alt="blog post list"/> All posts</Button>
          <Button onClick={ () => Util.openWebsiteURL({ url: `${configUrls.backendUrl}/rss.xml` }) } variant="menu"><img src={ RSSIcon } className='small-icon' alt="RSS icon"/> RSS</Button>
          <Button onClick={ () => Util.openWebsiteURL({ url: `${configUrls.backendUrl}/blog/${currentPost}` }) } variant="menu"><img src={ htmlLinkIcon } className='small-icon' alt="RSS icon"/> Post link</Button>
        </Toolbar>
      </div>
      <Cutout className='blog-cutout'>
        <div className='blogpost-wrapper'>
          <div style={ { marginTop: '-20px' } }>
            <ReactMarkdown components={
              {
                h1(props) {
                  const { node, ...rest } = props;
                  return <h1 className='blog-post-title' { ...rest } >{props.children}</h1>;
                },
              }
            } children={ backendResponse } rehypePlugins={ [rehypeRaw] } />
            <div style={ { textAlign: 'right', paddingTop: '10px' } }>
              <span style={ { fontWeight: 'bold', fontStyle: 'italic' } }>Posted on {publishedDate.toLocaleString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </Cutout>
      <Cutout className='blog-footer-cut-out'>
        <div className='blog-footer-buttons'>
          <Button
            fullWidth
            onClick={ this.clickNextPost }
            disabled={ nextPost === null }
            style={ { textDecoration: 'none' } }
          >
            <img
              src={ nextPost === null ? nextArrowIcon : nextArrowBlueIcon }
              className='small-icon'
              alt="left arrow"
            />
            <figcaption><b>Next post</b></figcaption>
          </Button>
        </div>
        <div className='blog-footer-buttons'>
          <Button fullWidth onClick={ this.openPostList }>
            <img src={ calendarIcon } className='small-icon' alt="list of posts"/>
            <figcaption><b>All posts</b></figcaption>
          </Button>
        </div>
        <div className='blog-footer-buttons'>
          <Button
            fullWidth
            onClick={ this.clickPreviousPost }
            disabled={ previousPost === null }
            style={ { textDecoration: 'none' } }
          >
            <figcaption><b>Previous post</b></figcaption>&nbsp;
            <img
              src={ previousPost === null ? prevArrowIcon : prevArrowBlueIcon }
              className='small-icon'
              alt="right arrow"
            />
          </Button>
        </div>
      </Cutout>
    </React.Fragment>);
  }
}

BlogBody.contextType = DesktopContext;

export { BlogHeader, BlogBody };

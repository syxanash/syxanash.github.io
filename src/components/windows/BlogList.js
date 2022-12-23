import React, { Component } from 'react';
import {
  Table, TableBody, TableHead, TableRow, TableHeadCell, TableDataCell,
} from 'react95';
import _ from 'lodash';

import WindowsContext from '../../WindowsContext';

import configUrls from '../../resources/config-urls.json';
import './Blog.css';

import calendarIcon from '../../resources/icons/calendar.gif';

class BlogListHeader extends Component {
  render = () => (
    <React.Fragment>
      <img src={ calendarIcon } alt='main logo' style={ { height: '15px' } }/> Post List
    </React.Fragment>
  )
}

class BlogListBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogPostList: undefined,
      listLoaded: false,
      backendResponse: undefined,
      dateSorted: false,
    };
  }

  componentDidMount() {
    fetch(`${configUrls.backendUrl}/blogapi/list`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          listLoaded: true,
          blogPostList: _.reverse(data),
        });
      })
      .catch((errorObject) => {
        this.setState({
          listLoaded: false,
          backendResponse: errorObject,
        });
      });
  }

  selectPost = (postId) => {
    const { setSharedContext, sharedContext } = this.context;

    _.set(sharedContext, 'blog', { postLoaded: undefined, loaderInteger: 0 });

    fetch(`${configUrls.backendUrl}/blogapi/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((data) => {
        _.set(sharedContext, 'blog', {
          postLoaded: true,
          backendResponse: data.post_content,
          publishedDate: new Date(data.published_date),
          currentPost: data.current,
          previousPost: data.previous,
          nextPost: data.next,
        });

        setSharedContext(sharedContext);
      })
      .catch((errorObject) => {
        _.set(sharedContext, 'blog', {
          postLoaded: false,
          backendResponse: errorObject,
        });

        setSharedContext(sharedContext);
      });

    setSharedContext(sharedContext);
  }

  generateTableRows = () => {
    const { blogPostList } = this.state;
    const { sharedContext } = this.context;

    const currentPost = _.get(sharedContext, 'blog.currentPost', undefined);

    return blogPostList.map((post, index) => {
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      const isCurrentPostSelected = currentPost === post.id;

      const formatDate = new Date(post.published_date).toLocaleDateString('en-GB', dateOptions);
      const formatDescription = post.description.charAt(0).toUpperCase()
        + post.description.slice(1);

      return <TableRow
        onClick={ isCurrentPostSelected ? null : () => this.selectPost(post.id) } key={ `row_${index}` }
        style={ { backgroundColor: isCurrentPostSelected ? '#080883' : undefined, color: isCurrentPostSelected ? 'white' : undefined } }
      >
        <TableDataCell style={ { width: '100px', textAlign: 'center' } }>{formatDate}</TableDataCell>
        <TableDataCell style={ { width: '200px', fontWeight: 'bold' } }>{post.title}</TableDataCell>
        <TableDataCell><em>{formatDescription}</em></TableDataCell>
      </TableRow>;
    });
  }

  sortByDate = () => {
    const { blogPostList, dateSorted } = this.state;

    blogPostList.sort((a, b) => {
      const dateA = new Date(a.published_date);
      const dateB = new Date(b.published_date);
      return dateSorted ? dateB - dateA : dateA - dateB;
    });

    this.setState({ blogPostList, dateSorted: !dateSorted });
  }

  render = () => {
    const { listLoaded } = this.state;

    if (!listLoaded) {
      return <p>Can't load the post list at this time :&#40;</p>;
    }

    return (<React.Fragment>
      <Table>
        <TableHead>
          <TableRow head>
            <TableHeadCell onClick={ this.sortByDate }>Date</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { this.generateTableRows() }
        </TableBody>
      </Table>
    </React.Fragment>);
  }
}

BlogListBody.contextType = WindowsContext;

export { BlogListHeader, BlogListBody };

import React, { Component } from 'react';
import {
  Table, TableBody, TableHead, TableRow, TableHeadCell, TableDataCell, Hourglass, Button,
} from 'react95';
import _ from 'lodash';

import DesktopContext from '../../DesktopContext';

import configUrls from '../../resources/config-urls.json';

import blackCursor from '../../resources/icons/pointers/cursor.gif';
import calendarIcon from '../../resources/icons/calendar.gif';

class BlogPostListHeader extends Component {
  render = () => (
    <React.Fragment>
      <img src={ calendarIcon } alt='main logo' style={ { height: '15px' } }/> Blog Posts
    </React.Fragment>
  )
}

class BlogPostListBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogPostList: undefined,
      listLoaded: undefined,
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
    const { setDesktopContext, desktopContext } = this.context;

    _.set(desktopContext, 'blog', { postLoaded: undefined, loaderInteger: 0 });

    fetch(`${configUrls.backendUrl}/blogapi/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((data) => {
        _.set(desktopContext, 'blog', {
          postLoaded: true,
          backendResponse: data.post_content,
          publishedDate: new Date(data.published_date),
          currentPost: data.current,
          previousPost: data.previous,
          nextPost: data.next,
        });

        setDesktopContext(desktopContext);
      })
      .catch((errorObject) => {
        _.set(desktopContext, 'blog', {
          postLoaded: false,
          backendResponse: errorObject,
        });

        setDesktopContext(desktopContext);
      });

    setDesktopContext(desktopContext);
  }

  generateTableRows = () => {
    const { blogPostList } = this.state;
    const { desktopContext } = this.context;

    const currentPost = _.get(desktopContext, 'blog.currentPost', undefined);

    return blogPostList.map((post, index) => {
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      const isCurrentPostSelected = currentPost === post.id;

      const formatDate = new Date(post.published_date).toLocaleDateString('en-GB', dateOptions);
      const formatDescription = post.description.charAt(0).toUpperCase()
        + post.description.slice(1);

      return <TableRow
        onClick={ isCurrentPostSelected ? null : () => this.selectPost(post.id) } key={ `row_${index}` }
        style={ {
          backgroundColor: isCurrentPostSelected ? '#080883' : undefined,
          color: isCurrentPostSelected ? 'white' : undefined,
        } }
      >
        <TableDataCell style={ { width: '100px', textAlign: 'center' } }>{formatDate}</TableDataCell>
        <TableDataCell style={ { width: '200px', fontWeight: 'bold' } }>{post.title}</TableDataCell>
        { document.body.clientWidth > 600
          ? <TableDataCell><em>{formatDescription}</em></TableDataCell>
          : null }
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
    const { closeCurrentWindow } = this.props;
    const { listLoaded } = this.state;

    if (listLoaded === undefined) {
      return <div style={ { textAlign: 'center' } }><h2 style={ { marginTop: '0' } }>LOADING LIST</h2><Hourglass size={ 50 } /></div>;
    }

    if (!listLoaded) {
      return <div style={ { textAlign: 'center' } }>
        <h2>Can't load the post list at this time :&#40;</h2><br />
        <Button onClick={ closeCurrentWindow } style={ { width: '150px' } }>Ok</Button>
      </div>;
    }

    return (<React.Fragment>
      <Table>
        <TableHead>
          <TableRow head>
            <TableHeadCell style={ { cursor: `url(${blackCursor}), auto` } } onClick={ this.sortByDate }>Date</TableHeadCell>
            <TableHeadCell style={ { cursor: `url(${blackCursor}), auto`, pointerEvents: 'none' } }>Title</TableHeadCell>
            { document.body.clientWidth > 600
              ? <TableHeadCell style={ { cursor: `url(${blackCursor}), auto`, pointerEvents: 'none' } }>Description</TableHeadCell>
              : null
            }
          </TableRow>
        </TableHead>
        <TableBody>
          { this.generateTableRows() }
        </TableBody>
      </Table>
    </React.Fragment>);
  }
}

BlogPostListBody.contextType = DesktopContext;

export { BlogPostListHeader, BlogPostListBody };

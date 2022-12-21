import React, { Component } from 'react';
import {
  Table, TableBody, TableHead, TableRow, TableHeadCell, TableDataCell,
} from 'react95';

import BlogContext from '../../BlogContext';

import configUrls from '../../resources/config-urls.json';
import './Blog.css';

import blogIcon from '../../resources/icons/blog.gif';

class BlogListHeader extends Component {
  render = () => (
    <React.Fragment>
      <img src={ blogIcon } alt='main logo' style={ { height: '15px' } }/> Simone's Blog
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
          blogPostList: data,
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
    const { setBlogPost } = this.context;
    setBlogPost(postId);
  }

  generateTableRows = () => {
    const { blogPostList } = this.state;

    return blogPostList.map((post, index) => {
      const formatDate = new Date(post.published_date).toLocaleDateString('en-GB');
      const formatDescription = post.description.charAt(0).toUpperCase()
        + post.description.slice(1);

      return <TableRow onClick={ () => this.selectPost(post.id) } key={ `row_${index}` }>
        <TableDataCell style={ { textAlign: 'center' } }>{formatDate}</TableDataCell>
        <TableDataCell style={ { width: '200px', fontWeight: 'bold' } }>{post.title}</TableDataCell>
        <TableDataCell><em>{formatDescription}</em></TableDataCell>
      </TableRow>;
    });
  }

  render = () => {
    const { listLoaded } = this.state;

    if (!listLoaded) {
      return <p>Error Loading Blog List!</p>;
    }

    return (<React.Fragment>
      <Table>
        <TableHead>
          <TableRow head>
            <TableHeadCell>Date</TableHeadCell>
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

BlogListBody.contextType = BlogContext;

export { BlogListHeader, BlogListBody };

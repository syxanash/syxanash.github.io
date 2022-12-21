import React, { Component } from 'react';

const BlogContext = React.createContext();

class BlogContextProvider extends Component {
  state = {
    blogPost: {},
  }

  setBlogPost = (blogPost) => {
    this.setState({ blogPost });
  }

  render() {
    const { children } = this.props;
    const { blogPost } = this.state;
    const { setBlogPost } = this;

    return (
      <BlogContext.Provider
        value={ {
          blogPost,
          setBlogPost,
        } }
      >
        {children}
      </BlogContext.Provider>
    );
  }
}

export { BlogContextProvider };

export default BlogContext;

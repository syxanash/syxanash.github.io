import React from 'react';

const BlogContext = React.createContext({ blogPost: undefined, setBlogPost: () => {} });

export default BlogContext;

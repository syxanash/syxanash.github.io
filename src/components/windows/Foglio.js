import React, { Component } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown/with-html';

class FoglioHeader extends Component {
  render = () => (
    <span>
      Foglio
    </span>
  )
}

class FoglioBody extends Component {
  state = {
    textDocument: 'Loading...',
  }

  componentDidMount = () => {
    axios.get('https://simonesmightybackend.herokuapp.com')
      .then((res) => {
        this.setState({
          textDocument: res.data,
        });
      });
  }

  render = () => {
    const { textDocument } = this.state;

    return (<React.Fragment>
      <ReactMarkdown source={ textDocument } escapeHtml={ false } />
    </React.Fragment>);
  }
}

export { FoglioHeader, FoglioBody };

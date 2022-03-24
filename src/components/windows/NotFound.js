import React, { Component } from 'react';

import brokenLinks from '../../resources/broken-links.json';

class NotFoundHeader extends Component {
  render = () => (
    <span>
      File Not Found
    </span>
  )
}

class NotFoundBody extends Component {
  constructor(props) {
    super(props);

    this.intervalId = undefined;

    this.state = {
      replacedLinks: brokenLinks,
      randomColor: '#000000',
      pathName: undefined,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.generateColor, 100);
    const urlPath = this.props.location.pathname.replace(/\//g, '');

    this.setState({ pathName: urlPath });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateColor = () => {
    this.setState({ randomColor: this.getRandomColor() });
  }

  redirectTo404 = () => { window.location.href = '/404.html'; };

  renderRedirectHint = replacedLink => <React.Fragment>
    <h1>BUT WAIT</h1>
    <h2>Looks like the page has been moved <a href={ `/#/${replacedLink}` }>here</a>!</h2>
  </React.Fragment>;

  render = () => {
    const { randomColor, pathName, replacedLinks } = this.state;

    const replacedLink = replacedLinks.find(item => item.from === pathName);

    return (<React.Fragment>
      <h1 style={ { textAlign: 'center', color: randomColor } }>404</h1>

      {
        replacedLink === undefined
          ? this.redirectTo404()
          : this.renderRedirectHint(replacedLink.to)
      }
    </React.Fragment>
    );
  }
}

export { NotFoundHeader, NotFoundBody };

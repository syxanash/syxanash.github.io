import React, { Component } from 'react';

class InfoWindowHeader extends Component {
  render = () => (
    <span>
      About OS
    </span>
  )
}

class InfoWindowBody extends Component {
  render = () => {
    return (<div>
      Hello World
    </div>);
  }
}

export { InfoWindowHeader, InfoWindowBody };

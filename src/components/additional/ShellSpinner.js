import React, { Component } from 'react';

class ShellSpinner extends Component {
  constructor(props) {
    super(props);

    this.spinnerInterval = undefined;

    this.state = {
      index: 0,
      sequence: ['|', '/', '-', '\\'],
    };
  }

  componentDidMount() {
    this.spinnerInterval = setInterval(this.characterUpdater, 60);
  }

  componentWillUnmount() {
    if (this.spinnerInterval) {
      clearInterval(this.spinnerInterval);
    }
  }

  characterUpdater = () => {
    this.setState({ index: this.state.index + 1 });
  }

  render = () => {
    const { sequence, index } = this.state;

    return (<React.Fragment>
      <span>{sequence[index % sequence.length]}</span>
    </React.Fragment>);
  }
}

export default ShellSpinner;

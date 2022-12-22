import React, { Component } from 'react';

const WindowsContext = React.createContext();

class WindowsContextProvider extends Component {
  state = {
    sharedContext: {},
  }

  setSharedContext = (sharedContext) => {
    this.setState({ sharedContext });
  }

  render() {
    const { children } = this.props;
    const { sharedContext } = this.state;
    const { setSharedContext } = this;

    return (
      <WindowsContext.Provider
        value={ {
          sharedContext,
          setSharedContext,
        } }
      >
        {children}
      </WindowsContext.Provider>
    );
  }
}

export { WindowsContextProvider };

export default WindowsContext;

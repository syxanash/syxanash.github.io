import React, { Component } from 'react';

const DesktopContext = React.createContext();

class DesktopContextProvider extends Component {
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
      <DesktopContext.Provider
        value={ {
          sharedContext,
          setSharedContext,
        } }
      >
        {children}
      </DesktopContext.Provider>
    );
  }
}

export { DesktopContextProvider };

export default DesktopContext;

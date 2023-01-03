import React, { Component } from 'react';

const DesktopContext = React.createContext();

class DesktopContextProvider extends Component {
  state = {
    desktopContext: {},
  }

  setDesktopContext = (desktopContext) => {
    this.setState({ desktopContext });
  }

  render() {
    const { children } = this.props;
    const { desktopContext } = this.state;
    const { setDesktopContext } = this;

    return (
      <DesktopContext.Provider
        value={ {
          desktopContext,
          setDesktopContext,
        } }
      >
        {children}
      </DesktopContext.Provider>
    );
  }
}

export { DesktopContextProvider };

export default DesktopContext;

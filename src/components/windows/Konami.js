import React, { Component } from 'react';

class KonamiHeader extends Component {
  render = () => (
    <span>
      Konami Code
    </span>
  )
}

class KonamiBody extends Component {
  render = () => (<div>
      Did you seriously need yet another easter egg on this site?
  </div>);
}

export { KonamiHeader, KonamiBody };

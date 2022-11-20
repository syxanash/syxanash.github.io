import React, { Component } from 'react';
import Helmet from 'react-helmet';

import configUrls from '../../resources/config-urls.json';
import lastUpdatedFile from '../../resources/last-updated.json';
import webDesktops from '../../resources/remote-desktops.json';
import happyPippo from '../../resources/images/happy_pippo.gif';
import ShellSpinner from './ShellSpinner';
import Util from '../Util';

import './BootScreen.css';

function getOSName() {
  let OSName = 'Unknown OS';

  if (navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows';
  if (navigator.appVersion.indexOf('Mac') !== -1) OSName = 'macOS';
  if (navigator.appVersion.indexOf('X11') !== -1) OSName = 'UNIX';
  if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux';
  if (navigator.appVersion.indexOf('Android') !== -1) OSName = 'Linux Botnet Edition';

  return OSName;
}

class CliLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaderText: this.props.loaderCharacter,
    };
  }

  componentDidMount() {
    const { loaded, cliLoaderSpeed } = this.props;
    if (!loaded) {
      this.loaderInterval = setInterval(this.increaseLoader, cliLoaderSpeed);
    }
  }

  componentWillUnmount() {
    if (this.loaderInterval !== undefined) {
      clearInterval(this.loaderInterval);
    }
  }

  reachedMaxLoader = () => this.state.loaderText.length < this.props.loaderBarSize;

  increaseLoader = () => {
    const { loaderText } = this.state;
    const { toggleLoading, loaderCharacter } = this.props;

    if (this.reachedMaxLoader()) {
      this.setState({ loaderText: `${loaderText + loaderCharacter}` });
    } else {
      clearInterval(this.loaderInterval);
      toggleLoading(false);
    }
  }

  render() {
    const { loaded, endText = '', loaderBarSize } = this.props;
    const { loaderText } = this.state;

    return <span>
      { loaded
        ? <span className='console-text-green'>{Array(loaderBarSize).fill(0).map(() => loaderText)}</span>
        : <span className='console-text-green'>{loaderText}</span>
      }
      { this.reachedMaxLoader() && !loaded ? <ShellSpinner /> : endText }
    </span>;
  }
}

class BootScreen extends Component {
  constructor(props) {
    super(props);

    this.bootMessageSpeed = 50;

    const firstBootDone = !!JSON.parse(localStorage.getItem('firstBootDone'));
    const crtEnabled = !!JSON.parse(localStorage.getItem('crt'));

    this.state = {
      bootMessageCounter: 0,
      isLoading: false,
      firstBootDone,
      bootMessages: [
        <div style={ { paddingBottom: '5px' } }>{ Array.from(Array(window.navigator.hardwareConcurrency).keys()).map(index => <span key={ `item_${index}` }><img height='60' alt='kernel mascot' src={ happyPippo } />&nbsp;</span>) }</div>,
        <div>Welcome to the <span className='console-text-blue'>P</span><span className='console-text-pink'>i</span><span className='console-text-yellow'>p</span><span className='console-text-purple'>p</span><span className='console-text-green'>o</span> <span className='console-text-red'>O</span><span className='console-text-yellow'>S</span> experience!</div>,
        <div><br />&nbsp;&nbsp;<span className='console-text-green'>Found SCSI device(s) handled by</span> <span className='console-text-purple'>BusLogic.o.</span></div>,
        <div><span className='console-text-blue'>Scanning for USB/Firewire devices... Done. (that was quick)</span></div>,
        <div><span className='console-text-blue'>Enabling DMA acceleration for:</span> <span className='console-text-purple'>hdc</span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Accessing Pippo OS Kernel at</span> <span className='console-text-purple'>{ configUrls.repositoryUrl.replace('https://', '') }</span><span className='console-text-green'>....</span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Found backend filesystem at</span> <span className='console-text-purple'>{ configUrls.backendUrl.replace('https://', '') }</span><span className='console-text-green'>.</span></div>,
        <div><span className='console-text-blue'>Total memory found : <span className='console-text-yellow'>515124</span> kB</span></div>,
        <div><span className='console-text-blue'>Creating <span className='console-text-yellow'>/ramdisk</span> (dynamic size=404516k) on <span className='console-text-purple'>shared memory</span>...Done.</span></div>,
        <div><span className='console-text-blue'>Creating directories and symlinks on ramdisk...Done</span></div>,
        <div><span className='console-text-blue'>Starting init process.</span></div>,
        <div>INIT version 1.66.6 booting</div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Running Pippo OS Kernel</span> <span className='console-text-yellow'>1.66.6 Build. {lastUpdatedFile.buildNumber.substr(0, 5)}</span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Logical processors found: <span className='console-text-yellow'>{ window.navigator.hardwareConcurrency }</span></span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>ACPI Bios found, activating modules: <span className='console-text-yellow'>ac battery button fan processor thermal</span></span></div>,
        <div><span className='console-text-blue'>Starting </span><span className='console-text-purple'>udev </span><span className='console-text-green'>hot-plug hardware detection... </span><span className='console-text-blue'>Started.</span></div>,
        <div className='hasLoader'>Autoconfiguring devices... <CliLoader loaderCharacter='▓' loaderBarSize={ 30 } cliLoaderSpeed={ 60 } toggleLoading={ this.toggleLoading } loaded={ firstBootDone } endText={ ' Done' } /></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Mouse is <span className='console-text-yellow'>a mouse (with wheel hopefully) at /dev/psaux</span></span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Video is <span className='console-text-yellow'>{`${window.screen.width}x${window.screen.height}`}</span> using {crtEnabled ? 'CRT' : 'LCD'} monitor</span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>User Agent is <span className='console-text-yellow'>{navigator.userAgent}</span></span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Host OS is <span className='console-text-yellow'>{getOSName()}</span></span></div>,
        <div><span className='console-text-blue'>Scanning for Harddisk partitions and creating <span className='console-text-yellow'>/etc/fstab</span>... <span className='console-text-green'>Done.</span></span></div>,
        <div><span className='console-text-green'>Network device <span className='console-text-purple'>eth0</span> detected, DHCP broadcasting for IP. <span className='console-text-blue'>(Backgrounding)</span></span></div>,
        <div><span className='console-text-green'>Loading <span className='console-text-purple'>Web Desktops</span> Network............ <span className='console-text-yellow'>{webDesktops.length} Desktops</span> found.</span></div>,
        <div>INIT: Entering runlevel: 5</div>,
        // eslint-disable-next-line max-len
        <div>-----------------------------------------------------------------------<br />&nbsp;&nbsp;&nbsp;&nbsp;Pippo OS Web Deskt☺p<br />&nbsp;&nbsp;&nbsp;&nbsp;Please stand by a few seconds while the optimal configuration<br />&nbsp;&nbsp;&nbsp;&nbsp;is being determined<br /><br />After this session terminates, the system will automatically shut down.<br />-----------------------------------------------------------------------</div>,
      ],
    };
  }

  componentDidMount() {
    localStorage.setItem('firstBootDone', true);

    const { toggleBootScreen } = this.props;
    const { firstBootDone } = this.state;

    if (!firstBootDone) {
      if (Util.isMobile()) {
        toggleBootScreen(false);
      } else {
        this.bootMessageInterval = setInterval(this.showNextMessage, this.bootMessageSpeed);
      }
    }

    this.scrollToBottom();
  }

  componentWillUnmount() {
    if (this.bootMessageInterval !== undefined) {
      clearInterval(this.bootMessageInterval);
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    document.querySelector('#terminalBottom').scrollIntoView({ behavior: 'smooth' });
  }

  toggleLoading = (loadingState) => {
    this.setState({ isLoading: loadingState });
  }

  showNextMessage = () => {
    const { bootMessageCounter, isLoading, bootMessages } = this.state;
    const { toggleBootScreen } = this.props;

    if (isLoading) {
      return;
    }

    if (bootMessageCounter >= bootMessages.length) {
      toggleBootScreen(false);
    } else if (bootMessages[bootMessageCounter].props.className === 'hasLoader') {
      this.setState({ bootMessageCounter: bootMessageCounter + 1, isLoading: true });
    } else {
      this.setState({ bootMessageCounter: bootMessageCounter + 1 });
    }
  }

  kernelPanic = () => (
    <span>
      <br />
      <div><span className='console-text-red blink'>*** Kernel Panic Web Desktop has been halted ***</span></div>
      [1]+  Exit 1
    </span>
  )

  renderBootMessages = () => {
    const { bootMessageCounter, bootMessages, firstBootDone } = this.state;

    return bootMessages.map((message, index) => <span key={ `key_${index}` }>{message}</span>)
      .slice(0, firstBootDone ? bootMessages.length : bootMessageCounter);
  }

  render() {
    const { hasCrashed } = this.props;

    return (<React.Fragment>
      <Helmet>
        <style>
          {
            `body {
              background: url(data:image/gif;base64,R0lGODlhAQABAIABAAAAAAD/FywAAAAAAQABAAACAkQBADs=);
              background-color: black;
            }
            * {
              overflow: auto;
              cursor: none;
              pointer-events: none;
            }`
          }
        </style>
      </Helmet>
      <div className='terminal-style'>
        {this.renderBootMessages()}
        { hasCrashed && this.kernelPanic() }
        <div id='terminalBottom' />
      </div>
    </React.Fragment>);
  }
}

export default BootScreen;

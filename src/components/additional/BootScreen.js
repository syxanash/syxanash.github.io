import React, { Component } from 'react';
import Helmet from 'react-helmet';

import configUrls from '../../resources/config-urls.json';
import lastUpdatedFile from '../../resources/last-updated.json';
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
  state = {
    loaderText: '▓',
    maxLoaderSize: 40,
  };

  componentDidMount() {
    this.loaderInterval = setInterval(this.increaseLoader, 50);
  }

  reachedMaxLoader = () => this.state.loaderText.length < this.state.maxLoaderSize;

  increaseLoader = () => {
    const { loaderText } = this.state;
    const { toggleLoading } = this.props;

    if (this.reachedMaxLoader()) {
      this.setState({ loaderText: `${loaderText}▓` });
    } else {
      clearInterval(this.loaderInterval);
      toggleLoading(false);
    }
  }

  render() {
    const { loaderText } = this.state;

    return <span>
      <span className='console-text-green'>{loaderText}</span>
      { this.reachedMaxLoader() ? <ShellSpinner /> : ' Done' }
    </span>;
  }
}

class BootScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outputText: '',
      bootMessageCounter: 0,
      isLoading: !Util.isMobile(),
      bootMessages: [
        <div style={ { paddingBottom: '5px' } }>{ Array.from(Array(window.navigator.hardwareConcurrency).keys()).map(index => <span key={ `item_${index}` }><img height='60' alt='kernel mascot' src={ happyPippo } />&nbsp;</span>) }</div>,
        <div>Welcome to the <span className='console-text-blue'>P</span><span className='console-text-pink'>i</span><span className='console-text-yellow'>p</span><span className='console-text-purple'>p</span><span className='console-text-green'>o</span> <span className='console-text-red'>O</span><span className='console-text-yellow'>S</span> experience!<br /></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Found SCSI device(s) handled by</span> <span className='console-text-purple'>BusLogic.o.</span></div>,
        <div><span className='console-text-blue'>Scanning for USB/Firewire devices... Done. (that was quick)</span></div>,
        <div><span className='console-text-blue'>Enabling DMA acceleration for:</span> <span className='console-text-purple'>hdc</span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Accessing Pippo OS Kernel at</span> <span className='console-text-purple'>{ configUrls.repositoryUrl.replace('https://', '') }</span><span className='console-text-green'>....</span></div>,
        <div><span className='console-text-blue'>Total memory found : <span className='console-text-yellow'>515124</span> kB</span></div>,
        <div><span className='console-text-blue'>Creating <span className='console-text-yellow'>/ramdisk</span> (dynamic size=404516k) on <span className='console-text-purple'>shared memory</span>...Done.</span></div>,
        <div><span className='console-text-blue'>Creating directories and symlinks on ramdisk...Done</span></div>,
        <div><span className='console-text-blue'>Starting init process.</span></div>,
        <div>INIT version 1.66.6 booting</div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Running Pippo OS Kernel</span> <span className='console-text-yellow'>1.66.6 Build. {lastUpdatedFile.buildNumber.substr(0, 5)}</span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Logical processors found: <span className='console-text-yellow'>{ window.navigator.hardwareConcurrency }</span></span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>ACPI Bios found, activating modules: <span className='console-text-yellow'>ac battery button fan processor thermal</span></span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>USB found, managed by <span className='console-text-purple'>hotplug</span>: <span className='console-text-yellow'>(Re-)scanning USB devices...
          you never know[001 ] Done.</span></span></div>,
        <div>Autoconfiguring devices... <CliLoader toggleLoading={ this.toggleLoading }/></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Mouse is <span className='console-text-yellow'>a mouse (with wheel hopefully) at /dev/psaux</span></span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Video is <span className='console-text-yellow'>{`${window.screen.width}x${window.screen.height}`}</span></span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>User Agent is <span className='console-text-yellow'>{navigator.userAgent}</span></span></div>,
        <div>&nbsp;&nbsp;<span className='console-text-green'>Host OS is <span className='console-text-yellow'>{getOSName()}</span></span></div>,
        <div><span className='console-text-blue'>Scanning for Harddisk partitions and creating <span className='console-text-yellow'>/etc/fstab</span>... <span className='console-text-green'>Done.</span></span></div>,
        <div>INIT: Entering runlevel: 5</div>,
      ],
    };
  }

  toggleLoading = (loadingState) => {
    this.setState({ isLoading: loadingState });
  }

  renderLoader = () => {
    const { loaderText } = this.state;

    return <span>
      <span className='console-text-green'>{loaderText}</span>
      { this.reachedMaxLoader() ? <ShellSpinner /> : ' Done' }
    </span>;
  }

  messagesEndRef = React.createRef();

  componentDidMount() {
    document.addEventListener('keydown', this.addCtrlC);
    this.bootMessageInterval = setInterval(this.showNextMessage, 50);
    this.scrollToBottom();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.addCtrlC);
    if (this.bootMessageInterval !== undefined) {
      clearInterval(this.bootMessageInterval);
    }

    if (this.loaderInterval !== undefined) {
      clearInterval(this.loaderInterval);
    }
  }

  showNextMessage = () => {
    const { bootMessageCounter, isLoading } = this.state;
    const { showBootScreen } = this.props;

    if (bootMessageCounter >= this.state.bootMessages.length) {
      clearInterval(this.bootMessageInterval);
      showBootScreen(false);
      return;
    }

    if (bootMessageCounter < 16 || !isLoading) {
      this.setState({ bootMessageCounter: bootMessageCounter + 1 });
    }
  }

  addCtrlC = (event) => {
    const { outputText } = this.state;

    if (event.ctrlKey && event.key === 'c') {
      this.setState({ outputText: `${outputText} ^C<br />` });
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEndRef.current !== null) {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  renderBootMessages = () => {
    const { bootMessageCounter } = this.state;

    return this.state.bootMessages.map((message, index) => <span key={ `key_${index}` }>{message}</span>)
      .slice(0, bootMessageCounter);
  }

  kernelPanic = () => {
    const { outputText } = this.state;

    return (
      <span>
        <br />
        <div><span className='console-text-red blink'>*** Orekkietcimdrap Window Manager has been halted ***</span></div>
        [1]+  Exit 1 ^C<br />
        <span dangerouslySetInnerHTML={ { __html: outputText } }></span>
      </span>
    );
  }

  render() {
    const { bootScreen, hasCrashed } = this.props;

    if (!bootScreen) {
      return null;
    }

    return (<React.Fragment>
      <Helmet>
        <style>
          {
            `body {
              background: url(data:image/gif;base64,R0lGODlhAQABAIABAAAAAAD/FywAAAAAAQABAAACAkQBADs=);
              background-color: black;
            }
            * {
              overflow: hidden;
              cursor: none;
              pointer-events: none;
            }`
          }
        </style>
      </Helmet>
      <div className='terminal-style'>
        {this.renderBootMessages()}
        { hasCrashed && this.kernelPanic() }
        <div ref={ this.messagesEndRef } />
      </div>
    </React.Fragment>);
  }
}

export default BootScreen;

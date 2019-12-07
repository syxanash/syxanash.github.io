import React, { Component } from 'react';
import Helmet from 'react-helmet';

import lastUpdatedFile from '../../resources/last-updated.json';

import './StoppedProgram.css';

class Poweroff extends Component {
  state = {
    shouldStopWindowing: false,
    outputText: ''
  };

  messagesEndRef = React.createRef();

  componentDidMount() {
    document.addEventListener('keydown', this.addCtrlC);
    this.scrollToBottom();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.addCtrlC);
  }

  addCtrlC = (event) => {
    const { outputText } = this.state;

    if ((event.ctrlKey && event.key === 'c')
      || (event.ctrlKey && event.key === 'C')) {
      this.setState({ outputText: outputText + '^C<br />' });
    }
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEndRef.current !== null) {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  render() {
    const { outputText } = this.state;
    const { shouldStopWindowing } = this.props;

    if (!shouldStopWindowing) {
      return null;
    }

    return (<React.Fragment>
      <Helmet>
        <style>
          {
            `body {
              background: url(data:image/gif;base64,R0lGODlhAQABAIABAAAAAAD/FywAAAAAAQABAAACAkQBADs=);
            }`
          }
        </style>
      </Helmet>
      <div className='terminal-style'>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Uncompressing cmptrOS... done, booting the kernel.</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Booting Linux on physical CPU 0x0</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Initializing cgroup subsys cpu</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Initializing cgroup subsys cpuacct</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] cmptrOS version {lastUpdatedFile.buildNumber}
        (dc4@dc4-XPS13-9333) #775 PREEMPT Thu Apr 2 18:10:12 BST 2015</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Load BCM2835 MMC driver</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Initializing XFRM netlink socket</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Started LSB: This services starts and
          stops the USB Arbitrator..</div>
        <div>Starting Hostname Service...</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Started Hostname Service.</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Started Login Service.</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Freeing unused kernel memory:
          340K (c079b000 - c07f0000)</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] usb 1-1: New USB device found,
          idVendor=0424, idProduct=9512</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] usb 1-1: New USB device strings:
          Mfr=0, Product=0, SerialNumber=0</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] hub 1-1:1.0: USB hub found</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] hub 1-1:1.0: 3 ports detected</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] usb 1-1.1: new high-speed USB
          device number 3 using dwc_otg</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] usb 1-1.1: New USB device found,
          idVendor=0424, idProduct=ec00</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] usb 1-1.1: New USB device strings:
          Mfr=0, Product=0, SerialNumber=0</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Started Locale Service.</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Started Authorization Manager.</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Started Modem Manager.</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] User-agent detected: {navigator.userAgent}</div>
        <div>[&nbsp;&nbsp;OK&nbsp;&nbsp;] Started cmptrOS ver.
          "{lastUpdatedFile.buildNumber.substr(0, 5)}"</div>
          <span dangerouslySetInnerHTML={ { __html: outputText } }></span>
        <div ref={this.messagesEndRef} />
      </div>
    </React.Fragment>);
  }
}

export default Poweroff;

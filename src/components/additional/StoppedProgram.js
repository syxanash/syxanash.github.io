import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Typist from 'react-typist';

import lastUpdatedFile from '../../resources/last-updated.json';

import './StoppedProgram.css';

const backgroundImages = require.context('../../resources/images/backgrounds', true);

class Poweroff extends Component {
  state = {
    shouldStopWindowing: false,
  };

  render() {
    const { shouldStopWindowing } = this.props;

    if (!shouldStopWindowing) {
      return null;
    }

    return (<React.Fragment>
      <Helmet>
        <style>
          {
            `body {
              background: url(${backgroundImages('./h4x0r_green.gif')});
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
        <Typist avgTypingDelay={ 1 } cursor={ { show: false } }>
          <div>^C</div>
          <div>[&nbsp;&nbsp;712.450538] Code: 30 fa 58 80 4c 39 2c 08 75 04 0f 0b eb fe 48
            c7 c0 40 fa 58 80 eb 1f 65 48 8b 04 25 10 00 00 00 66 f7 80 44 e0 ff ff 00 ff
            75 04 0f 0b eb fe 48 c7 c0 30 fa 58 80 48 8d 1c 08 48 83 3b 00 74 04</div>
          <div>[&nbsp;&nbsp;712.450538] RIP  [ffffffff8037fa9c] xen_spin_wait+0x90/0x139</div>
          <div>[&nbsp;&nbsp;712.450538]  RSP [ffffffff80595e38]</div>
          <div>[&nbsp;&nbsp;712.450538] ---[ end trace 73e60cdc01c1f34c ]---</div>
          <div>[&nbsp;&nbsp;712.450538] Kernel panic - not syncing: Aiee, killing interrupt handler! <span className='blink-text'>█</span></div>
        </Typist>
      </div>
    </React.Fragment>);
  }
}

export default Poweroff;

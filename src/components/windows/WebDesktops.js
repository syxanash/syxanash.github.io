import React, { Component } from 'react';
import _ from 'lodash';

import {
  Cutout, Toolbar, Button, Fieldset, Checkbox,
} from 'react95';

import Util from '../Util';

import './WebDesktops.css';
import remoteDesktops from '../../resources/remote-desktops.json';

import mainWindowIcon from '../../resources/icons/webdesktops.gif';
import hyperlinkIcon from '../../resources/icons/hyperlink.gif';
import infoIcon from '../../resources/icons/info.png';
import gearIcon from '../../resources/icons/gear.gif';

import blackCursor from '../../resources/icons/pointers/cursor.gif';

const webDesktopsIcons = require.context('../../resources/icons/webdesktops', true);

class WebDesktopsHeader extends Component {
  render = () => (
    <React.Fragment>
      <img src={ mainWindowIcon } alt='remote desktops icon' style={ { height: '15px' } }/> Web Desktops
    </React.Fragment>
  )
}

class WebDesktopsBody extends Component {
  constructor(props) {
    super(props);

    this.boldTimeout = undefined;

    this.state = {
      desktopsList: _.shuffle(remoteDesktops),
      sitesExplored: 0,
      boldNumber: false,
      filterView: false,
      filterMap: [
        {
          filename: 'windows.gif',
          selected: true,
          description: 'Windows 9x',
        },
        {
          filename: 'windows_new.png',
          selected: true,
          description: 'XP/Vista/7/10',
        },
        {
          filename: 'windows11.gif',
          selected: true,
          description: 'Windows 11',
        },
        {
          filename: 'mac.gif',
          selected: true,
          description: 'Classic Mac OS',
        },
        {
          filename: 'mac_new.gif',
          selected: true,
          description: 'Mac OS X',
        },
        {
          filename: 'linux.gif',
          selected: true,
          description: 'GNU/Linux',
        },
        {
          filename: 'unix.gif',
          selected: true,
          description: 'Unix/Solaris',
        },
        {
          filename: 'amiga.gif',
          selected: true,
          description: 'Amiga',
        },
        {
          filename: 'atari.gif',
          selected: true,
          description: 'Atari ST',
        },
        {
          filename: 'next.gif',
          selected: true,
          description: 'NeXTSTEP',
        },
        {
          filename: 'IBM.gif',
          selected: true,
          description: 'IBM (OS/2)',
        },
        {
          filename: 'obscure.gif',
          selected: true,
          description: 'Unknown OS',
        },
      ],
    };
  }

  componentDidMount() {
    const { openWindow } = this.props;

    if (localStorage.getItem('webdesktopsExplored') === null) {
      localStorage.setItem('webdesktopsExplored', JSON.stringify([]));
    } else {
      let listExplored = [];
      const previousListExplored = JSON.parse(localStorage.getItem('webdesktopsExplored'));
      const webDesktopsList = this.state.desktopsList.map(website => website.url);
      const websitesRemoved = _.difference(previousListExplored, webDesktopsList);

      listExplored = previousListExplored;

      if (websitesRemoved.length > 0) {
        listExplored = _.difference(previousListExplored, websitesRemoved);
        localStorage.setItem('webdesktopsExplored', JSON.stringify(listExplored));
      }

      this.setState({ sitesExplored: listExplored.length });
    }

    if (localStorage.getItem('showInfoFieldset') === null) {
      localStorage.setItem('showInfoFieldset', false);
      openWindow('webdesktopsAbout');
    }
  }

  componentWillUnmount = () => {
    const { closeWindow, isWindowOpened } = this.props;
    if (isWindowOpened('webdesktopsAbout')) {
      closeWindow('webdesktopsAbout');
    }

    if (this.boldTimeout !== undefined) {
      clearTimeout(this.boldTimeout);
    }
  }

  registerWebsite = (url) => {
    const listExplored = JSON.parse(localStorage.getItem('webdesktopsExplored'));
    if (!listExplored.includes(url)) {
      listExplored.push(url);
      localStorage.setItem('webdesktopsExplored', JSON.stringify(listExplored));

      this.setState({ sitesExplored: listExplored.length });
    }
  }

  renderSingleComputerIcon = ({ url, name, icon }) => (
    <a className='website-link' href={ url } target='_blank' onClick={ () => this.registerWebsite(url) } rel='noopener noreferrer'>
      <div className='computer-icon'>
        <img style={ { height: '65px' } } src={ webDesktopsIcons(`./${icon}`) } alt='single desktop icon' />
      </div>
      <div className='website-favicon' style={ { left: icon === 'windows_new.png' ? '7px' : '1px', bottom: icon === 'windows11.gif' ? '57px' : '' } }>
        <img style={ { height: '25px' } } src={ `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}` } alt='computer icon' />
      </div>
      <div className='website-name'>
        <span>{ name }</span>
      </div>
    </a>
  )

  getFilteredDesktops = () => {
    const { filterMap, desktopsList } = this.state;

    const selectedTypes = filterMap.filter(({ selected }) => selected)
      .map(({ filename }) => filename);
    return desktopsList.filter(desktop => selectedTypes.includes(desktop.icon));
  }

  openRandomURL = () => {
    const { sitesExplored } = this.state;

    const filteredDesktops = this.getFilteredDesktops();

    const linksListUrls = filteredDesktops.map(({ url }) => url);
    let finalList = linksListUrls;

    const listExplored = JSON.parse(localStorage.getItem('webdesktopsExplored'));

    if (sitesExplored < linksListUrls.length) {
      finalList = _.difference(linksListUrls, listExplored);
    }

    const randomLink = _.sample(finalList);

    this.registerWebsite(randomLink);
    Util.openWebsiteURL({ url: randomLink });
  }

  renderAllIcons = () => {
    const filteredDesktops = this.getFilteredDesktops();

    if (filteredDesktops.length === 0) {
      return <h1 style={ { textAlign: 'center' } }>Adjust the filter to display more websites...</h1>;
    }

    const desktopIcons = filteredDesktops.map(website => (
      <div
        className='single-icon'
        key={ `icon_${website.name}` }
      >
        { this.renderSingleComputerIcon(website) }
      </div>
    ));

    return desktopIcons;
  }

  setBoldNumber = () => {
    this.setState({ boldNumber: false });
  }

  setBoldTimeout = () => {
    if (this.boldTimeout !== undefined) {
      clearTimeout(this.boldTimeout);
    }

    this.boldTimeout = setTimeout(this.setBoldNumber, 500);
  }

  handleCheckboxChange = (e) => {
    const { filterMap } = this.state;

    const osTypeSelected = e.target.value;
    const mapIndex = filterMap.findIndex(({ filename }) => filename === osTypeSelected);

    const currentValue = filterMap[mapIndex].selected;
    const newFilterMap = _.set(filterMap, `[${mapIndex}].selected`, !currentValue);

    this.setBoldTimeout();

    this.setState({
      boldNumber: true,
      filterMap: newFilterMap,
    });
  }

  checkAll = (check) => {
    const { filterMap } = this.state;
    const newFilterMap = filterMap.map(osType => ({
      ...osType,
      selected: check,
    }));

    this.setBoldTimeout();

    this.setState({ filterMap: newFilterMap, boldNumber: true });
  }

  renderCheckboxes = () => {
    const { filterMap } = this.state;

    return filterMap.map(osType => (
      <Checkbox
        key={ `checkbox_${osType.filename}` }
        value={ osType.filename }
        label={ osType.description }
        checked={ osType.selected }
        onChange={ this.handleCheckboxChange }
        style={ { marginRight: '5px', marginLeft: '5px', cursor: `url(${blackCursor}), auto` } }
      />
    ));
  };

  renderFilterView = () => {
    const { filterView, boldNumber } = this.state;

    const totalDesktops = this.getFilteredDesktops().length;

    return (
      <div style={ { paddingBottom: '10px', display: filterView ? 'block' : 'none', fontStyle: 'bold' } }>
        <Fieldset label={ <span>Filter by {boldNumber ? <b>[{totalDesktops}]</b> : `[${totalDesktops}]` }</span> } style={ { marginTop: '15px' } }>
          <div className='checkbox-container'>
            { this.renderCheckboxes() }
          </div>
          <div className='filter-buttons-container'>
            <div className='filter-buttons'>
              <Button style={ { width: '110px' } } size={ 'md' } onClick={ () => this.checkAll(true) }>Check All</Button>
              <Button style={ { width: '110px', marginRight: '15px' } } size={ 'md' } onClick={ () => this.checkAll(false) }>Uncheck All</Button>
              <Button style={ { width: '110px' } } size={ 'md' } onClick={ this.toggleFilterView }>Ok</Button>
            </div>
          </div>
        </Fieldset>
      </div>
    );
  }

  toggleFilterView = () => {
    this.setState({ filterView: !this.state.filterView });
  }

  render = () => {
    const { openWindow } = this.props;
    const {
      desktopsList, sitesExplored, filterView, filterMap,
    } = this.state;

    const exploredPercentage = Math.floor((sitesExplored * 100) / desktopsList.length);
    const osTypesSelected = filterMap.filter(({ selected }) => selected).length;

    return (
      <React.Fragment>
        <div className='toolbar-container'>
          <Toolbar style={ { display: 'flex', flexWrap: 'wrap' } }>
            <Button onClick={ this.openRandomURL } variant="menu" disabled={ osTypesSelected === 0 }><img src={ hyperlinkIcon } alt='hyperlink' style={ { paddingRight: '4px' } } />Random</Button>
            <Button onClick={ this.toggleFilterView } active={ filterView } variant="menu"><img src={ gearIcon } alt='hyperlink' style={ { paddingRight: '7px' } } />Filter</Button>
            <Button onClick={ () => openWindow('webdesktopsAbout', true) } variant="menu"><img src={ infoIcon } alt='info' style={ { paddingRight: '4px' } } />About</Button>
          </Toolbar>
        </div>
        { this.renderFilterView() }
        <Cutout className='awesome-gui-cutoutbg'>
          <div className='awesome-gui-icons-container'>
            {this.renderAllIcons()}
          </div>
        </Cutout>
        <Cutout style={ { backgroundColor: '#c7c7df', marginBottom: '3px' } }>
          <div className='progress-content' style={ { width: `${exploredPercentage}%` } }></div>
          <div className='screen-footer'>
            <span>{sitesExplored} of {desktopsList.length} sites visited</span>
          </div>
        </Cutout>
      </React.Fragment>
    );
  }
}

export { WebDesktopsHeader, WebDesktopsBody };

import React, { Component } from 'react';
import _ from 'lodash';

import {
  Cutout, Toolbar, Button, Fieldset, Checkbox,
} from 'react95';

import Util from '../Util';

import './WebDesktops.css';
import remoteDesktops from '../../resources/remote-desktops.json';

import mainWindowIcon from '../../resources/icons/webdesktops.gif';
import mobileWarningIcon from '../../resources/icons/mobilewarning.gif';
import hyperlinkIcon from '../../resources/icons/hyperlink.gif';
import infoIcon from '../../resources/icons/info.png';
import sourceIcon from '../../resources/icons/script.png';
import pizzaSlice from '../../resources/icons/slice.gif';
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
  state = {
    desktopsList: _.shuffle(remoteDesktops),
    sitesExplored: 0,
    showHelp: localStorage.getItem('showInfoFieldset') === null,
    filterView: false,
    filterMap: [
      {
        key: 'windows',
        selected: true,
        description: 'Windows 9x',
      },
      {
        key: 'windows_new',
        selected: true,
        description: 'Windows (XP/Vista/7/10)',
      },
      {
        key: 'windows11',
        selected: true,
        description: 'Windows 11',
      },
      {
        key: 'mac',
        selected: true,
        description: 'Classic Mac OS',
      },
      {
        key: 'mac_new',
        selected: true,
        description: 'Mac OS X',
      },
      {
        key: 'linux',
        selected: true,
        description: 'GNU/Linux',
      },
      {
        key: 'unix',
        selected: true,
        description: 'Unix/Solaris',
      },
      {
        key: 'amiga',
        selected: true,
        description: 'Amiga',
      },
      {
        key: 'next',
        selected: true,
        description: 'NeXTSTEP',
      },
      {
        key: 'IBM',
        selected: true,
        description: 'IBM (OS/2)',
      },
      {
        key: 'obscure',
        selected: true,
        description: 'Unknown OS',
      },
    ],
  }

  componentDidMount() {
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
        <img style={ { height: '65px' } } src={ webDesktopsIcons(`./${icon}.gif`) } alt='single desktop icon' />
      </div>
      <div className='website-favicon' style={ { left: icon === 'windows_new' ? '7px' : '1px', bottom: icon === 'windows11' ? '57px' : '' } }>
        <img style={ { height: '25px' } } src={ `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}` } alt='computer icon' />
      </div>
      <div className='website-name'>
        <span>{ name }</span>
      </div>
    </a>
  )

  getFilteredDesktops = () => {
    const { filterMap, desktopsList } = this.state;

    const selectedTypes = filterMap.filter(({ selected }) => selected).map(({ key }) => key);
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

  renderMobileMessage = () => {
    if (!Util.isMobile()) {
      return null;
    }

    return (
      <Fieldset>
        <img src={ mobileWarningIcon } alt='mobile warning icon' style={ { float: 'left', paddingRight: '15px' } } />
        While some of these websites offer great mobile layouts I recommend
        exploring this list using a <b>desktop browser</b> (duh!)
      </Fieldset>
    );
  }

  handleCheckboxChange = (e) => {
    const { filterMap } = this.state;

    const osTypeSelected = e.target.value;
    const mapIndex = filterMap.findIndex(({ key }) => key === osTypeSelected);

    const currentValue = filterMap[mapIndex].selected;
    const newFilterMap = _.set(filterMap, `[${mapIndex}].selected`, !currentValue);

    this.setState({
      filterMap: newFilterMap,
    });
  }

  checkAll = (check) => {
    const { filterMap } = this.state;
    const newFilterMap = filterMap.map(osType => ({
      ...osType,
      selected: check,
    }));

    this.setState({ filterMap: newFilterMap });
  }

  renderCheckBoxes = () => {
    const { filterMap } = this.state;

    return filterMap.map(osType => (
      <Checkbox
        key={ `checkbox_${osType.key}` }
        value={ osType.key }
        label={ osType.description }
        checked={ osType.selected }
        onChange={ this.handleCheckboxChange }
        style={ { marginRight: '5px', marginLeft: '5px', cursor: `url(${blackCursor}), auto` } }
      />
    ));
  };

  renderFilterView = () => {
    const { filterView } = this.state;

    const totalDesktops = this.getFilteredDesktops().length;

    return (
      <div style={ { paddingBottom: '10px', display: filterView ? 'block' : 'none', fontStyle: 'bold' } }>
        <Fieldset label={ `Filter by [${totalDesktops}] ` } style={ { marginTop: '15px' } }>
          <div className='checkbox-container'>
            { this.renderCheckBoxes() }
          </div>
          <div className='filter-buttons-container'>
            <div className='filter-buttons'>
              <Button size={ 'md' } onClick={ () => this.checkAll(true) }>Check All</Button>
              <Button size={ 'md' } onClick={ () => this.checkAll(false) } style={ { marginRight: '15px' } }>Uncheck All</Button>
              <Button size={ 'md' } onClick={ this.toggleFilterView } style={ { width: '100px' } }>Ok</Button>
            </div>
          </div>
        </Fieldset>
      </div>
    );
  }

  toggleFilterView = () => {
    this.setState({ filterView: !this.state.filterView });
  }

  toggleShowHelp = () => {
    const firstDisplay = JSON.parse(localStorage.getItem('showInfoFieldset')) === null;
    if (firstDisplay) {
      localStorage.setItem('showInfoFieldset', false);
    }
    this.setState({ showHelp: !this.state.showHelp });
  }

  render = () => {
    const {
      desktopsList, sitesExplored, showHelp, filterView, filterMap,
    } = this.state;

    const exploredPercentage = Math.floor((sitesExplored * 100) / desktopsList.length);
    const osTypesSelected = filterMap.filter(({ selected }) => selected).length;

    return (
      <React.Fragment>
        <div className='toolbar-container'>
          <Toolbar style={ { display: 'flex', flexWrap: 'wrap' } }>
            <Button onClick={ this.openRandomURL } variant="menu" disabled={ osTypesSelected === 0 }><img src={ hyperlinkIcon } alt='hyperlink' style={ { paddingRight: '4px' } } />Random</Button>
            <Button onClick={ this.toggleFilterView } active={ filterView } variant="menu"><img src={ gearIcon } alt='hyperlink' style={ { paddingRight: '7px' } } />Filter</Button>
            <Button onClick={ () => Util.openWebsiteURL({ url: 'https://github.com/syxanash/awesome-web-desktops' }) } variant="menu"><img src={ sourceIcon } alt='hyperlink' style={ { paddingRight: '4px', height: '17px' } } />Contribute</Button>
            <Button onClick={ () => Util.openWebsiteURL({ url: 'https://ko-fi.com/syxanash' }) } variant="menu"><img src={ pizzaSlice } alt='hyperlink' style={ { paddingRight: '7px' } } />Donate</Button>
            <Button onClick={ this.toggleShowHelp } active={ showHelp } variant="menu"><img src={ infoIcon } alt='info' style={ { paddingRight: '4px' } } />About</Button>
          </Toolbar>
        </div>
        <div style={ { paddingBottom: '10px', display: showHelp ? 'block' : 'none', fontStyle: 'bold' } }>
          <Fieldset>
            This is a hand curated directory of web apps, portfolios and experiments
            that mimic the appearance and functionality of
            desktop operating systems, these are commonly known as <b>Web Desktops</b>
          </Fieldset>
          { this.renderMobileMessage() }
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

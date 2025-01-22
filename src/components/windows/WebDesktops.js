import React, { Component } from 'react';
import _ from 'lodash';

import {
  Cutout, Toolbar, Button, Fieldset, Checkbox, Radio, Tooltip, TextField,
} from 'react95';

import Util from '../Util';

import './WebDesktops.css';
import remoteDesktops from '../../resources/remote-desktops.json';

import mainWindowIcon from '../../resources/icons/webdesktops.gif';
import hyperlinkIcon from '../../resources/icons/hyperlink.gif';
import infoIcon from '../../resources/icons/info.png';
import gearIcon from '../../resources/icons/gear.gif';
import categoriesIcon from '../../resources/icons/categories.png';
import starIcon from '../../resources/icons/star.png';
import searchIcon from '../../resources/icons/search.png';

import blackCursor from '../../resources/icons/pointers/cursor.gif';

const webDesktopsIcons = require.context('../../resources/icons/webdesktops', true);

class WebDesktopsHeader extends Component {
  render = () => (
    <React.Fragment>
      <img src={ mainWindowIcon } alt='remote desktops icon' style={ { height: '15px' } }/> Web Desktops
    </React.Fragment>
  )
}

const SORT_OPTIONS = { NEWEST: 0, OLDEST: 1, RANDOM: 2 };
const SOURCE_FILTER = { OPEN: 0, PRIVATE: 1, ALL: 3 };

class WebDesktopsBody extends Component {
  constructor(props) {
    super(props);

    this.overViewTimeout = undefined;

    this.state = {
      desktopsList: _.shuffle(remoteDesktops),
      sitesExplored: 0,
      overviewNumber: false,
      sortSelected: SORT_OPTIONS.RANDOM,
      sourceFilter: SOURCE_FILTER.ALL,
      filterView: false,
      searchView: false,
      searchInput: '',
      categoriesView: false,
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
      categoriesMap: [
        {
          code: 'top',
          selected: false,
          label: <div style={ { display: 'flex', alignItems: 'center' } }><img src={ starIcon } alt='star' />Top Picks</div>,
          tooltip: <span>{'A selection of notable'}<br />{'projects and standout designs'}</span>,
          button: {
            bgColor: '#256D85',
            color: 'white',
          },
        },
        {
          code: 'uncanny',
          selected: false,
          label: 'Uncanny',
          tooltip: 'So good they\'d fool my grandma!',
          button: {
            bgColor: '#118AB2',
            color: 'white',
          },
        },
        {
          code: 'personal',
          selected: false,
          label: 'Personal',
          tooltip: 'Portfolios and personal sites',
          button: {
            bgColor: '#06D6A0',
            color: 'black',
          },
        },
        {
          code: 'poc',
          selected: false,
          label: 'Concepts',
          tooltip: <span>{'Proof of concepts'}<br />{'and unconventional'}</span>,
          button: {
            bgColor: '#FFD166',
            color: 'black',
          },
        },
        {
          code: 'game',
          selected: false,
          label: 'Web games',
          tooltip: <span>{'Games that use'}<br />{'the desktop metaphor'}</span>,
          button: {
            bgColor: '#FF9650',
            color: 'black',
          },
        },
        {
          code: 'tool',
          selected: false,
          label: 'Utilities',
          tooltip: 'Tools and useful web apps',
          button: {
            bgColor: '#FF87C1',
            color: 'black',
          },
        },
        {
          code: 'misc',
          selected: false,
          label: 'Misc',
          tooltip: 'Tech showcase & miscellaneous',
          button: {
            bgColor: '#EF476F',
            color: 'black',
          },
        },
        {
          code: 'all',
          selected: true,
          label: 'All',
          tooltip: 'Every single one of them',
          button: {
            bgColor: '#9A9CC2',
            color: 'black',
          },
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

    if (this.overViewTimeout !== undefined) {
      clearTimeout(this.overViewTimeout);
    }
  }

  displayUserNotes = (name, notes) => {
    if (notes !== '') {
      // eslint-disable-next-line no-alert
      alert(`User notes for ${name}:\n${notes}`);
    }
  }

  interceptOpenLink = ({ name, url, notes }) => {
    this.displayUserNotes(name, notes);
    this.registerWebsite(url);
  }

  registerWebsite = (url) => {
    const { openWindow } = this.props;

    const listExplored = JSON.parse(localStorage.getItem('webdesktopsExplored'));
    if (!listExplored.includes(url)) {
      listExplored.push(url);
      localStorage.setItem('webdesktopsExplored', JSON.stringify(listExplored));

      if (listExplored.length === remoteDesktops.length) {
        openWindow('webdesktopsAlert', true);
      }

      this.setState({ sitesExplored: listExplored.length });
    }
  }

  renderSingleComputerIcon = website => (
    <a className='website-link' href={ website.url } target='_blank' onClick={ () => this.interceptOpenLink(website) } rel='noopener noreferrer'>
      <div className='computer-icon'>
        <img style={ { height: '65px' } } src={ webDesktopsIcons(`./${website.icon}`) } alt='single desktop icon' />
      </div>
      <div className='website-favicon' style={ { left: website.icon === 'windows_new.png' ? '7px' : '1px', bottom: website.icon === 'windows11.gif' ? '57px' : '', transform: website.icon === 'windows_new.png' ? 'rotate(10deg)' : '' } }>
        <img style={ { height: '25px' } } src={ `https://s2.googleusercontent.com/s2/favicons?domain_url=${website.url}` } alt='computer icon' />
      </div>
      <div className='website-name'>
        <span>{ website.name }</span>
      </div>
    </a>
  )

  getFilteredDesktops = () => {
    const {
      filterMap, desktopsList, sourceFilter, categoriesMap, searchInput,
    } = this.state;

    const selectedTypes = filterMap.filter(({ selected }) => selected)
      .map(({ filename }) => filename);
    const filteredByOSDesktops = desktopsList.filter(
      desktop => selectedTypes.includes(desktop.icon),
    );

    const filteredBySource = filteredByOSDesktops.filter((desktop) => {
      if (sourceFilter === SOURCE_FILTER.OPEN) {
        return desktop.source !== '';
      }
      if (sourceFilter === SOURCE_FILTER.PRIVATE) {
        return desktop.source === '';
      }
      return true;
    });

    const selectedCategory = categoriesMap.find(categ => categ.selected);

    const filteredByCategory = filteredBySource.filter(
      desktop => desktop.tags.includes(selectedCategory.code),
    );

    const finalList = selectedCategory.code === 'all'
      ? filteredBySource
      : filteredByCategory;

    const filteredBySearch = finalList.filter((desktop) => {
      const desktopName = desktop.name.toLowerCase();
      const desktopUrl = desktop.url.toLowerCase();

      const normalizedInput = searchInput.toLowerCase();

      return desktopName.includes(normalizedInput) || desktopUrl.includes(normalizedInput);
    });

    if (searchInput === '') {
      return finalList;
    }

    return filteredBySearch;
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
    const randomWebsiteObj = filteredDesktops.find(website => website.url === randomLink);

    Util.openWebsiteURL({ url: randomLink });
    this.interceptOpenLink(randomWebsiteObj);
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

  setOverviewNumber = () => {
    this.setState({ overviewNumber: false });
  }

  setNumberOverviewTimeout = () => {
    this.setState({ overviewNumber: true });

    if (this.overViewTimeout !== undefined) {
      clearTimeout(this.overViewTimeout);
    }

    this.overViewTimeout = setTimeout(this.setOverviewNumber, 3000);
  }

  handleCheckboxChange = (e) => {
    const { filterMap } = this.state;

    const osTypeSelected = e.target.value;
    const mapIndex = filterMap.findIndex(({ filename }) => filename === osTypeSelected);

    const currentValue = filterMap[mapIndex].selected;
    const newFilterMap = _.set(filterMap, `[${mapIndex}].selected`, !currentValue);

    this.setNumberOverviewTimeout();

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

    this.setNumberOverviewTimeout();

    this.setState({ filterMap: newFilterMap });
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

  filterBySourceCode = (filter) => {
    this.setNumberOverviewTimeout();
    this.setState({ sourceFilter: filter });
  }

  changeSort = (e) => {
    const newSortSelected = Number(e.target.value);

    switch (newSortSelected) {
    case SORT_OPTIONS.NEWEST:
      this.setState({
        desktopsList: remoteDesktops.toReversed(),
      });
      break;
    case SORT_OPTIONS.OLDEST:
      this.setState({
        desktopsList: remoteDesktops,
      });
      break;
    default:
      this.setState({ desktopsList: _.shuffle(remoteDesktops) });
    }

    this.setState({ sortSelected: newSortSelected });
  }

  changeCategory = (index) => {
    const { categoriesMap } = this.state;

    const updatedCategoriesMap = categoriesMap.map((category, i) => ({
      ...category,
      selected: i === index,
    }));

    this.setNumberOverviewTimeout();
    this.setState({ categoriesMap: updatedCategoriesMap });
  }

  renderRadioButtons = () => {
    const { sortSelected } = this.state;
    return Object.keys(SORT_OPTIONS).map(
      (sortValue, index) => <Radio
        key={ `radio_btn_${index}` }
        style={ { cursor: `url(${blackCursor}), auto`, fontSize: '18px' } }
        checked={ sortSelected === index }
        label={ _.capitalize(sortValue) }
        value={ index }
        onChange={ this.changeSort }
      />,
    );
  }

  renderCategoriesButtons = () => {
    const { categoriesMap } = this.state;
    return categoriesMap.map(
      (category, index) => <Tooltip key={ `radio_btn_${index}` } text={ category.tooltip } delay={ 500 }>
        <Button
          style={ {
            backgroundColor: category.button.bgColor,
            color: category.selected ? 'black' : category.button.color,
            borderRadius: '20px',
            width: '130px',
            height: '40px',
            display: 'flex',
          } }
          value={ category.code }
          active={ category.selected }
          onClick={ () => this.changeCategory(index) }
        >{category.label}</Button>
      </Tooltip>,
    );
  }

  changeSearchInput = (e) => {
    this.setNumberOverviewTimeout();

    this.setState({ searchInput: e.target.value });
  }

  clearSearchInput = () => {
    this.setNumberOverviewTimeout();

    this.setState({ searchInput: '' });
  }

  renderCategoriesView = () => (<div className='main-categories-view'>
    <div className='categories-buttons-container'>
      { this.renderCategoriesButtons() }
    </div>
  </div>);

  renderSearchView = () => {
    const { searchInput } = this.state;
    return (<div className='main-search-view'>
      <div style={ { paddingBottom: '10px' } }>
        <span>Website name:</span>
      </div>
      <div style={ { display: 'flex', alignItems: 'center' } }>
        <TextField
          value={ searchInput }
          shadow={ false }
          onChange={ this.changeSearchInput }
          className="search-input"
          style={ { marginRight: '10px' } }
        />
        <Button style={ { width: '110px' } } onClick={ this.clearSearchInput }>Clear</Button>
      </div>
    </div>);
  }

  renderFilterView = () => {
    const { sourceFilter } = this.state;

    return (
      <div style={ { paddingBottom: '10px', fontStyle: 'bold' } }>
        <Fieldset label="Sort by" style={ { marginTop: '15px' } }>
          <div className='radio-container'>
            { this.renderRadioButtons() }
          </div>
        </Fieldset>
        <Fieldset label="Filter by source code" style={ { marginTop: '15px' } }>
          <div className='source-buttons-cut-out'>
            <div className='source-buttons'>
              <Button className='left-button' fullWidth size={ 'md' } active={ sourceFilter === SOURCE_FILTER.OPEN } onClick={ () => this.filterBySourceCode(SOURCE_FILTER.OPEN) }>Open Source</Button>
            </div>
            <div className='source-buttons'>
              <Button fullWidth size={ 'md' } active={ sourceFilter === SOURCE_FILTER.PRIVATE } onClick={ () => this.filterBySourceCode(SOURCE_FILTER.PRIVATE) }>Private</Button>
            </div>
            <div className='source-buttons'>
              <Button className='right-button' fullWidth size={ 'md' } active={ sourceFilter === SOURCE_FILTER.ALL } onClick={ () => this.filterBySourceCode(SOURCE_FILTER.ALL) }>All</Button>
            </div>
          </div>
        </Fieldset>
        <Fieldset label="Filter by interface" style={ { marginTop: '15px' } }>
          <div className='checkbox-container'>
            { this.renderCheckboxes() }
          </div>
          <div className='filter-buttons-container'>
            <div className='filter-buttons'>
              <Button style={ { width: '110px' } } size={ 'md' } onClick={ () => this.checkAll(false) }>Uncheck All</Button>
              <Button style={ { width: '110px' } } size={ 'md' } onClick={ () => this.checkAll(true) }>Check All</Button>
            </div>
          </div>
        </Fieldset>
      </div>
    );
  }

  renderDeskNumberOverview = () => {
    const totalDesktops = remoteDesktops.length;
    const filteredDesktops = this.getFilteredDesktops().length;

    return (<div className='desktop-number-overview'>
      <span>Websites selected: <b>{filteredDesktops}</b>/{totalDesktops}</span>
    </div>);
  }

  toggleFilterView = () => {
    this.setState({
      filterView: !this.state.filterView,
      categoriesView: false,
      searchView: false,
    });
  }

  toggleCategoriesView = () => {
    this.setState({
      categoriesView: !this.state.categoriesView,
      filterView: false,
      searchView: false,
    });
  }

  toggleSearchView = () => {
    this.setState({
      searchView: !this.state.searchView,
      filterView: false,
      categoriesView: false,
    });
  }

  renderTopMenu = () => {
    const { filterView, categoriesView, searchView } = this.state;

    return (<div>
      { filterView && this.renderFilterView() }
      { categoriesView && this.renderCategoriesView() }
      { searchView && this.renderSearchView() }
      <div style={ { display: (filterView || categoriesView || searchView) ? 'block' : 'none', textAlign: 'center', paddingBottom: '10px' } }>
        <Button
          size='sm'
          style={ { width: '50px' } }
          onClick={ () => {
            if (filterView) this.toggleFilterView();
            if (categoriesView) this.toggleCategoriesView();
            if (searchView) this.toggleSearchView();
          } }
        >
          <span>▲</span>
        </Button>
      </div>
    </div>);
  }

  render = () => {
    const { openWindow } = this.props;
    const {
      desktopsList, sitesExplored, filterView, filterMap, searchView, searchInput,
      categoriesView, categoriesMap, sourceFilter, overviewNumber,
    } = this.state;

    const categoriesSelected = categoriesMap.some(({ code, selected }) => code !== 'all' && selected);
    const filteredList = filterMap.some(({ selected }) => !selected)
      || sourceFilter !== SOURCE_FILTER.ALL;

    const exploredPercentage = Math.floor((sitesExplored * 100) / desktopsList.length);
    const filteredDesktops = this.getFilteredDesktops().length;

    return (
      <React.Fragment>
        <div className='toolbar-container'>
          <Toolbar style={ { display: 'flex', flexWrap: 'wrap' } }>
            <Button onClick={ this.openRandomURL } variant="menu" disabled={ filteredDesktops === 0 }>
              <img src={ hyperlinkIcon } alt='hyperlink' style={ { paddingRight: '4px' } } />Random
            </Button>
            <Button onClick={ this.toggleCategoriesView } active={ categoriesView } variant="menu" style={ {
              fontWeight: categoriesSelected ? 'bold' : 'normal', width: '140px', display: 'flex', alignItems: 'center',
            } }>
              <div style={ { display: 'flex', alignItems: 'center' } }>
                <img src={ categoriesIcon } alt='hyperlink' style={ { paddingRight: '7px' } } />
                <span>Categories</span>
              </div>
            </Button>
            <Button onClick={ this.toggleSearchView } active={ searchView } variant="menu" style={ { fontWeight: searchInput === '' ? 'normal' : 'bold', width: '110px' } }>
              <img src={ searchIcon } alt='hyperlink' style={ { paddingRight: '7px', height: '25px' } } />Search
            </Button>
            <Button onClick={ this.toggleFilterView } active={ filterView } variant="menu" style={ { fontWeight: filteredList ? 'bold' : 'normal', width: '100px' } }>
              <img src={ gearIcon } alt='hyperlink' style={ { paddingRight: '7px' } } />Filter
            </Button>
            <Button onClick={ () => openWindow('webdesktopsAbout', true) } variant="menu">
              <img src={ infoIcon } alt='info' style={ { paddingRight: '4px' } } />About
            </Button>
          </Toolbar>
        </div>
        { this.renderTopMenu() }
        <Cutout className='awesome-gui-cutoutbg'>
          <div className='awesome-gui-icons-container'>
            {this.renderAllIcons()}
          </div>
          { overviewNumber ? this.renderDeskNumberOverview() : null }
        </Cutout>
        <Cutout style={ { backgroundColor: '#c7c7df', marginBottom: '3px' } }>
          <div className='progress-content' style={ { width: `${exploredPercentage}%` } }></div>
          <div className='screen-footer'>
            <span>{sitesExplored} of {desktopsList.length} websites visited</span>
          </div>
        </Cutout>
      </React.Fragment>
    );
  }
}

export { WebDesktopsHeader, WebDesktopsBody };

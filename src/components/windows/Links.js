import React, { Component } from 'react';
import {
  Button, Cutout, Fieldset,
} from 'react95';
import _ from 'lodash';

import 'animate.css';

import linksIcon from '../../resources/icons/links.gif';
import spinningGlobe from '../../resources/images/globe.gif';

import './Links.css';
import websiteLinks from '../../resources/website-links.json';
import hyperlinkIcon from '../../resources/icons/hyperlink.gif';

class LinksHeader extends Component {
  render = () => (
    <React.Fragment>
      <img src={ linksIcon } alt='Links' style={ { height: '15px' } }/> Links
    </React.Fragment>
  )
}

class LinksBody extends Component {
  state = {
    linksObject: websiteLinks,
    activeTab: 0,
    globeImgLoaded: false,
  }

  openRandomLink = () => {
    const { linksObject } = this.state;

    const linksList = _.flatten(linksObject.map(linkItem => linkItem.links));
    const randomLink = _.sample(linksList);

    window.open(randomLink.url, '_blank');
  }

  handleChangeTab = value => this.setState({ activeTab: value });

  generateTabs = () => {
    const { linksObject, activeTab } = this.state;

    const tabsComponent = linksObject
      .map((linkItem, index) => (<Button
        style={ { margin: '5px', marginRight: '10px' } }
        key={ `tab_${index}` }
        active={ index === activeTab }
        onClick={ () => {
          this.handleChangeTab(index);
        } }>
        {linkItem.section}
      </Button>));

    return (<div style={ { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' } }>
      {tabsComponent}
      <Button style={ { margin: '5px', marginRight: '10px' } } className='animated tada delay-1s' onClick={ this.openRandomLink }><img src={ hyperlinkIcon } alt='hyperlink' style={ { paddingRight: '4px' } } /><b>Open a random website</b></Button>
    </div>);
  }

  generateTabBody = () => {
    const { linksObject, activeTab } = this.state;

    const linksList = linksObject[activeTab].links;

    const LinksListComponent = <ul>{linksList.map((link, index) => {
      const descriptionContent = link.description
        ? <span style={ { fontWeight: 'bold' } } dangerouslySetInnerHTML={ { __html: `${link.description}` } }></span>
        : '';

      return (<li className='link-style' key={ `${link.url}_${index}` } style={ { listStyleImage: `url('https://s2.googleusercontent.com/s2/favicons?domain_url=${link.url}')` } }>
        <a href={ link.url } target='_blank' rel='noopener noreferrer'>{ link.url.replace(/(^\w+:|^)\/\//, '') }</a> { descriptionContent }
      </li>);
    })}</ul>;

    return (
      <Cutout>
        <div className='link-list'>{LinksListComponent}</div>
      </Cutout>
    );
  }

  render = () => {
    const { globeImgLoaded } = this.state;

    return (<div style={ { marginTop: '-10px' } }>
      <Cutout className='globe-container'>
        <img
          src={ spinningGlobe }
          alt='spinning globe'
          onLoad={ () => { this.setState({ globeImgLoaded: true }); } }
          style={ { display: `${globeImgLoaded ? 'block' : 'none'}` } }
          className={ `globe-picture ${globeImgLoaded ? 'animated fadeIn' : ''}` }
        />
      </Cutout>
      <Fieldset>
        This is my <b>Linklog</b> which contains articles, cool websites and people's
        personal pages that I found inspiring or somehow creative.
      </Fieldset>
      <div style={ { paddingBottom: '15px', paddingTop: '10px', textAlign: 'center' } }>
        {this.generateTabs()}
      </div>
      <div>
        {this.generateTabBody()}
      </div>
    </div>);
  }
}

export { LinksHeader, LinksBody };

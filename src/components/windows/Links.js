import React, { Component } from 'react';
import { Button, Cutout } from 'react95';
import _ from 'lodash';

import 'animate.css';

import linksIcon from '../../resources/icons/links.gif';
import spinningGlobe from '../../resources/images/globe.gif';

import './Links.css';
import websiteLinks from '../../resources/website-links.json';

class LinksHeader extends Component {
  render = () => (
    <span>
      <img src={ linksIcon } alt='Links' style={ { height: '15px' } }/> Links
    </span>
  )
}

class LinksBody extends Component {
  state = {
    linksList: _.shuffle(websiteLinks),
  }

  openRandomLink = () => {
    const { linksList } = this.state;

    const randomLink = Object.values(linksList)[
      Math.floor(Math.random() * Object.values(linksList).length)
    ];

    window.open(randomLink.url, '_blank');
  }

  render = () => {
    const { linksList } = this.state;

    const LinksListComponent = <ul>{linksList.map((link, index) => {
      const descriptionContent = link.description
        ? <span style={ { fontWeight: 'bold' } } dangerouslySetInnerHTML={ { __html: `(${link.description})` } }></span>
        : '';

      return (<li className='link-style' key={ `${link.url}_${index}` }>
        <a href={ link.url } target='_blank' rel='noopener noreferrer'>{ link.url }</a> { descriptionContent }
      </li>);
    })}</ul>;

    return (<div className='links-window'>
      <Cutout className='globe-container'><img src={ spinningGlobe } alt='spinning globe' className='globe-picture' /></Cutout>
      <span>
        This is a collection of some links to articles, cool websites and people's
        personal pages that I found inspiring or somehow creative.
      </span>
      <p>
        <i>(Beware some of these links do <b>not</b> provide <b>https</b>)</i>
      </p>
      <div style={ { paddingBottom: '15px', textAlign: 'center' } }>
        <Button className='animated tada delay-1s' onClick={ this.openRandomLink }>Open a random website</Button>
      </div>
      <Cutout><div className='link-list'>{LinksListComponent}</div></Cutout>
      <p>only quality links ;)</p>
    </div>);
  }
}

export { LinksHeader, LinksBody };

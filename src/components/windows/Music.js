import React, { Component } from 'react';
import {
  Anchor, Tooltip,
} from 'react95';

import musicIcon from '../../resources/icons/music.gif';

import spotifyIcon from '../../resources/icons/social/spotify.gif';
import bandcampIcon from '../../resources/icons/social/bandcamp.gif';
import soundcloudIcon from '../../resources/icons/social/soundcloud.gif';
import headPlayer from '../../resources/images/head.gif';

import discoveredMusic from '../../resources/recently-discovered-music.json';

import './Music.css';

class MusicHeader extends Component {
  render = () => (
    <span>
      <img src={ musicIcon } alt='icon' style={ { height: '15px' } }/> Music
    </span>
  )
}

class TheMightyMarquee extends React.Component {
  render() {
    // eslint-disable-next-line
    return (<marquee><span className='music-track-text '>{this.props.text}</span></marquee>);
  }
}

class MusicBody extends Component {
  touchEar = () => {
    const message = 'DO NOT touch my ears, they are very sensitive!';

    // eslint-disable-next-line no-alert
    alert(message);
  }

  render = () => (<div className='music-window-container'>
    <div className='head-container'>
      <div className='handle'><img src={ headPlayer } alt='media player skin' style={ { pointerEvents: 'none', userSelect: 'none' } }/></div>
      <div className='head-left-ear' onClick={ this.touchEar } />
      <div className='head-right-ear' onClick={ this.touchEar } />
      <div className='player-head'>
        <span style={ { color: 'white' } }>Social links:</span>
        <div className='social-button-container'>
          <Tooltip text='Spotify' delay={ 500 }>
            <Anchor
              href='https://open.spotify.com/user/1192532714?si=_Z9kVqrCRJWOaJlWAE-hqA'
              target='_blank'
            >
              <img src={ spotifyIcon } className='social-button' alt="Spotify link"/>
            </Anchor>
          </Tooltip>
          <Tooltip text='Bancamp' delay={ 500 }>
            <Anchor
              href='https://bandcamp.com/syxa'
              target='_blank'
            >
              <img src={ bandcampIcon } className='social-button' alt="Bandcamp link"/>
            </Anchor>
          </Tooltip>
          <Tooltip text='SoundCloud' delay={ 500 }>
            <Anchor
              href='https://soundcloud.com/someonewholovesmymind'
              target='_blank'
            >
              <img src={ soundcloudIcon } className='social-button' alt="SoundCloud link"/>
            </Anchor>
          </Tooltip>
        </div>
        <span style={ { color: 'white', paddingBottom: '10px' } }>Recently discovered:</span>
        <Anchor
          href={ discoveredMusic.url }
          target='_blank'
        >
          <TheMightyMarquee text={ discoveredMusic.name } />
        </Anchor>
      </div>
    </div>
  </div>)
}

export { MusicHeader, MusicBody };

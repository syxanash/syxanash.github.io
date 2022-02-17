import React, { Component } from 'react';
import {
  Anchor, Tooltip, Button,
} from 'react95';

import Marquee from 'react-fast-marquee';
import $ from 'jquery';

import musicIcon from '../../resources/icons/music.gif';

import spotifyIcon from '../../resources/icons/social/spotify.gif';
import bandcampIcon from '../../resources/icons/social/bandcamp.gif';
import soundcloudIcon from '../../resources/icons/social/soundcloud.gif';

import discoveredMusic from '../../resources/recently-discovered-music.json';

import './Music.css';

class MusicHeader extends Component {
  render = () => (
    <span>
      <img src={ musicIcon } alt='icon' style={ { height: '15px' } }/> Music
    </span>
  )
}

class MusicBody extends Component {
  touchEar = () => {
    const message = 'DO NOT touch my ears, they are very sensitive!';

    // eslint-disable-next-line no-alert
    alert(message);
  }

  constructor(props) {
    super(props);

    this.state = {
      trackIndex: 0,
    };
  }

  previousTrack = () => {
    const { trackIndex } = this.state;
    if (trackIndex + 1 < discoveredMusic.length) {
      this.setState({ trackIndex: trackIndex + 1 });

      $('#discoveredHeader')
        .addClass('animated flash faster')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $('#discoveredHeader').removeClass();
        });
    }
  }

  recentTrack = () => {
    const { trackIndex } = this.state;
    if (trackIndex - 1 >= 0) {
      this.setState({ trackIndex: trackIndex - 1 });

      $('#discoveredHeader')
        .addClass('animated flash faster')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $('#discoveredHeader').removeClass();
        });
    }
  }

  render = () => {
    const { trackIndex } = this.state;

    return (<div className='music-window-container'>
      <div className='head-container'>
        <div className='head-overlay handle' />
        <div className='head-left-ear' onClick={ this.touchEar } />
        <div className='head-right-ear' onClick={ this.touchEar } />
        <div className='head-buttons-container'>
          <Button style={ { borderRadius: '25px' } } size={ 'md' } disabled={ trackIndex - 1 < 0 } onClick={ this.recentTrack } square>◀</Button>
          &nbsp;
          <Button style={ { borderRadius: '25px' } } size={ 'md' } disabled={ trackIndex + 1 >= discoveredMusic.length } onClick={ this.previousTrack } square>▶</Button>
        </div>
        <div className='player-head'>
          <span id='discoveredHeader' style={ { color: 'white', paddingBottom: '10px' } }>Recently discovered:</span>
          <div className='recently-discovered'>
            <Anchor
              href={ discoveredMusic[trackIndex].url }
              target='_blank'
              style={ { textDecoration: 'none' } }
            >
              <Marquee
                speed={ 100 }
                delay={ 0.5 }
                gradient={ false }
              >
                <span className='music-track-text'>{ discoveredMusic[trackIndex].name }&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </Marquee>
            </Anchor>
          </div>
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
            <Tooltip text='Bandcamp' delay={ 500 }>
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
        </div>
      </div>
    </div>);
  }
}

export { MusicHeader, MusicBody };

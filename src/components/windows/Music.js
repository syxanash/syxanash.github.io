import React, { Component } from 'react';
import {
  Button, Cutout, Anchor,
} from 'react95';

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

class TheMightyMarquee extends React.Component {
  render() {
    // eslint-disable-next-line
    return (<marquee><span className='music-track-text '>{this.props.text}</span></marquee>);
  }
}

class MusicBody extends Component {
  render = () => (<div>
    <div style={ { paddingBottom: '20px' } }>
      I usually save my music on the following online services.
    </div>
    <Cutout className='music-cutout'>
      <div className='music-button'>
        <Anchor
          href='https://open.spotify.com/user/1192532714?si=_Z9kVqrCRJWOaJlWAE-hqA'
          target='_blank'
          style={ { color: '#000000', textDecoration: 'none' } }
        >
          <Button fullWidth size='lg' style={ { height: '95px', display: 'inline-block', backgroundColor: '#fffee8' } }>
            <img src={ spotifyIcon } className='icon' alt="Spotify link"/>
            <figcaption className='icon-caption'>Spotify</figcaption>
          </Button>
        </Anchor>
      </div>
      <div className='music-button'>
        <Anchor
          href='https://bandcamp.com/syxa'
          target='_blank'
          style={ { color: '#000000', textDecoration: 'none' } }
        >
          <Button fullWidth size='lg' style={ { height: '95px', display: 'inline-block', backgroundColor: '#fffee8' } }>
            <img src={ bandcampIcon } className='icon' alt="Bandcamp link"/>
            <figcaption className='icon-caption'>Bandcamp</figcaption>
          </Button>
        </Anchor>
      </div>
      <div className='music-button'>
        <Anchor
          href='https://soundcloud.com/someonewholovesmymind'
          target='_blank'
          style={ { color: '#000000', textDecoration: 'none' } }
        >
          <Button fullWidth size='lg' style={ { height: '95px', display: 'inline-block', backgroundColor: '#fffee8' } }>
            <img src={ soundcloudIcon } className='icon' alt="Bandcamp link"/>
            <figcaption className='icon-caption'>SoundCloud</figcaption>
          </Button>
        </Anchor>
      </div>
    </Cutout>
    <div style={ { paddingBottom: '15px', paddingTop: '15px' } }>
      Recently discovered music:
    </div>
    <div style={ { paddingBottom: '10px' } }>
      <Anchor
        href={ discoveredMusic.url }
        target='_blank'
      >
        <Cutout style={ { backgroundColor: 'black' } }>
          <TheMightyMarquee text={ discoveredMusic.name } />
        </Cutout>
      </Anchor>
    </div>
  </div>)
}

export { MusicHeader, MusicBody };

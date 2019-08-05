import React, { Component } from 'react';

import {
  Divider, Cutout, Avatar, Button,
} from 'react95';

import alanTuringAvatar from '../../resources/images/avatars/turing.jpg';
import khwarizmiAvatar from '../../resources/images/avatars/mrkhwarizmi.jpg';
import mitnickAvatar from '../../resources/images/avatars/mitnick.jpg';
import babbageAvatar from '../../resources/images/avatars/babbage.jpg';
import adaAvatar from '../../resources/images/avatars/ada.jpg';
import hopperAvatar from '../../resources/images/avatars/hopper.jpg';

import guestbookIcon from '../../resources/icons/guestbook.png';
import './Guestbook.css';

class GuestbookHeader extends Component {
  render = () => (
    <span>
      <img src={ guestbookIcon } alt='guestbook icon' style={ { height: '15px' } }/> Guestbook
    </span>
  )
}

class GuestbookBody extends Component {
  state = {
    randomColor: '#000000',
    intervalId: undefined,
  }

  showCommentAlert = () => {
    // eslint-disable-next-line no-alert
    alert('Due to ongoing spam and flames activity, the comment section has been temporarily disabled!');
  }

  // eslint-disable-next-line arrow-body-style
  render = () => {
    return (<div>
      <div style={ { textAlign: 'center' } }>
        If you enjoyed visiting this website leave a comment down here!
      </div>
      <div style={ { padding: '15px', textAlign: 'center' } }>
        <Button onClick={ this.showCommentAlert }>Add a comment</Button>
      </div>
      <Cutout className='guestbook-window'>
        <div className='single-comment-container'>
          <div style={ { display: 'flex', justifyContent: 'space-between' } }>
            <div>
              <div className='comment-name'>Alan Mathison Turing</div>
              <div className='comment-date'>on 2018/07/08</div>
            </div>
            <span className='avatar-container'>
              <Avatar src={ alanTuringAvatar } style={ { height: '60px', width: '60px' } } />
            </span>
          </div>
          <div className='comment-item'>
            This site is truly a masterpiece of our times,
            makes me very proud for having invented the first computer!
          </div>
        </div>
        <Divider />
        <div className='single-comment-container'>
          <div style={ { display: 'flex', justifyContent: 'space-between' } }>
            <div>
              <div className='comment-name'>Charles Babbage</div>
              <div className='comment-date'>on 2018/07/08</div>
            </div>
            <span className='avatar-container'>
              <Avatar src={ babbageAvatar } style={ { height: '60px', width: '60px' } } />
            </span>
          </div>
          <div>
            Yeah great website! but hey Turing the hell you talking about?
            I made the first computer!
          </div>
        </div>
        <Divider />
        <div className='single-comment-container'>
          <div style={ { display: 'flex', justifyContent: 'space-between' } }>
            <div>
              <div className='comment-name'>Ada Lovelace</div>
              <div className='comment-date'>on 2018/07/08</div>
            </div>
            <span className='avatar-container'>
              <Avatar src={ adaAvatar } style={ { height: '60px', width: '60px' } } />
            </span>
          </div>
          <div>
            Boys without me you'd still be coding with fecking gears and screwdrivers!
          </div>
        </div>
        <Divider />
        <div className='single-comment-container'>
          <div style={ { display: 'flex', justifyContent: 'space-between' } }>
            <div>
              <div className='comment-name'>Condor</div>
              <div className='comment-date'>on 2018/07/08</div>
            </div>
            <span className='avatar-container'>
              <Avatar src={ mitnickAvatar } style={ { height: '60px', width: '60px' } } />
            </span>
          </div>
          <div>
            { '<script>alert(\'document.cookie\');</script>' }
          </div>
        </div>
        <Divider />
        <div className='single-comment-container'>
          <div style={ { display: 'flex', justifyContent: 'space-between' } }>
            <div>
              <div className='comment-name'>Admiral Grace Hopper</div>
              <div className='comment-date'>on 2018/07/08</div>
            </div>
            <span className='avatar-container'>
              <Avatar src={ hopperAvatar } style={ { height: '60px', width: '60px' } } />
            </span>
          </div>
          <div>
            Well said my dear Ada! very nice website, but comment section is poisoning...
          </div>
        </div>
        <Divider />
        <div className='single-comment-container'>
          <div style={ { display: 'flex', justifyContent: 'space-between' } }>
            <div>
              <div className='comment-name'>Muhammad al-Khwarizmi</div>
              <div className='comment-date'>on 2018/07/08</div>
            </div>
            <span className='avatar-container'>
              <Avatar src={ khwarizmiAvatar } style={ { height: '60px', width: '60px' } } />
            </span>
          </div>
          <div>
            Ya'll owe me a pint actually...
            Congrats Simone, this website is just awesome, keep up the good work, I love you mate!
          </div>
        </div>
      </Cutout>
    </div>
    );
  }
}

export { GuestbookHeader, GuestbookBody };

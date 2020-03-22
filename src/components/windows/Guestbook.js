import React, { Component } from 'react';

import {
  Divider, Cutout, Avatar, Button,
} from 'react95';

import timAvatar from '../../resources/images/avatars/tim.jpg';
import alanTuringAvatar from '../../resources/images/avatars/turing.jpg';
import khwarizmiAvatar from '../../resources/images/avatars/mrkhwarizmi.jpg';
import mitnickAvatar from '../../resources/images/avatars/mitnick.jpg';
import babbageAvatar from '../../resources/images/avatars/babbage.jpg';
import adaAvatar from '../../resources/images/avatars/ada.jpg';
import hopperAvatar from '../../resources/images/avatars/hopper.jpg';
import dennisAvatar from '../../resources/images/avatars/dennis.jpg';
import hamiltonAvatar from '../../resources/images/avatars/hamilton.jpg';
import perottoAvatar from '../../resources/images/avatars/perotto.jpg';
import jobsAvatar from '../../resources/images/avatars/jobs.png';

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
  showCommentAlert = () => {
    // eslint-disable-next-line no-alert
    alert('Due to ongoing spam and flame activity the comment section has been temporarily disabled!');
  }

  render = () => (<div>
    <div style={ { textAlign: 'center' } }>
      If you enjoyed visiting this website leave a comment down here!
    </div>
    <div style={ { padding: '15px', textAlign: 'center' } }>
      <Button onClick={ this.showCommentAlert }>Add a comment</Button>
    </div>
    <Cutout className='guestbook-window'>
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ timAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Sir Tim Berners-Lee</div>
            <div className='comment-date'>on 1991/07/03</div>
          </div>
        </div>
        <div>
          WOW a website which looks like a computer! <b><a href='https://github.com/syxanash/awesome-gui-websites' target='_blank' rel='noopener noreferrer' style={ { textDecoration: 'none', color: 'black' } }>no one</a></b> ever thought about it,
          this is so cool, welcome to the world wide web my friend!
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ alanTuringAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Alan Mathison Turing</div>
            <div className='comment-date'>on 1944/19/01</div>
          </div>
        </div>
        <div className='comment-item'>
          This site is truly a masterpiece of our times,
          makes me very proud for having invented the first computer!
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ babbageAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Charles Babbage</div>
            <div className='comment-date'>on 1852/02/10</div>
          </div>
        </div>
        <div>
          Yeah great website! Hey Turing boy you for real??
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ adaAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Ada Lovelace</div>
            <div className='comment-date'>on 1852/03/10</div>
          </div>
        </div>
        <div>
          Folks without me you'd still be coding with fecking gears and screwdrivers!
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ hopperAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Admiral Grace Hopper</div>
            <div className='comment-date'>on 1951/31/03</div>
          </div>
        </div>
        <div>
          Well said my dear Ada! very nice website, but comment section is poison...
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ jobsAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Steve Jobs</div>
            <div className='comment-date'>on 1984/23/01</div>
          </div>
        </div>
        <div>
          all these plebs arguing but the truth is: I made the
          first "personal" computer, I CHANGED THE WORLD!
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ perottoAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Pier Giorgio Perotto</div>
            <div className='comment-date'>on 2000/01/01</div>
          </div>
        </div>
        <div>
          Steve go back to your dad's garage! <span role="img" aria-label="wink face">😉</span>
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ hamiltonAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Margaret Hamilton</div>
            <div className='comment-date'>on 2016/23/11</div>
          </div>
        </div>
        <div>
          Jesus, glad I didn’t use JavaScript back in the 60s...
          this website is slow and bloated, build/ folder is like 60MB!!!
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ khwarizmiAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Muhammad al-Khwarizmi</div>
            <div className='comment-date'>on <i>sometime in 820 AD</i></div>
          </div>
        </div>
        <div>
          Ya'll owe me a pint actually...
          This website is just awesome, keep up the good work, I love you mate!
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ dennisAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Dennis Ritchie</div>
            <div className='comment-date'>on 2011/11/10</div>
          </div>
        </div>
        <div>
          { ':(){ :|: & };: ' } ⬅️ run this in your terminal lol
        </div>
      </div>
      <Divider />
      <div className='single-comment-container'>
        <div style={ { display: 'flex' } }>
          <span className='avatar-container'>
            <Avatar src={ mitnickAvatar } style={ { height: '60px', width: '60px' } } />
          </span>
          <div className='comment-author-name'>
            <div className='comment-name'>Condor</div>
            <div className='comment-date'>on 1995/14/02</div>
          </div>
        </div>
        <div>
          { '<script>alert(\'document.cookie\');</script>' }
        </div>
      </div>
    </Cutout>
    <div className='bottom-text'>
      <span role="img" aria-label="warning" className='blink-text'>⚠️</span> I'm still investigating on the authenticity of some comments. <span role="img" aria-label="warning" className='blink-text'>⚠️</span>
    </div>
  </div>
  )
}

export { GuestbookHeader, GuestbookBody };

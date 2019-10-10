import React, { Component } from 'react';
import moment from 'moment';

import aboutIcon from '../../resources/icons/about.gif';
import avatarPicture from '../../resources/images/myavatar.gif';

import './About.css';

class AboutHeader extends Component {
  render = () => (
    <span>
      <img src={ aboutIcon } alt='about' style={ { height: '15px' } }/> About
    </span>
  )
}

class AboutBody extends Component {
  state = {
    timePassed: '',
  };

  getDateDiff = () => {
    const now = moment();
    const then = moment([2017, 5, 15]);
    const years = now.diff(then, 'year');

    const timePassed = `${years} years`;
    this.setState({ timePassed });
  }

  componentDidMount() {
    this.getDateDiff();
  }

  render = () => {
    const { timePassed } = this.state;
    return (
      <div className='text-container'>
        <img src={ avatarPicture } alt='my avatar' className='avatar-picture' />
        <span style={ { fontWeight: 'bold', fontSize: '1.5em' } }>Hello there!</span>
        <p>
          I'm <b>Simone</b>, pronounced like `<i>see-mow-nay</i>`<br />
          on the internet my nick name is usually <b>syx</b>.
        </p>
        <p>
          I was born in <a href='https://en.wikipedia.org/wiki/Taranto' target='_blank' rel='noopener noreferrer'>Taranto (Italy)</a> <span role="img" aria-label="italian-flag">🇮🇹</span> where I lived most of my life. I moved to Dublin Ireland <span role="img" aria-label="irish-flag">🇮🇪</span> { timePassed } ago where I currently work as a full stack software engineer.
          I have a degree in computer science from <a href='https://www.uniba.it/ricerca/dipartimenti/informatica/dipartimento-di-informatica' target='_blank' rel='noopener noreferrer'>University of Bari</a>.
        </p>
        <p>
          In my free time I like to practice inline skating and roam around
          the streets of Dublin on my <a href='https://www.rollerblade.com/products/metroblade/' target='_blank' rel='noopener noreferrer'>Rollerblades</a>.
          This urban sport typically involves dodging tourists on Grafton Street
          and jumping over chippers meal boxes on Friday night. <span role="img" aria-label="awannaghèn">🤙</span>
        </p>
        <p>
          I'm passionate about retrocomputing,
          when I get the chance I collect old computers from the
          80s and I'm really fond of skeuomorphic design of 90s and early 2000s UIs.
        </p>
        <p>
          As many human beings out there I listen to a <i>_lot_</i> of music,
          my favorite types are Electronic, Jazz, Rap, Hip-hop. I do care about my
          playlists <span role="img" aria-label="music-note">🎶</span> so make
          sure to checkout my Spotify profile on your way back!
        </p>
      </div>
    );
  }
}

export { AboutHeader, AboutBody };

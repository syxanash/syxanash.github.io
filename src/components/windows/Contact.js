import React, { Component } from 'react';
import { Button, Anchor, Tooltip } from 'react95';

import contactIcon from '../../resources/icons/contact.gif';

import githubIcon from '../../resources/icons/social/github.gif';
import dribbbleIcon from '../../resources/icons/social/dribbble.gif';
import twitterIcon from '../../resources/icons/social/twitter.gif';
import emailIcon from '../../resources/icons/social/email.gif';
import pgpIcon from '../../resources/icons/social/pgp.png';
import linkedinIcon from '../../resources/icons/social/linkedin.gif';

import pgpKey from '../../resources/misc/public.asc';

import './Contact.css';

class ContactHeader extends Component {
  render = () => (
    <span>
      <img src={ contactIcon } alt='icon' style={ { height: '15px' } }/> Contact
    </span>
  )
}

class ContactBody extends Component {
  render = () => (<div className='contact-window'>
    <span>
      Please feel free to drop me an email or stalk me on the web.
    </span>
    <div className='social-icons-container'>
      <Tooltip text='Email'>
        <Anchor href='mailto:si.marzulli@gmail.com?subject=Hi%20Mr.%20Awesome%20Dude' target='_blank'>
          <Button className='social-icon' size='lg' square>
            <img src={ emailIcon } style={ { height: '40px' } } alt="email"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='PGP Public Key'>
        <Anchor href={ pgpKey } target='_blank'>
          <Button className='social-icon' size='lg' square>
            <img src={ pgpIcon } style={ { height: '40px' } } alt="pgp"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='GitHub'>
        <Anchor href='https://github.com/syxanash' target='_blank'>
          <Button className='social-icon' size='lg' square>
            <img src={ githubIcon } style={ { height: '40px' } } alt="github"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='Twitter'>
        <Anchor href='https://twitter.com/syxanash' target='_blank'>
          <Button className='social-icon' size='lg' square>
            <img src={ twitterIcon } style={ { height: '30px' } } alt="twitter"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='Tinder?'>
        <Anchor href='https://www.linkedin.com/in/simone-marzulli-318b4a81' target='_blank'>
          <Button className='social-icon' size='lg' square>
            <img src={ linkedinIcon } style={ { height: '40px' } } alt="linkedin"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='Dribbble'>
        <Anchor href='https://dribbble.com/syx' target='_blank'>
          <Button className='social-icon' size='lg' square>
            <img src={ dribbbleIcon } style={ { height: '40px' } } alt="dribbble"/>
          </Button>
        </Anchor>
      </Tooltip>
    </div>
    <p>
      If you want to keep me updated with the latest tinfoil hat news use my <a target="_blank" rel="noopener noreferrer" href='http://futureboy.us/pgp.html'>PGP</a> public key.
    </p>
  </div>)
}

export { ContactHeader, ContactBody };

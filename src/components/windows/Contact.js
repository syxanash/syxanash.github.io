import React, { Component } from 'react';
import {
  Button, Anchor, Tooltip, Fieldset, Cutout,
} from 'react95';

import configUrls from '../../resources/config-urls.json';

import contactIcon from '../../resources/icons/contact.gif';

import githubIcon from '../../resources/icons/social/github.gif';
import dribbbleIcon from '../../resources/icons/social/dribbble.gif';
import webringIcon from '../../resources/icons/social/webring.gif';
import twitterIcon from '../../resources/icons/social/twitter.gif';
import emailIcon from '../../resources/icons/social/email.gif';
import pgpIcon from '../../resources/icons/social/pgp.gif';
import linkedinIcon from '../../resources/icons/social/linkedin.gif';
import questionIcon from '../../resources/icons/question-mark.gif';

import pgpKey from '../../resources/misc/public.asc';

import './Contact.css';

class ContactHeader extends Component {
  render = () => (
    <span className='window-title-text'>
      <img src={ contactIcon } alt='icon' style={ { height: '15px' } }/> Contact
    </span>
  )
}

class ContactBody extends Component {
  render = () => (<React.Fragment>
    <span>
      Please feel free to drop me an email or stalk me on the web.
    </span>
    <div className='social-icons-container'>
      <Tooltip text='Email' delay={ 100 }>
        <Anchor href={ `mailto:${configUrls.email}?subject=Hi%20Mr.%20Awesome%20Dude` } target='_blank'>
          <Button className='social-icon' style={ { width: '60px', height: '60px', backgroundColor: 'white' } } size='lg' square>
            <img src={ emailIcon } style={ { height: '40px' } } alt="email"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='PGP Public Key' delay={ 100 }>
        <Anchor href={ pgpKey } target='_blank'>
          <Button className='social-icon' style={ { width: '60px', height: '60px', backgroundColor: 'white' } } size='lg' square>
            <img src={ pgpIcon } style={ { height: '40px' } } alt="pgp"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='GitHub' delay={ 100 }>
        <Anchor href='https://github.com/syxanash' target='_blank'>
          <Button className='social-icon' style={ { width: '60px', height: '60px', backgroundColor: 'white' } } size='lg' square>
            <img src={ githubIcon } style={ { height: '40px' } } alt="github"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='Twitter' delay={ 100 }>
        <Anchor href='https://twitter.com/syxanash' target='_blank'>
          <Button className='social-icon' style={ { width: '60px', height: '60px', backgroundColor: 'white' } } size='lg' square>
            <img src={ twitterIcon } style={ { height: '30px' } } alt="twitter"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='Tinder?' delay={ 100 }>
        <Anchor href='https://www.linkedin.com/in/simone-marzulli-318b4a81' target='_blank'>
          <Button className='social-icon' style={ { width: '60px', height: '60px', backgroundColor: 'white' } } size='lg' square>
            <img src={ linkedinIcon } style={ { height: '40px' } } alt="linkedin"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='Dribbble' delay={ 100 }>
        <Anchor href='https://dribbble.com/syx' target='_blank'>
          <Button className='social-icon' style={ { width: '60px', height: '60px', backgroundColor: 'white' } } size='lg' square>
            <img src={ dribbbleIcon } style={ { height: '40px' } } alt="dribbble"/>
          </Button>
        </Anchor>
      </Tooltip>
      <Tooltip text='Webring' delay={ 100 }>
        <Anchor href='https://webring.xxiivv.com' target='_blank'>
          <Button className='social-icon' style={ { width: '60px', height: '60px', backgroundColor: 'white' } } size='lg' square>
            <img src={ webringIcon } style={ { height: '40px' } } alt="webring"/>
          </Button>
        </Anchor>
      </Tooltip>
    </div>
    <div className='contact-info'>
      <Fieldset label={ <img src={ questionIcon } style={ { height: '20px' } } alt="question mark"/> }>
        <div style={ { paddingBottom: '15px' } }>
          <span>
            You can also contact me using my public key listed above. To know more about PGP click <a target="_blank" rel="noopener noreferrer" href='https://futureboy.us/pgp.html'>here</a>.
            This is the fingerprint:
          </span>
        </div>
        <Cutout className='fingerprint-cutout' style={ { padding: '10px' } }>
          <div className='fingerprint-container'>
            <span>{'9324 B79F 563E AB0C 7F60 9368 71DD 7B08 34F2 8CD5'}</span>
          </div>
        </Cutout>
      </Fieldset>
    </div>
  </React.Fragment>)
}

export { ContactHeader, ContactBody };

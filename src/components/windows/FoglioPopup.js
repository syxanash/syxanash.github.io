import React, { Component } from 'react';
import { Button, Cutout, Fieldset } from 'react95';

import './FoglioPopup.css';

import questionMarkIcon from '../../resources/icons/question-mark.gif';

class FoglioPopupHeader extends Component {
  render = () => (
    <span>
      <img src={ questionMarkIcon } alt='main icon' style={ { height: '15px' } }/>
    </span>
  )
}

class FoglioPopupBody extends Component {
  render = () => {
    const { closeWindow } = this.props;

    return (
      <React.Fragment>
        <Fieldset className='popup-fieldset'>
          <span>
            <b>This is not a blog</b>. What I say is not that important it doesn't need to be
            remembered or archived somewhere for future generations to read.
            Imagine this as a temporary single post which will be replaced from time
            to time by a new one.
          </span>
        </Fieldset>
        <div className='action-button-container'>
          <Cutout>
            <div>
              <Button
                fullWidth
                onClick={ () => closeWindow() }
                style={ { width: '150px' } }
              >OK</Button>
            </div>
          </Cutout>
        </div>
      </React.Fragment>
    );
  }
}

export { FoglioPopupHeader, FoglioPopupBody };

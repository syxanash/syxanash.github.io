import React, { Component } from 'react';
import { Button, Cutout, Fieldset } from 'react95';

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
        <Fieldset style={ { marginBottom: '20px', marginTop: '0' } }>
          <div style={ { marginTop: '-20px' } }>
            <h2>What is this?</h2>
            <b>This is not a blog</b>. But imagine this as a <i>One Post Blog</i>,
            a temporary single post which will be replaced from time
            to time by a new one.
            <h2>Are you lazy?</h2>
            <b>Generally yes</b>. I could've <s>coded</s> used some nice static blogging app to
            make an actual blog, instead I'm spitting out a one markdown file from a
            lonely Heroku instance.
            <h2>Are you sarcastic?</h2>
            <b>Nope</b>, I genuinely like the idea, something like
            a meaningless <i>snap!</i> Just think about it,
            so many cool websites and blogs went down in the last decade,
            though maybe something could still be
            found on <a href='https://archive.org' rel='noopener noreferrer'>archive.org</a> we don't really know if that'll go one day too.
            <p>
            So you better get used to the idea that everything is momentary in here...
            </p>
            <h2>Please disable that fecking scan line effect</h2>
            Ahah yes, tell that to the poor 90s chaps!
          </div>
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

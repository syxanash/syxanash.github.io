import React, { Component } from 'react';
import { Button, Cutout } from 'react95';

import './Unknown.css';

import unknownIcon from '../../resources/icons/unknown.gif';

class UnknownHeader extends Component {
  render = () => (
    <span>
      <img src={ unknownIcon } alt='main icon' style={ { height: '15px' } }/>
    </span>
  )
}

class UnknownBody extends Component {
  constructor(props) {
    super(props);

    this.textInterval = undefined;
    this.state = {
      titleText: [
        'F̴̓̏ͫ̚I͛ͪ͂̅L̪͖̆̎ͯ̆̎E̖̐ͩ̈̇̚͟ ͔̺̗͚̮͙ͧ͊ͫC͇̖̘͑͒͞Ó̴̗̇R͉͍͊ͭ͐ͦ̈́R̻̠̥ͧ̾ͦ̚U̝͇̜̹͆ͥ̏ͪ͋̾P̡̊T̶̿͐͌͛Ę̗̫̻̭̪̣͕͋́̓D̝̜̗͖̂͌͜',
        'F̢̻̜͖̤ͮÌ̳͎̲L͜Ẽ̝͚͕̺͚ͣͪ ͔͚͔̅ͨͮ̊͗ͭͅC̯̘͔̐̎͐͠O̰̮̖̩̣̰͔̒̎͌ͪR͈̠͊̋̾̄̽R͇ͧͬ̐̃͂̚Ŭ̶͔̪̑̌͋͌P̭͐̽̔̒̎T̜̟̰̽ͪ̾E̥̦̫͈̺̮Ḑ̥͔͈͚͂͛̆̍ͤ̈́̊',
        'F̪͓̹͔͌I̻͑͒̌L̴͕͉͚͕͕̳ͦE͏̹̜͕ ̦͎̈̆͗̚͞C͆ͤ̐Ö̸̮͇̪̤̼̟̫̀͐R͕̄́͒ͬR̶͕̐̏ͣU̦̭̻͉̰̖̫͊̿P̎̿̍͛̂̈͡T̲̼͖ͦͦ̾̌ͮͅE͔̋͒͐ͩ̃̊D̰̳̥͇̺ͣ̔͘',
        'F̳̮̊̈́͐͘Ǐ͓͎̣͓͊ͥ̋̀̚Lͮ̊҉͙͈̱̞͚̖̝Ḙ̮̬͉̫̹̹̋ͭ̈̿̾ͪ ͚͍͍̺͈̾̑͗̀C̗̘̟̫͕͚̞ͨ̈́̃̎Ō̃ͩR̆ͫ̍ͪ̾̌̊͞Ȑ̳̺̣͖͉̰̦̓U͈̝̓̉̃̓͘P͉͔̼̅̉̂͠T͇̜͈̬͗̃ͮ̅͟E͔̎̾̀D̦̬͍̩ͦ̅͟',
        'F̎ͤ̚ÍL̴̝̓̔͑̌̎E̪ͮ̆̾̔̆ ̥͖̞͚̰̗̽C̫͖̼̦͊ͥͅͅO̓͏̠͍͕R̹̜̈͗͌R̦͈̋ͦͪͦ̀͝Ûͯͨͬ͏̲̹̝P̫ͯ̓̾̈́Ṱ͓̻̘̫̼̔̎ͤE̮͑̊ͮĎ̜̻̝̟͖̟̝ͫ̈ͦ̈́̚',
        'F͔̖́́Iͮ̏͑̏ͧͮ҉̟̟L͉̼͌̌ͣE̍́ͤ҉̺͍̰ ̨̯̖̩̼̭̪ͥͯ͑ͬ́C̥̏Ô͖̙̞̺̟͓̼͟R̘̹͓̘̥̣̓̾R͎̰̝̬̉̊͑ͩ̎̔̚̕U̸̟̦͔̪̹ͦP̱̲̜̩͎̐̍ͥ͋ͯ͂̀T̰̲̈́̋̓̄Ē̤̈́̇͡D̢̦̩̼͒̿̌ͫͦ̓̾',
        'F̨̄ͭͣ̋͑͒̀I̞͈͕̘ͮ͒͜ͅL̼̑ͩͯ̀E̲͓̜̺̪̦̬ ̨̰̥̩ͯ͋̽̅̒C̖̫̼̝̜ͪ̽̉Ȍ̢̖̱̬̲̺͓̎ͩŔ̥͝R͚̳̘̩̝ͪU̦͎̙͔ͬ̾ͤ̌̍͟P̫̟̮͚͛̏ͮ̆̕Ť͚̗ͮ̽̌̈́͠Ȩ͉͓D͙̦̺̰̹̒ͯͨ̂',
        'F͚̝̠̹I͔̳̺L͈̳͔̮͓͔͆̄E͔̎ ̨̯ͥͨ́ͩͥC͕̊O̰̜̺̕R̹̠̭͍R̢͙̺͐Ư̼͓ͩ̉P̜͕ͭ͊̿̈̓ͮ͊͘T͍̺̘͎͖̟̓̔͋͡E̦̣̜̲̮͑ͬ͑͘D̙̣́',
        'F̘̦̮̞̾Ǐ̂̄̔̃L̝̤͔E͍̖͋ͣ͗̊͗̓ ̵̭̜͖̖͈ͫ̔̐̀̏ͣC̻̯̫͍̰͎O̪̖̟͇̜̓̈ͫ̚R̹̥̮̹̉̇͊̇̀̄̚Ṙ͍͈̜͎̣U̷͇̫͔ͧ͆̑̾ͅP̛͕̫̘̟͔͔̜T̵͚̗̯͓̬̠ͥE̳̯̱̖̹̝̋̆͂̚D̵̗̼̼̮̆̈̋ͪ̚',
        'F̝̎ͅĪ̓͐̀̈́͊͒͏͈͙̙̦̫L̖̋͐Ȅ͙͇͇̩̭͋̐͂̀ ̨͈̞̠͎̗̫͚̇̿ͤC̰͓̈̒̊̚O̼̥̤͖͕͕ͯ̾R̩̐͂̄͢R̛̟̺ͥ̽̈́Ṵ̬͕͉̯͈̉̾P̼̠̮̞͙̫̥͊̌ͥ̓̅͊T̶̳͕̮̮ͮͭ̌ͧ͑E҉̬D̴̩̻͔ͣ͆̎̅ͦ́',
      ],
      textCounter: 0,
    };
  }

  componentWillUnmount() {
    if (this.textInterval) {
      clearInterval(this.textInterval);
    }
  }

  componentDidMount() {
    if (!this.textInterval) {
      this.textInterval = setInterval(() => {
        const { textCounter } = this.state;
        this.setState({ textCounter: textCounter + 1 });
      }, 100);
    }
  }

  render = () => {
    const { titleText, textCounter } = this.state;
    const { closeWindow } = this.props;

    const foundAgent = localStorage.getItem('foundAgent') === 'true';

    const windowMessage = foundAgent
      ? <span>Investigate the bugs in <b>Cestino</b></span>
      : <span>Find the <b>Agent</b>, he might know what this is about...</span>;

    return (
      <div>
        <div className='cestino-message-container'>
          <span className='unknown-message-text'>
            <div style={ { margin: '15px' } }>{titleText[textCounter % titleText.length]}</div>
          </span>
          <div className='unknown-subtext'>{windowMessage}</div>
        </div>
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
      </div>
    );
  }
}

export { UnknownHeader, UnknownBody };

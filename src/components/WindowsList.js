import { AboutHeader, AboutBody } from './windows/About';
import { LinksHeader, LinksBody } from './windows/Links';
import { ProjectsHeader, ProjectsBody } from './windows/Projects';
import { ContactHeader, ContactBody } from './windows/Contact';
import { GuestbookHeader, GuestbookBody } from './windows/Guestbook';
import { MusicHeader, MusicBody } from './windows/Music';
import { CestinoHeader, CestinoBody } from './windows/Cestino';
import { CreditsHeader, CreditsBody } from './windows/Credits';
import { PizzaNetHeader, PizzaNetBody } from './windows/PizzaNet';
import { AwesomeGUIHeader, AwesomeGUIBody } from './windows/AwesomeGUI';
import { OSInfoWindowHeader, OSInfoWindowBody } from './windows/OSInfoWindow';
import { FixHeader, FixBody } from './windows/Fix';

import PippoTheme from '../themes/PippoTheme';
import PippoDarkPro from '../themes/PippoDarkPro';
import PippoBleeding from '../themes/PippoBleeding';
import PippoGoleador from '../themes/PippoGoleador';

export default function WindowsList() {
  const windowsList = {
    about: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: AboutHeader,
      body: AboutBody,
      windowTheme: PippoTheme,
    },
    projects: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: ProjectsHeader,
      body: ProjectsBody,
      windowTheme: PippoDarkPro,
    },
    contact: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: ContactHeader,
      body: ContactBody,
      windowTheme: PippoTheme,
    },
    links: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: LinksHeader,
      body: LinksBody,
      windowTheme: PippoTheme,
    },
    guestbook: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: GuestbookHeader,
      body: GuestbookBody,
      windowTheme: PippoTheme,
    },
    music: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: MusicHeader,
      body: MusicBody,
      windowTheme: PippoTheme,
    },
    pizza: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: PizzaNetHeader,
      body: PizzaNetBody,
      windowTheme: PippoTheme,
    },
    credits: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: CreditsHeader,
      body: CreditsBody,
      windowTheme: PippoTheme,
    },
    awesomegui: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: AwesomeGUIHeader,
      body: AwesomeGUIBody,
      windowTheme: PippoTheme,
    },
    osinfowindow: {
      hasFullScreen: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: OSInfoWindowHeader,
      body: OSInfoWindowBody,
      windowTheme: PippoGoleador,
    },
    cestino: {
      hasFullScreen: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: CestinoHeader,
      body: CestinoBody,
      windowTheme: PippoBleeding,
    },
    fixmycomputer: {
      hasFullScreen: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: FixHeader,
      body: FixBody,
      windowTheme: PippoTheme,
    },
  };

  return windowsList;
}

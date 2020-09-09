import { AboutHeader, AboutBody } from './windows/About';
import { LinksHeader, LinksBody } from './windows/Links';
import { ProjectsHeader, ProjectsBody } from './windows/Projects';
import { ContactHeader, ContactBody } from './windows/Contact';
import { GuestbookHeader, GuestbookBody } from './windows/Guestbook';
import { MusicHeader, MusicBody } from './windows/Music';
import { CestinoHeader, CestinoBody } from './windows/Cestino';
import { UnknownHeader, UnknownBody } from './windows/Unknown';
import { CreditsHeader, CreditsBody } from './windows/Credits';
import { WebDesktopsHeader, WebDesktopsBody } from './windows/WebDesktops';
import { KonamiHeader, KonamiBody } from './windows/Konami';
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
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: AboutHeader,
      body: AboutBody,
      windowTheme: PippoTheme,
    },
    projects: {
      hasFullScreen: true,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: ProjectsHeader,
      body: ProjectsBody,
      windowTheme: PippoDarkPro,
    },
    contact: {
      hasFullScreen: true,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: ContactHeader,
      body: ContactBody,
      windowTheme: PippoTheme,
    },
    links: {
      hasFullScreen: true,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: LinksHeader,
      body: LinksBody,
      windowTheme: PippoTheme,
    },
    guestbook: {
      hasFullScreen: true,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: GuestbookHeader,
      body: GuestbookBody,
      windowTheme: PippoTheme,
    },
    music: {
      hasFullScreen: true,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: MusicHeader,
      body: MusicBody,
      windowTheme: PippoTheme,
    },
    credits: {
      hasFullScreen: true,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: CreditsHeader,
      body: CreditsBody,
      windowTheme: PippoTheme,
    },
    webdesktops: {
      hasFullScreen: true,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: WebDesktopsHeader,
      body: WebDesktopsBody,
      windowTheme: PippoTheme,
    },
    konamicode: {
      hasFullScreen: false,
      tiltAnimation: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: KonamiHeader,
      body: KonamiBody,
      windowTheme: PippoGoleador,
    },
    osinfowindow: {
      hasFullScreen: false,
      tiltAnimation: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: OSInfoWindowHeader,
      body: OSInfoWindowBody,
      windowTheme: PippoGoleador,
    },
    cestino: {
      hasFullScreen: false,
      tiltAnimation: true,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: CestinoHeader,
      body: CestinoBody,
      windowTheme: PippoBleeding,
    },
    unknown: {
      hasFullScreen: false,
      tiltAnimation: false,
      canCloseWindow: false,
      opened: false,
      focused: false,
      header: UnknownHeader,
      body: UnknownBody,
      windowTheme: PippoTheme,
    },
    fixmycomputer: {
      hasFullScreen: true,
      tiltAnimation: false,
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

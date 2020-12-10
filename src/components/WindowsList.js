import { AboutHeader, AboutBody } from './windows/About';
import { LinksHeader, LinksBody } from './windows/Links';
import { ProjectsHeader, ProjectsBody } from './windows/Projects';
import { ContactHeader, ContactBody } from './windows/Contact';
import { GuestbookHeader, GuestbookBody } from './windows/Guestbook';
import { MusicHeader, MusicBody } from './windows/Music';
import { CestinoHeader, CestinoBody } from './windows/Cestino';
import { UnknownHeader, UnknownBody } from './windows/Unknown';
import { FoglioPopupHeader, FoglioPopupBody } from './windows/FoglioPopup';
import { FoglioHeader, FoglioBody } from './windows/Foglio';
import { CreditsHeader, CreditsBody } from './windows/Credits';
import { WebDesktopsHeader, WebDesktopsBody } from './windows/WebDesktops';
import { KonamiHeader, KonamiBody } from './windows/Konami';
import { OSInfoWindowHeader, OSInfoWindowBody } from './windows/OSInfoWindow';
import { FixHeader, FixBody } from './windows/Fix';

import PippoTheme from '../themes/PippoTheme';
import PippoDistracted from '../themes/PippoDistracted';
import PippoDarkPro from '../themes/PippoDarkPro';
import PippoBleeding from '../themes/PippoBleeding';
import PippoGoleador from '../themes/PippoGoleador';
import PippoRedmond from '../themes/PippoRedmond';
import PippoRedmondDistracted from '../themes/PippoRedmondDistracted';

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
      unfocusedTheme: PippoDistracted,
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
      unfocusedTheme: PippoDistracted,
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
      unfocusedTheme: PippoDistracted,
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
      unfocusedTheme: PippoDistracted,
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
      unfocusedTheme: PippoDistracted,
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
      unfocusedTheme: PippoDistracted,
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
      unfocusedTheme: PippoDistracted,
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
      unfocusedTheme: PippoDistracted,
    },
    konamicode: {
      hasFullScreen: false,
      tiltAnimation: false,
      canCloseWindow: false,
      opened: false,
      focused: false,
      header: KonamiHeader,
      body: KonamiBody,
      windowTheme: PippoRedmond,
      unfocusedTheme: PippoRedmondDistracted,
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
      unfocusedTheme: PippoDistracted,
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
      unfocusedTheme: PippoDistracted,
    },
    unknown: {
      hasFullScreen: false,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: UnknownHeader,
      body: UnknownBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    fogliopopup: {
      hasFullScreen: false,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: FoglioPopupHeader,
      body: FoglioPopupBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    foglio: {
      hasFullScreen: true,
      tiltAnimation: false,
      canCloseWindow: true,
      opened: false,
      focused: false,
      header: FoglioHeader,
      body: FoglioBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
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
      unfocusedTheme: PippoDistracted,
    },
  };

  return windowsList;
}

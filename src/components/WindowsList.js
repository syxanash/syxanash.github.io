import { AboutHeader, AboutBody } from './windows/About';
import { LinksHeader, LinksBody } from './windows/Links';
import { ProjectsHeader, ProjectsBody } from './windows/Projects';
import { ContactHeader, ContactBody } from './windows/Contact';
import { GuestbookHeader, GuestbookBody } from './windows/Guestbook';
import { MusicHeader, MusicBody } from './windows/Music';
import { CestinoHeader, CestinoBody } from './windows/Cestino';
import { BulbHeader, BulbBody } from './windows/Bulb';
import { BlogHeader, BlogBody } from './windows/Blog';
import { CreditsHeader, CreditsBody } from './windows/Credits';
import { WebDesktopsHeader, WebDesktopsBody } from './windows/WebDesktops';
import { GabrieleHeader, GabrieleBody } from './windows/Gabriele';
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
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: AboutHeader,
      body: AboutBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    projects: {
      hasFullScreen: true,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: ProjectsHeader,
      body: ProjectsBody,
      windowTheme: PippoDarkPro,
      unfocusedTheme: PippoDistracted,
    },
    contact: {
      hasFullScreen: true,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: ContactHeader,
      body: ContactBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    links: {
      hasFullScreen: true,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: LinksHeader,
      body: LinksBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    guestbook: {
      hasFullScreen: true,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: GuestbookHeader,
      body: GuestbookBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    music: {
      hasFullScreen: false,
      hideWindowBody: true,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: MusicHeader,
      body: MusicBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    credits: {
      hasFullScreen: true,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: CreditsHeader,
      body: CreditsBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    webdesktops: {
      hasFullScreen: true,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: WebDesktopsHeader,
      body: WebDesktopsBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    gabrieleswindow: {
      hasFullScreen: false,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: false,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: GabrieleHeader,
      body: GabrieleBody,
      windowTheme: PippoRedmond,
      unfocusedTheme: PippoRedmondDistracted,
    },
    osinfowindow: {
      hasFullScreen: false,
      hideWindowBody: false,
      tiltAnimation: true,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: OSInfoWindowHeader,
      body: OSInfoWindowBody,
      windowTheme: PippoGoleador,
      unfocusedTheme: PippoDistracted,
    },
    cestino: {
      hasFullScreen: false,
      hideWindowBody: false,
      tiltAnimation: true,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: CestinoHeader,
      body: CestinoBody,
      windowTheme: PippoBleeding,
      unfocusedTheme: PippoDistracted,
    },
    bulb: {
      hasFullScreen: true,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: false,
      opened: false,
      focused: false,
      header: BulbHeader,
      body: BulbBody,
      windowTheme: PippoTheme,
      unfocusedTheme: PippoDistracted,
    },
    blog: {
      hasFullScreen: true,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: true,
      opened: false,
      focused: false,
      header: BlogHeader,
      body: BlogBody,
      windowTheme: PippoRedmond,
      unfocusedTheme: PippoRedmondDistracted,
    },
    fixmycomputer: {
      hasFullScreen: true,
      hideWindowBody: false,
      tiltAnimation: false,
      canCloseWindow: true,
      hasScreensaver: false,
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

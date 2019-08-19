import { AboutHeader, AboutBody } from './windows/About';
import { LinksHeader, LinksBody } from './windows/Links';
import { ProjectsHeader, ProjectsBody } from './windows/Projects';
import { ContactHeader, ContactBody } from './windows/Contact';
import { GuestbookHeader, GuestbookBody } from './windows/Guestbook';
import { CreditsHeader, CreditsBody } from './windows/Credits';
import { FixHeader, FixBody } from './windows/Fix';

export default function WindowsList() {
  const windowsList = {
    about: {
      hasFullScreen: true,
      opened: false,
      header: AboutHeader,
      body: AboutBody,
    },
    projects: {
      hasFullScreen: true,
      opened: false,
      header: ProjectsHeader,
      body: ProjectsBody,
    },
    contact: {
      hasFullScreen: true,
      opened: false,
      header: ContactHeader,
      body: ContactBody,
    },
    links: {
      hasFullScreen: true,
      opened: false,
      header: LinksHeader,
      body: LinksBody,
    },
    guestbook: {
      hasFullScreen: true,
      opened: false,
      header: GuestbookHeader,
      body: GuestbookBody,
    },
    credits: {
      hasFullScreen: false,
      opened: false,
      header: CreditsHeader,
      body: CreditsBody,
    },
    fixmycomputer: {
      hasFullScreen: true,
      opened: false,
      header: FixHeader,
      body: FixBody,
    },
  };

  return windowsList;
}

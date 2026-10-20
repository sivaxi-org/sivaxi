import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


export interface JournalLink {
  label: string;
  url: string;
}

export interface JournalCategory {
  title: string;
  description: string;
  icon: string;
  url: string;
}

export interface JournalContent {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  headerAction: JournalLink;
  featured: {
    badge: string;
    icon: string;
    eyebrow: string;
    technologies: string[];
    category: string;
    label: string;
    title: string;
    description: string;
    action: JournalLink;
  };
  categories: JournalCategory[];
  footerNote: string;
  footerAction: JournalLink;
}

const REPOSITORY_URL = 'https://github.com/sivaxi-org/sivaxi';

export const JOURNAL_CONTENT: JournalContent = {
  badge: 'The Sivaxi journal',
  title: 'Notes from',
  highlightedTitle: 'building in public.',
  description:
    'Engineering decisions, problems worth solving, and lessons learned while building the Sivaxi ecosystem.',

  headerAction: {
    label: 'Follow development',
    url: REPOSITORY_URL,
  },

  featured: {
    badge: 'Engineering notes',
    icon: 'lucide:layers-3',
    eyebrow: 'Sivaxi / Architecture',
    technologies: ['Angular', 'Microfrontends', 'Native Federation'],
    category: 'Architecture',
    label: 'Featured article',
    title: 'Building a microfrontend architecture for Sivaxi',
    description:
      'A look at separating applications into independently developed frontend projects, sharing authentication and design tokens, and solving integration challenges along the way.',
    action: {
      label: 'Explore the project',
      url: REPOSITORY_URL,
    },
  },

  categories: [
    {
      title: 'Engineering & architecture',
      description:
        'Implementation decisions, system design, integrations, and trade-offs.',
      icon: 'lucide:code-2',
      url: REPOSITORY_URL,
    },
    {
      title: 'Build updates',
      description:
        'Features shipped, bugs resolved, and progress across our products.',
      icon: 'lucide:git-pull-request',
      url: REPOSITORY_URL,
    },
    {
      title: 'Lessons & insights',
      description:
        'Practical takeaways from experimenting, debugging, and shipping software.',
      icon: 'lucide:book-open',
      url: REPOSITORY_URL,
    },
  ],

  footerNote:
    'Real work, documented as it happens. New entries will appear as there is something useful to share.',

  footerAction: {
    label: 'Visit the repository',
    url: REPOSITORY_URL,
  },
};

@Component({
  imports: [],
  selector: 'app-journal-section',
  styleUrl: './journal-section.css',
  templateUrl: './journal-section.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JournalSection {
  readonly journal = JOURNAL_CONTENT;
}

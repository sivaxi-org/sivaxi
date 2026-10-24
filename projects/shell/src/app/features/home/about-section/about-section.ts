import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PillDirective } from '../../../core/directives/button-directive/pill.directive';
import { ButtonDirective } from '../../../core/directives/button-directive/button-directive';
import { UpperCasePipe } from '@angular/common';


export interface AboutPrinciple {
  title: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  supportingDescription: string;
  primaryAction: {
    label: string;
    url: string;
  };
  secondaryAction: {
    label: string;
    url: string;
  };
  principles: AboutPrinciple[];
  closingStatement: string;
  closingHighlight: string;
}

export const ABOUT_CONTENT: AboutContent = {
  badge: 'About Sivaxi',

  title: 'An independent technology company',
  highlightedTitle: 'building with purpose.',

  description:
    'Sivaxi is an independent technology company focused on building software products, AI-powered applications, web platforms, and reliable backend systems.',

  supportingDescription:
    'From intuitive user experiences to connected services, intelligent workflows, and infrastructure, Sivaxi brings different areas of engineering together to build practical digital solutions that can grow over time.',

  primaryAction: {
    label: 'Explore on GitHub',
    url: 'https://github.com/sivaxi-org/sivaxi',
  },

  secondaryAction: {
    label: 'Follow the journey',
    url: '#journal',
  },

  principles: [
    {
      title: 'Products over demos',
      description:
        'Build practical software products with attention to usability, reliability, and the details that matter beyond the first release.',
      icon: 'lucide:blocks',
    },
    {
      title: 'Engineering that connects',
      description:
        'Connect interfaces, backend services, data, identity, and automation through thoughtful architecture and reusable foundations.',
      icon: 'lucide:network',
    },
    {
      title: 'Progress in the open',
      description:
        'Share engineering decisions, implementation challenges, lessons learned, and product progress as Sivaxi evolves.',
      icon: 'lucide:git-commit-horizontal',
    },
  ],

  closingStatement: 'Technology should be more than individual tools.',
  closingHighlight: 'It should work together to solve real problems.',
};


@Component({
  imports: [ButtonDirective],
  selector: 'app-about-section',
  styleUrl: './about-section.css',
  templateUrl: './about-section.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutSection {
  readonly about = ABOUT_CONTENT;
}

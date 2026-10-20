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

  title: 'Building software with',
  highlightedTitle: 'purpose and perspective.',

  description:
    'Sivaxi is a technology ecosystem focused on building useful software products, intelligent systems, and the engineering foundations that bring them together.',

  supportingDescription:
    'From user-facing applications to backend infrastructure and AI-driven workflows, we explore how thoughtful engineering can make complex technology practical, connected, and easier to use.',

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
        'Build useful experiences with attention to usability, reliability, and the details beyond the first release.',
      icon: 'lucide:blocks',
    },
    {
      title: 'Systems that connect',
      description:
        'Bring interfaces, services, data, identity, and automation together through considered architecture.',
      icon: 'lucide:network',
    },
    {
      title: 'Progress in the open',
      description:
        'Share technical decisions, implementation challenges, lessons learned, and progress as the ecosystem evolves.',
      icon: 'lucide:git-commit-horizontal',
    },
  ],

  closingStatement: "The goal isn't to use more technology.",
  closingHighlight: "It's to make technology work better together.",
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

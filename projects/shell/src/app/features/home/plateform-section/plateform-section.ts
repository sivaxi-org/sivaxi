import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


export interface PlatformProduct {
  name: string;
  description: string;
  icon: string;
  url?: string;
  external?: boolean;
  featured?: boolean;
}

export interface PlatformCapability {
  title: string;
  description: string;
  icon: string;
  status: string;
}

export interface PlatformsContent {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  productLayer: {
    title: string;
    description: string;
    label: string;
    products: PlatformProduct[];
  };
  sharedLayer: {
    title: string;
    description: string;
    label: string;
    capabilities: PlatformCapability[];
  };
  footerNote: string;
}

export const PLATFORMS_CONTENT: PlatformsContent = {
  badge: 'Shared foundation',

  title: 'One engineering base,',
  highlightedTitle: 'many products.',

  description:
    'Products sit on top. Shared capabilities power them underneath. This is how Sivaxi evolves its products without rebuilding the same foundations every time.',

  productLayer: {
    title: 'Product layer',
    description: 'Experiences built on shared capabilities',
    label: 'Layer 01',

    products: [
      {
        name: 'Vixi AI',
        description: 'AI assistants and agentic workflows.',
        icon: 'lucide:brain-circuit',
        url: 'https://vixi.sivaxi.com',
        external: true,
      },
      {
        name: 'Portfolio',
        description: 'Web experiences and personal project showcase.',
        icon: 'lucide:panels-top-left',
        url: 'https://portfolio.sivaxi.com',
        external: true,
      },
      {
        name: 'More to come',
        description: 'New products as ideas become real.',
        icon: 'lucide:layers-3',
        featured: false,
      },
    ],
  },

  sharedLayer: {
    title: 'Shared capabilities',
    description: 'The engineering foundation beneath the products',
    label: 'Layer 02',

    capabilities: [
      {
        title: 'Identity & access',
        description:
          'Authentication, roles, and protected application access.',
        icon: 'lucide:shield-check',
        status: 'Implemented',
      },
      {
        title: 'Data & persistence',
        description:
          'Shared data services, application storage, and memory.',
        icon: 'lucide:database',
        status: 'Evolving',
      },
      {
        title: 'AI & orchestration',
        description:
          'Model integration, retrieval, tools, and agent workflows.',
        icon: 'lucide:workflow',
        status: 'In development',
      },
      {
        title: 'Infrastructure & delivery',
        description:
          'Deployment, service configuration, and operational tooling.',
        icon: 'lucide:server',
        status: 'Evolving',
      },
    ],
  },

  footerNote:
    'Status reflects implementation progress, not product availability. Planned capabilities are not represented as shipped features.',
};

@Component({
  imports: [],
  selector: 'app-plateform-section',
  styleUrl: './plateform-section.css',
  templateUrl: './plateform-section.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlateformSection {
  readonly platforms = PLATFORMS_CONTENT;
}

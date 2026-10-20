import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


export interface TechnologyGroup {
  title: string;
  subtitle: string;
  icon: string;
  technologies: string[];
}

export const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    title: 'Frontend',
    subtitle: 'Interfaces & experiences',
    icon: 'lucide:panels-top-left',
    technologies: [
      'Angular',
      'TypeScript',
      'Tailwind CSS',
      'HTML & CSS',
      'Microfrontends',
      'Flutter',
      'Bloc'
    ],
  },
  {
    title: 'Backend & APIs',
    subtitle: 'Services & integrations',
    icon: 'lucide:server',
    technologies: [
      'Java',
      'Spring Boot',
      'Python',
      'FastAPI',
      'REST APIs',
    ],
  },
  {
    title: 'AI & Agents',
    subtitle: 'Reasoning & orchestration',
    icon: 'lucide:brain-circuit',
    technologies: [
      'LangChain',
      'LangGraph',
      'RAG',
      'Embeddings',
      'LLM APIs',
    ],
  },
  {
    title: 'Data & Search',
    subtitle: 'Persistence & retrieval',
    icon: 'lucide:database',
    technologies: [
      'PostgreSQL',
      'Redis',
      'Vector Search',
      'SearXNG',
    ],
  },
  {
    title: 'Identity & Messaging',
    subtitle: 'Access & communication',
    icon: 'lucide:shield-check',
    technologies: [
      'Keycloak',
      'OAuth 2.0',
      'OpenID Connect',
      'Kafka',
      'MQTT',
    ],
  },
  {
    title: 'Infrastructure',
    subtitle: 'Deployment & operations',
    icon: 'lucide:container',
    technologies: [
      'Docker',
      'Kubenetes',
      'Terraform',
      'Jenkins',
      'Ansible',
      'GitHub Actions',
      'Traefik',
      'Linux',
      'Grafana',
      'Firebase'
    ],
  },
];


@Component({
  imports: [],
  selector: 'app-technologies-section',
  styleUrl: './technologies-section.css',
  templateUrl: './technologies-section.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechnologiesSection {
   readonly technologies = TECHNOLOGY_GROUPS;
}

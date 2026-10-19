
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export interface CapabilityOutput {
  title: string;
  description: string;
}

export interface CapabilityContentData {
  title: string;
  description: string;
  icon: string;
  outputs: CapabilityOutput[];
}

export const CAPABILITIES: CapabilityContentData[] = [
  {
    title: 'Web Applications',
    icon: 'lucide:panels-top-left',
    description:
      'Modern, responsive web experiences built around usability, accessibility, and maintainable architecture.',
    outputs: [
      {
        title: 'Frontend Development',
        description:
          'Responsive interfaces, reusable components, and design systems.',
      },
      {
        title: 'Full-Stack Applications',
        description:
          'Integrated frontend and backend solutions.',
      },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: 'lucide:server',
    description:
      'Reliable backend services designed for secure data access, integration, and long-term scalability.',
    outputs: [
      {
        title: 'API Development',
        description:
          'REST APIs, business logic, and service integration.',
      },
      {
        title: 'Distributed Systems',
        description:
          'Microservices, messaging, and resilient service communication.',
      },
    ],
  },
  {
    title: 'AI & Intelligent Systems',
    icon: 'lucide:brain-circuit',
    description:
      'AI-powered systems that combine language models, retrieval, tools, and workflows to solve practical problems.',
    outputs: [
      {
        title: 'AI Agents & Workflows',
        description:
          'Tool-using agents and stateful workflows with LangGraph.',
      },
      {
        title: 'Knowledge & Memory',
        description:
          'RAG pipelines, embeddings, and persistent conversational context.',
      },
    ],
  },
  {
    title: 'Platforms & Infrastructure',
    icon: 'lucide:layers-3',
    description:
      'The infrastructure and shared foundations that help applications work together securely and consistently.',
    outputs: [
      {
        title: 'Identity & Access',
        description:
          'Authentication, authorization, and centralized identity with Keycloak.',
      },
      {
        title: 'Application Infrastructure',
        description:
          'Containerization, deployment workflows, and service integration.',
      },
    ],
  },
];

@Component({
  selector: 'app-capabilities-section',
  standalone: true,
  imports: [],
  templateUrl: './capabilities-section.html',
  styleUrl: './capabilities-section.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CapabilitiesSection {
  readonly capabilities = CAPABILITIES;
}

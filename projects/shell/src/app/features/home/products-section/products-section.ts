import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { SectionHeader } from '../../../core/components/section-header/section-header';

import 'iconify-icon';
import { ProductSection } from './product-section/product-section';

const products = [
  {
    status: 'In Progress',
    category: 'Web Portfolio',
    title: 'Sivaxi Portfolio',
    highlight: ' for the modern web.',
    description:
      'A modern portfolio built with Angular, Spring Boot, and Keycloak. Explore the interface, application architecture, and engineering behind the Sivaxi ecosystem.',
    technologies: [
      {
        icon: 'lucide:layers-3',
        label: 'Angular',
      },
      {
        icon: 'lucide:server',
        label: 'Spring Boot',
      },
      {
        icon: 'lucide:shield-check',
        label: 'Keycloak',
      },
    ],
    link: 'https://portfolio.sivaxi.com/portfolio/ajaymalah',
    linkLabel: 'Explore Portfolio',
    previewUrl: 'https://portfolio.sivaxi.com/portfolio/ajaymalah',
  },
  {
    status: 'In Progress',
    category: 'AI Platform',
    title: 'Vixi AI',
    highlight: ' for intelligent interactions.',
    description:
      'An AI platform built with Python, FastAPI, and LangGraph, integrating retrieval-augmented generation, embeddings, web search, and persistent conversation memory.',
    technologies: [
      {
        icon: 'lucide:brain-circuit',
        label: 'LangGraph',
      },
      {
        icon: 'lucide:code-2',
        label: 'FastAPI',
      },
      {
        icon: 'lucide:database',
        label: 'PostgreSQL',
      },
      {
        icon: 'lucide:search',
        label: 'SearXNG',
      },
      {
        icon: 'lucide:shield-check',
        label: 'Keycloak',
      },
    ],
    link: 'https://sivaxi.com',
    linkLabel: 'Explore Vixi',
    previewUrl: 'https://sivaxi.com',
  },
];

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [ProductSection, SectionHeader],
  templateUrl: './products-section.html',
})
export class ProductsSections {
  products = signal(products);
}

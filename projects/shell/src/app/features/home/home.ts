import { Component } from '@angular/core';


import { HeroSection } from './components/hero-section/hero-section';
import { EngineeringPrinciples } from './components/engineering-principles/engineering-principles';
import { ProductsSection } from './components/products-section/products-section';
import { TechnologySection } from './components/technology-section/technology-section';
import { SiteFooter } from 'shared';
import { SiteHeader } from 'shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SiteHeader,
    HeroSection,
    EngineeringPrinciples,
    ProductsSection,
    TechnologySection,
    SiteFooter,
  ],
  templateUrl: './home.html',
})
export class Home {}
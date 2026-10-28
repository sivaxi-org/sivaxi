import { Component } from '@angular/core';



import { Hero } from './hero/hero';
import { ProductsSections } from './products-section/products-section';
import { MoreProductsSection } from './more-products-section/more-products-section';
import { PlateformSection } from './plateform-section/plateform-section';
import { CapabilitiesSection } from './capabilities-section/capabilities-section';
import { TechnologiesSection } from './technologies-section/technologies-section';
import { Footer } from '../../core/components/footer/footer';
import { AboutSection } from './about-section/about-section';
import { JournalSection } from './journal-section/journal-section';
import { Navbar } from '../../core/components/navbar/navbar';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Navbar,
    Hero,
    ProductsSections,
    MoreProductsSection,
    PlateformSection,
    CapabilitiesSection,
    TechnologiesSection,
    Footer,
    AboutSection,
    JournalSection
],
  templateUrl: './home.html',
})
export class Home {
   
}
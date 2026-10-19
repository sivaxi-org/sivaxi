
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'iconify-icon'
import { LeftSection } from './left-section/left-section';
import { RightSection } from './right-section/right-section';

@Component({
  selector: 'app-hero',
  imports: [LeftSection, RightSection],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  host: {
    class: 'grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16 my-16 lg:my-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'
  }
})
export class Hero {}

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonDirective } from '../../../core/directives/button-directive/button-directive';

@Component({
  imports: [ButtonDirective],
  selector: 'app-more-products-section',
  styleUrl: './more-products-section.css',
  templateUrl: './more-products-section.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoreProductsSection {}

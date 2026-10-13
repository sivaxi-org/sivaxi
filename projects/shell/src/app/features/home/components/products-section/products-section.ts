import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {APP_LINKS,SHELL_ROUTES} from 'shared'

@Component({
  imports: [RouterLink],
  selector: 'app-products-section',
  styleUrl: './products-section.css',
  templateUrl: './products-section.html',
})
export class ProductsSection {

  readonly appLinks = APP_LINKS;
  readonly shellRoutes = SHELL_ROUTES;

}

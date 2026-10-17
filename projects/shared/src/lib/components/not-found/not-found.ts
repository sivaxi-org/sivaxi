import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SIVAXI_BRANDING } from '../../constants/branding';

@Component({
  selector: 'sivaxi-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html' ,
})
export class NotFoundComponent {

  branding = SIVAXI_BRANDING;

  title = input('Page not found');
  message = input(
    "The page you're looking for doesn't exist or may have moved."
  );
}
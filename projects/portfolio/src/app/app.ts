import { Component, signal } from '@angular/core';
import { SiteHeader } from 'shared';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [SiteHeader],
})
export class App {
  protected readonly title = signal('portfolio');
}

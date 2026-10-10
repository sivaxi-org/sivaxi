import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from 'shared-ui';
import { AuthService } from 'shared-auth';

@Component({
  imports: [RouterOutlet,Button],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('vixi');
    protected readonly auth = inject(AuthService);

}

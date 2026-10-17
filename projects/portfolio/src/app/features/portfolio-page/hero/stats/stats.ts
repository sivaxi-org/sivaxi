import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-stats',
  styleUrl: './stats.css',
  templateUrl: './stats.html',
})
export class Stats {

  stats = input<any>()

}

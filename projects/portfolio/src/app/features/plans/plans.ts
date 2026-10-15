import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  imports: [Navbar],
  selector: 'app-plans',
  styleUrl: './plans.css',
  templateUrl: './plans.html',
})
export class Plans {}

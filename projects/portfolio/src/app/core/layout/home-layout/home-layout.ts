import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { ThemeComponent } from 'shared';

@Component({
  imports: [RouterOutlet, Navbar],
  selector: 'app-home-layout',
  styleUrl: './home-layout.css',
  templateUrl: './home-layout.html',
})
export class HomeLayout {

  

}

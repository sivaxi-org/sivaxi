
import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import {authGuard} from 'shared'

export const routes: Routes = [

  {
    path: "home",
    canActivate: [authGuard],
    component: Home
  }

];

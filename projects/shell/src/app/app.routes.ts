
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    title: "Sivaxi",
    pathMatch: 'full',
    component: Home,
  },
  {
    path: 'vixi',
    loadChildren: () =>
      loadRemoteModule('vixi', './Routes').then((m) => m.routes),
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      loadRemoteModule('portfolio', './Routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

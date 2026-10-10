
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      loadRemoteModule('home', './Component').then(
        (m) => m.App
      ),
  },
  {
    path: 'vixi',
    loadComponent: () =>
      loadRemoteModule('vixi', './Component').then(
        (m) => m.App
      ),
  },
];
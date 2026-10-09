import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      loadRemoteModule('home', './Component').then(
        (m) => m.App
      ),
  },
];
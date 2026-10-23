import { Routes } from '@angular/router';
import { Dashboard } from './features/chat/dashboard/dashboard';
import { authGuard, NotFoundComponent } from 'shared';
import { Preview } from './features/preview/preview';

export const routes: Routes = [
  {
    path: 'preview',
    title: 'Preview | VIXI',
    component: Preview,
  },
  {
    path: '',
    title: 'Sivaxi | VIXI',
    canActivate: [authGuard],
    component: Dashboard,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

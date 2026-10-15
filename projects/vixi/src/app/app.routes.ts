
import { Routes } from '@angular/router';
import { Dashboard } from './features/chat/dashboard/dashboard';
import { authGuard } from 'shared';


export const routes: Routes = [
  {
    path: '',
    title: 'Sivaxi | VIXI',
    canActivate: [authGuard],
    component: Dashboard,
  },
];

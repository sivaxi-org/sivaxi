import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { authGuard } from 'shared';
import { HomeLayout } from './core/layout/home-layout/home-layout';
import { PortfolioPage } from './features/portfolio-page/portfolio-home';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayout,
    children: [
      {
        path: '',
        component: Home,
      },
    {
      path: 'portfolio/:username',
      component: PortfolioPage,
    },
    ],
  },
];

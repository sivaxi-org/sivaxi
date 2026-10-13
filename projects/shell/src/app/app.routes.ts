
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './features/home/home';

export const routes: Routes = [
 {
    path: '',
    component: Home
 }
];

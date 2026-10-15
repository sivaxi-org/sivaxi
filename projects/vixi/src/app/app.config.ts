import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {
  provideSivaxiAuth,
  sivaxiAuthInterceptor,
  SIVAXI_API_ORIGINS,
} from 'shared';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSivaxiAuth('vixi'),
    {
      provide: SIVAXI_API_ORIGINS,
      useValue: ['https://api.sivaxi.com'],
    },
    provideHttpClient(
      withInterceptors([sivaxiAuthInterceptor]),
    ),
  ],
};
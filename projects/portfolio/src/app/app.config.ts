import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideSivaxiAuth, SIVAXI_API_ORIGINS, sivaxiAuthInterceptor } from 'shared';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([sivaxiAuthInterceptor])),
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
        {
      provide: SIVAXI_API_ORIGINS,
      useValue: ['https://champ.sivaxi.com'],
    },
    provideSivaxiAuth('portfolio')],
    
};


import { provideKeycloak } from 'keycloak-angular';

export function provideSivaxiAuth(clientId = '') {
  return provideKeycloak({
    config: {
      url: 'https://auth.sivaxi.com',
      realm: 'portfolio',
      clientId,
    },
    initOptions: {
      onLoad: 'check-sso',
      checkLoginIframe: false,
    },
  });
}

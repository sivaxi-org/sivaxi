import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'https://auth.sivaxi.com',
  realm: 'portfolio',
  clientId: 'portfolio'
});
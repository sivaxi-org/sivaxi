
import { initFederation } from '@angular-architects/native-federation';

const hostname = window.location.hostname;

const isLocal =
  hostname.endsWith('.sivaxi.test') ||
  hostname === 'localhost' ||
  hostname === '127.0.0.1';

const protocol = isLocal ? 'http' : 'https';
const domain = isLocal ? 'sivaxi.test' : 'sivaxi.com';

const remotes = {
  vixi: `${protocol}://vixi.${domain}/remoteEntry.json`,
  portfolio: `${protocol}://portfolio.${domain}/remoteEntry.json`,
};

initFederation(remotes, {
  hostRemoteEntry: { url: './remoteEntry.json' },
})
  .then(() => import('./bootstrap'))
  .catch((error) => {
    console.error('Failed to initialize Sivaxi federation:', error);
  });

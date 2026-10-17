
const hostname =
  typeof window !== 'undefined' ? window.location.hostname : '';

const isLocal =
  hostname.endsWith('.sivaxi.test') ||
  hostname === 'sivaxi.test' ||
  hostname === 'localhost' ||
  hostname === '127.0.0.1';

const ASSET_BASE_URL = isLocal
  ? 'http://shell.sivaxi.test/assets'
  : 'https://sivaxi.com/assets';

const LOGO_BASE_PATH = `${ASSET_BASE_URL}/logos`;

export const SIVAXI_BRANDING = {
  assetBaseUrl: ASSET_BASE_URL,

  logos: {
    primaryHorizontalDark: `${LOGO_BASE_PATH}/primary_horizontal_light.svg`,
    primaryHorizontalLight: `${LOGO_BASE_PATH}/primary_horizontal_dark.svg`,

    primaryIconDark: `${LOGO_BASE_PATH}/primary_icon_light.svg`,
    primaryIconLight: `${LOGO_BASE_PATH}/primary_icon_dark.svg`,

    stackedLogoDark: `${LOGO_BASE_PATH}/stacked_logo_light.svg`,
    stackedLogoLight: `${LOGO_BASE_PATH}/stacked_logo_dark.svg`,
  },
} as const;

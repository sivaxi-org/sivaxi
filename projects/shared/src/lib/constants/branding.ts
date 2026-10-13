
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
    primaryHorizontalLight: `${LOGO_BASE_PATH}/01_primary_horizontal_light.png`,
    primaryHorizontalDark: `${LOGO_BASE_PATH}/02_primary_horizontal_dark.png`,
    primaryStackedLight: `${LOGO_BASE_PATH}/03_primary_stacked_light.png`,
    primaryStackedDark: `${LOGO_BASE_PATH}/04_primary_stacked_dark.png`,
    symbolLight: `${LOGO_BASE_PATH}/05_symbol_light.png`,
    symbolDark: `${LOGO_BASE_PATH}/06_symbol_dark.png`,
    outlineSymbolLight: `${LOGO_BASE_PATH}/07_outline_symbol_light.png`,
    outlineSymbolDark: `${LOGO_BASE_PATH}/08_outline_symbol_dark.png`,
    appIconLight: `${LOGO_BASE_PATH}/09_app_icon_light.png`,
    appIconDark: `${LOGO_BASE_PATH}/10_app_icon_dark.png`,
    faviconLight: `${LOGO_BASE_PATH}/11_favicon_light.png`,
    faviconDark: `${LOGO_BASE_PATH}/12_favicon_dark.png`,
    monochromeBlackHorizontal: `${LOGO_BASE_PATH}/13_monochrome_black_horizontal.png`,
    monochromeWhiteHorizontal: `${LOGO_BASE_PATH}/14_monochrome_white_horizontal.png`,
    grayscaleHorizontal: `${LOGO_BASE_PATH}/15_grayscale_horizontal.png`,
    inverseHorizontal: `${LOGO_BASE_PATH}/16_inverse_horizontal.png`,
    singleColorNavy: `${LOGO_BASE_PATH}/17_single_color_navy.png`,
    singleColorDarkGray: `${LOGO_BASE_PATH}/18_single_color_dark_gray.png`,
    singleColorSilver: `${LOGO_BASE_PATH}/19_single_color_silver.png`,
    singleColorBlackStacked: `${LOGO_BASE_PATH}/20_single_color_black_stacked.png`,
    solidDarkBackground: `${LOGO_BASE_PATH}/21_solid_dark_background.png`,
    solidLightBackground: `${LOGO_BASE_PATH}/22_solid_light_background.png`,
    gradientBackground: `${LOGO_BASE_PATH}/23_gradient_background.png`,
    photoOverlay: `${LOGO_BASE_PATH}/24_photo_overlay.png`,
  },
} as const;

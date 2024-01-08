import baseTheme from './PippoTheme';

const theme = {
  canvas: '#ffffff',
  material: '#ced0cf',
  materialDark: '#9a9e9c',

  borderDarkest: '#050608',
  borderLightest: '#ffffff',
  borderDark: '#888c8f',
  borderLight: '#dfe0e3',

  headerMaterialDark: '#1034a6',
  headerMaterialLight: '#a7c1e2',
  headerText: '#ffffff',

  text: '#050608',
  textInvert: '#ffffff',
  textDisabled: '#888c8f',
  textDisabledShadow: '#ffffff',

  anchor: '#1034a6',

  hoverBackground: '#000080',
  checkmark: '#050608',
  progress: '#000080',

  flatLight: '#d8d8d8',
  flatDark: '#9e9e9e',
};

export default { ...baseTheme, ...theme };

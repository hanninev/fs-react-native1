import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    appBarText: 'white',
    white: 'white',
    mainBackground: '#e1e4e8',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    color: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from './src/global-styled/theme';
import { AppContainer } from './src/router';

// eslint-disable-next-line no-console
console.disableYellowBox = true;
export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <AppContainer />
  </ThemeProvider>
);

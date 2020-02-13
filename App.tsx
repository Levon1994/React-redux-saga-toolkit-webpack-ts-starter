import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import SplashScreen from 'react-native-splash-screen';

import { theme } from './src/global-styled/theme';
import { AppContainer } from './src/router';

// eslint-disable-next-line no-console
console.disableYellowBox = true;
export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* <MainContainer /> */}
      <AppContainer />
    </ThemeProvider>
  );
};

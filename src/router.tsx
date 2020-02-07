import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useScreens } from 'react-native-screens';

import { isIOS } from 'utils/helpers';

import { HomeScreen } from 'view/screens/HomeScreen';

if (isIOS) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useScreens();
}

const HomeStack = createSwitchNavigator({
  HomeScreen,
});

export const AppContainer = () => {
  const Container = createAppContainer(HomeStack);

  return (
    <>
      <StatusBar backgroundColor="#1D65BC" barStyle="light-content" />
      <Container />
    </>
  );
};

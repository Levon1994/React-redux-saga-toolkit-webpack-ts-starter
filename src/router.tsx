import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useScreens } from 'react-native-screens';
import { useSelector } from 'react-redux';

import { isIOS } from 'utils/helpers';
import { RootState } from 'types';

import { HomeScreen } from 'view/screens/HomeScreen';
import { OnBoardingScreen } from 'view/screens/OnBoardingScreen';

if (isIOS) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useScreens();
}

const HeadStack = (isOnBoardingReviewed: boolean) =>
  createSwitchNavigator(
    {
      OnBoardingScreen,
      HomeScreen,
    },
    {
      initialRouteName: isOnBoardingReviewed ? 'HomeScreen' : 'OnBoardingScreen',
    },
  );

export const AppContainer = () => {
  const { isOnBoardingReviewed } = useSelector((state: RootState) => state.onboardingReducer);

  const Container = createAppContainer(HeadStack(isOnBoardingReviewed));

  return (
    <>
      <StatusBar backgroundColor="#1D65BC" barStyle="light-content" />
      <Container />
    </>
  );
};

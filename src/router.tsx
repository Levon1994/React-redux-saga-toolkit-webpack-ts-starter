import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useScreens } from 'react-native-screens';
import { useSelector } from 'react-redux';

import { isIOS } from 'utils/helpers';
import { RootState } from 'types';

import { OnBoardingScreen } from 'view/screens/OnBoardingScreen';

import { SignUpScreen } from 'view/screens/SignUpScreen';
import { HomeScreen } from 'view/screens/HomeScreen';

if (isIOS) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useScreens();
}

const AuthStack = createStackNavigator(
  { SignUp: SignUpScreen },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: '#FFFFFF' },
    },
  },
);

const HomeStack = createStackNavigator(
  { HomeScreen },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: '#FFFFFF' },
    },
  },
);

const HeadStack = (isOnBoardingReviewed: boolean) =>
  createSwitchNavigator(
    {
      OnBoardingScreen,
      Auth: AuthStack,
      Home: HomeStack,
    },
    {
      initialRouteName: isOnBoardingReviewed ? 'Auth' : 'OnBoardingScreen',
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

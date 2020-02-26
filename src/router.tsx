import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useScreens } from 'react-native-screens';
import { useSelector } from 'react-redux';

import { isIOS } from 'utils/helpers';
import { RootState } from 'types';
import Api from 'api';

import { OnBoardingScreen } from 'view/screens/OnBoardingScreen';

import { SignUpScreen } from 'view/screens/SignUpScreen';

import { SelectCharityScreen } from 'view/screens/SelectCharityScreen';
import { AuthorizeCharityScreen } from 'view/screens/AuthorizeCharityScreen';
import { AddCardScreen } from 'view/screens/AddCardScreen';
import { ScanCardIOS } from 'view/screens/ScanCardScreen';
import { SelectWeeklyAmountScreen } from 'view/screens/SelectWeeklyAmountScreen';

import { HomeScreen } from 'view/screens/HomeScreen';

if (isIOS) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useScreens();
}

const AuthStack = createStackNavigator(
  {
    SignUp: SignUpScreen,
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: '#FFFFFF' },
    },
  },
);

const CharityStack = createStackNavigator(
  {
    SelectCharity: SelectCharityScreen,
    AuthorizeCharity: AuthorizeCharityScreen,
    AddCard: AddCardScreen,
    ScanCard: ScanCardIOS,
    SelectWeeklyAmount: SelectWeeklyAmountScreen,
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: '#FFFFFF' },
    },
  },
);

const HomeStack = createStackNavigator(
  { HomeScreen, SelectCharity: SelectCharityScreen },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: '#FFFFFF' },
    },
  },
);

const HeadStack = (initialRouteName: string) =>
  createSwitchNavigator(
    {
      OnBoardingScreen,
      Auth: AuthStack,
      CharityStack,
      Home: HomeStack,
    },
    {
      initialRouteName,
    },
  );

export const AppContainer = () => {
  const { isOnBoardingReviewed } = useSelector((state: RootState) => state.onboardingReducer);
  const userToken = useSelector((state: RootState) => state.authReducer.userToken);

  if (userToken) {
    Api.setAuthToken(userToken);
  }

  let initialRouteName = 'OnBoardingScreen';
  if (isOnBoardingReviewed) {
    initialRouteName = isOnBoardingReviewed ? 'Auth' : 'OnBoardingScreen';
  }

  if (userToken) {
    initialRouteName = userToken ? 'CharityStack' : 'Auth';
  }

  const Container = createAppContainer(HeadStack(initialRouteName));

  return (
    <>
      <StatusBar backgroundColor="#1D65BC" barStyle="light-content" />
      <Container />
    </>
  );
};

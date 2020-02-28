import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';

import { useAction } from 'utils/hooks';

import { getUser } from 'modules/user/actions';
import { getUserCharity, getUserFeed } from 'modules/charity/actions';
import { RootState, Navigation } from 'types';

import { TabLabel, TabScene } from 'view/components';
import { MyImpactContainer } from 'view/containers/MyImpactContainer';
import { PersonalDetails } from 'view/containers/PersonalDetails';
import { CharityItem, FeedItem } from './components';

import { StyledTabBar } from './styled';

enum Tabs {
  MyImpact = 'MyImpact',
  PersonalDetails = 'PersonalDetails',
}

interface Props {
  navigation: Navigation;
}

export const HomeScreen: React.FC<Props> = React.memo(({ navigation }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isShowFeed, setShowFeed] = useState(false);

  const { user, isLoadingUserData } = useSelector((state: RootState) => state.userReducer);
  const { userCharityData, isLoadingCharityData, userFeedData, isLoadingFeedData } = useSelector(
    (state: RootState) => state.charityReducer,
  );

  const getUserData = useAction(getUser);
  const getUserCharityData = useAction(getUserCharity);
  const getUserFeedData = useAction(getUserFeed);

  useEffect(() => {
    const route = navigation.state.params && navigation.state.params.route;
    if (route) {
      getUserData();
      getUserCharityData();
    }
    getUserData();
    getUserCharityData();
    getUserFeedData();
  }, [navigation]);

  const tabHome = [
    { key: Tabs.MyImpact, title: 'My Impact' },
    { key: Tabs.PersonalDetails, title: 'Personal Details' },
  ];

  const renderCharityItem = ({ item }: any) => <CharityItem item={item} />;

  const renderFeedListItem = ({ item }: any) => <FeedItem item={item} />;

  const tabViewScenes = SceneMap({
    [Tabs.MyImpact]: useMemo(
      () =>
        TabScene(() => (
          <MyImpactContainer
            renderListItem={renderCharityItem}
            user={user}
            isLoadingUserData={isLoadingUserData}
            userCharityData={userCharityData}
            isLoadingCharityData={isLoadingCharityData}
            onRefresh={getUserCharityData}
            goToChooseCharity={() => navigation.navigate('SelectCharity', { route: 'edit' })}
            goToProfile={() => navigation.navigate('ProfileSettings')}
          />
        )),
      [user, isLoadingUserData, userCharityData, isLoadingCharityData],
    ),
    [Tabs.PersonalDetails]: useMemo(
      () =>
        TabScene(() => (
          <PersonalDetails
            user={user}
            isLoadingUserData={isLoadingUserData}
            userFeedData={userFeedData}
            isLoadingFeedData={isLoadingFeedData}
            isShowFeed={isShowFeed}
            onPress={setShowFeed}
            renderFeedListItem={renderFeedListItem}
            editCard={() => navigation.navigate('AddCard', { route: 'edit' })}
          />
        )),
      [isShowFeed, user, isLoadingUserData, userFeedData],
    ),
  });

  return (
    <TabView
      renderScene={tabViewScenes}
      onIndexChange={setTabIndex}
      navigationState={{ index: tabIndex, routes: tabHome }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      renderTabBar={props => <StyledTabBar renderLabel={TabLabel} {...props} />}
      lazy
    />
  );
});

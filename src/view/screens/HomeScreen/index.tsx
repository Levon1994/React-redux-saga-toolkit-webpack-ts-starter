import React, { useState, useMemo } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';

import { TabLabel, TabScene } from 'view/components';
import { MyImpactContainer } from 'view/containers/MyImpactContainer';
import { PersonalDetails } from 'view/containers/PersonalDetails';
import { CharityItem, FeedItem } from './components';

import { StyledTabBar } from './styled';

import { listData, feedList } from './fakeData';

enum Tabs {
  MyImpact = 'MyImpact',
  PersonalDetails = 'PersonalDetails',
}

export const HomeScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isShowFeed, setShowFeed] = useState(false);
  const tabHome = [
    { key: Tabs.MyImpact, title: 'My Impact' },
    { key: Tabs.PersonalDetails, title: 'Personal Details' },
  ];

  const renderCharityItem = ({ item }: any) => <CharityItem item={item} />;

  const renderFeedListItem = ({ item }: any) => <FeedItem item={item} />;

  const tabViewScenes = SceneMap({
    [Tabs.MyImpact]: useMemo(
      () =>
        TabScene(() => <MyImpactContainer list={listData} renderListItem={renderCharityItem} />),
      [],
    ),
    [Tabs.PersonalDetails]: useMemo(
      () =>
        TabScene(() => (
          <PersonalDetails
            isShowFeed={isShowFeed}
            feedList={feedList}
            onPress={setShowFeed}
            renderFeedListItem={renderFeedListItem}
          />
        )),
      [isShowFeed, feedList],
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
};

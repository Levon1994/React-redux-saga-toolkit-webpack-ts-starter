import React, { useState, useMemo } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';

import { Text } from 'view/components/uiKit/Text';
import { KeyboardAvoidingView, TabLabel, TabScene } from 'view/components';
import { MyImpactContainer } from 'view/containers/MyImpactContainer';
import { CharityItem } from './components/CharityItem';

import { StyledTabBar } from './styled';

import { listData } from './fakeData';

enum Tabs {
  MyImpact = 'MyImpact',
  PersonalDetails = 'PersonalDetails',
}

export const HomeScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabHome = [
    { key: Tabs.MyImpact, title: 'My Impact' },
    { key: Tabs.PersonalDetails, title: 'Personal Details' },
  ];

  const renderCharityItem = ({ item }: any) => <CharityItem item={item} />;

  const tabViewScenes = SceneMap({
    [Tabs.MyImpact]: useMemo(
      () =>
        TabScene(() => <MyImpactContainer list={listData} renderListItem={renderCharityItem} />),
      [],
    ),
    [Tabs.PersonalDetails]: useMemo(() => TabScene(() => <Text>personal details</Text>), []),
  });

  return (
    <KeyboardAvoidingView>
      <TabView
        renderScene={tabViewScenes}
        onIndexChange={setTabIndex}
        navigationState={{ index: tabIndex, routes: tabHome }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderTabBar={props => <StyledTabBar renderLabel={TabLabel} {...props} />}
        lazy
      />
    </KeyboardAvoidingView>
  );
};

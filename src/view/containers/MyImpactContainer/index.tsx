/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React from 'react';
import { FlatList, ScrollView, RefreshControl } from 'react-native';

import { UserProfile } from 'modules/user/types';
import { UserCharity } from 'modules/charity/types';
import * as Actions from 'modules/charity/actions';

import { DonationComponent } from 'view/components';
import { Box } from 'view/components/uiKit/Box';
import { Loader } from 'view/components/uiKit/Loader';
import { ScreenWidth } from 'utils/helpers';

import {
  Container,
  Header,
  TopHeaderBlock,
  UserNameBlock,
  UserName,
  ProfileViewBlock,
  ProfileViewButton,
  BottomHeaderBlock,
  MainBlock,
  FlatListBlock,
  EditCharitiesBlock,
  EditCharitiesButton,
} from './styled';

interface MyImpactProps {
  user: UserProfile;
  isLoadingUserData: boolean;
  userCharityData: UserCharity;
  isLoadingCharityData: boolean;
  renderListItem: (item: any) => JSX.Element;
  onRefresh: typeof Actions.getUserCharity;
  goToChooseCharity: any;
  goToProfile: any;
}

export const MyImpactContainer = ({
  renderListItem,
  user: { first_name, last_name },
  isLoadingUserData,
  userCharityData,
  isLoadingCharityData,
  onRefresh,
  goToChooseCharity,
  goToProfile,
}: MyImpactProps) => {
  return (
    <Container>
      {/* header */}
      {isLoadingUserData || isLoadingCharityData ? (
        <Loader />
      ) : (
        <>
          <Header>
            {/* top header */}
            <TopHeaderBlock>
              <UserNameBlock>
                <UserName>{`${first_name} ${last_name && last_name.charAt(0)}.`}</UserName>
              </UserNameBlock>
              <ProfileViewBlock>
                <ProfileViewButton onPress={goToProfile} />
              </ProfileViewBlock>
            </TopHeaderBlock>
            {/* bottom header */}
            <BottomHeaderBlock>
              <DonationComponent
                price={userCharityData.weekly_amount}
                description="this week donation"
                isMargin
              />
              <DonationComponent
                price={userCharityData.all_time_amount}
                description="all time donation"
              />
            </BottomHeaderBlock>
          </Header>
          {/* main block */}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flex: 1,
              width: ScreenWidth,
            }}
            refreshControl={
              <RefreshControl
                refreshing={isLoadingUserData || isLoadingCharityData}
                onRefresh={onRefresh}
              />
            }
          >
            <MainBlock>
              {/* flatlist */}
              <FlatListBlock>
                <FlatList
                  data={userCharityData.charities}
                  renderItem={renderListItem}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={index => String(index)}
                  bounces={false}
                  ItemSeparatorComponent={() => <Box height={10} />}
                  style={{
                    width: '100%',
                  }}
                />
              </FlatListBlock>
              {/* button */}
              <EditCharitiesBlock>
                <EditCharitiesButton onPress={goToChooseCharity} />
              </EditCharitiesBlock>
            </MainBlock>
          </ScrollView>
        </>
      )}
    </Container>
  );
};

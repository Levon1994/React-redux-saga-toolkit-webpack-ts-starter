/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from 'types';
import { useAction } from 'utils/hooks';
import { ScreenWidth } from 'utils/helpers';

import { getUserFeed } from 'modules/charity/actions';

import { ProgressBar } from 'view/components/uiKit/ProgressBar';
import { Loader } from 'view/components/uiKit/Loader';
import { globalErrorBlock } from 'view/components';
import { FeedItem } from './FeedItem';

import {
  Container,
  Header,
  TopHeaderBlock,
  TitleBlock,
  Title,
  ProgressBarBlock,
  DonateBlock,
  DonateInfo,
  BottomHeaderBlock,
  CardBlock,
  CardPlaceholder,
  CardInfo,
  CardEndInfo,
  EditIconBlock,
  EditIcon,
  MainBlock,
  ShowHideFeedButton,
  FlatListBlock,
} from './styled';

export const PersonalDetails = ({ editCard, onRefresh }: any) => {
  const [isShowFeed, setShowFeed] = useState(false);

  const getUserFeedData = useAction(getUserFeed);

  const {
    user: { weekly_amount, weekly_goal, card },
    isLoadingUserData,
    getUserDataError,
  } = useSelector((state: RootState) => state.userReducer);
  const { userFeedData, next_page, getUserFeedError } = useSelector(
    (state: RootState) => state.charityReducer,
  );
  console.log('userFeedData: ', userFeedData);

  const showFeed = isShowFeed ? 'Hide feed' : 'Show feed';
  const progressData = (weekly_amount * 100) / weekly_goal;

  const renderFeedListItem = ({ item }: any) => <FeedItem item={item} />;

  const loadMoreItems = () => {
    if (next_page) {
      getUserFeedData(true);
    }
  };

  return (
    <Container>
      {/* header */}
      {isLoadingUserData ? (
        <Loader />
      ) : (
        <>
          {globalErrorBlock(getUserFeedError) || globalErrorBlock(getUserDataError)}
          {Object.keys(getUserFeedError).length > 0 || Object.keys(getUserDataError).length > 0 || (
            <Header>
              {/* top header */}
              <TopHeaderBlock>
                <TitleBlock>
                  <Title>Weekly goal</Title>
                </TitleBlock>
                <ProgressBarBlock>
                  {/* progressbar */}
                  <ProgressBar progressValue={`${progressData}%`} />
                </ProgressBarBlock>
                <DonateBlock>
                  <DonateInfo>{`Donate $${weekly_amount} of $${weekly_goal}`}</DonateInfo>
                  <DonateInfo>Tax Deductible</DonateInfo>
                </DonateBlock>
              </TopHeaderBlock>
              {/* bottom header */}
              <BottomHeaderBlock onPress={editCard}>
                <CardBlock>
                  <CardPlaceholder />
                  <CardInfo>Card ending </CardInfo>
                  <CardEndInfo>{card.card_ending}</CardEndInfo>
                </CardBlock>
                <EditIconBlock>
                  <EditIcon />
                </EditIconBlock>
              </BottomHeaderBlock>
            </Header>
          )}
          {/* main block */}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flex: 1,
              width: ScreenWidth,
            }}
            refreshControl={<RefreshControl refreshing={isLoadingUserData} onRefresh={onRefresh} />}
          >
            <MainBlock>
              {/* show/hide button */}
              {Object.keys(getUserFeedError).length > 0 ||
                Object.keys(getUserDataError).length > 0 || (
                  <ShowHideFeedButton
                    label={showFeed}
                    bg={isShowFeed ? '#E4EDF7' : '#1D65BC'}
                    color={isShowFeed && '#1D65BC'}
                    onPress={() => setShowFeed(!isShowFeed)}
                  />
                )}
              {/* flatlist */}
              {isShowFeed && (
                <FlatListBlock>
                  <FlatList
                    data={userFeedData}
                    renderItem={renderFeedListItem}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => String(index)}
                    onEndReachedThreshold={0.1}
                    onEndReached={loadMoreItems}
                    style={{
                      width: '100%',
                    }}
                  />
                </FlatListBlock>
              )}
            </MainBlock>
          </ScrollView>
        </>
      )}
    </Container>
  );
};

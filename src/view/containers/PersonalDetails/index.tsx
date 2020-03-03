/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from 'types';
import { useAction } from 'utils/hooks';

import { getUserFeed } from 'modules/charity/actions';

import { ProgressBar } from 'view/components/uiKit/ProgressBar';
import { Loader } from 'view/components/uiKit/Loader';
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

export const PersonalDetails = ({ editCard }: any) => {
  const [isShowFeed, setShowFeed] = useState(false);

  const getUserFeedData = useAction(getUserFeed);

  const {
    user: { weekly_amount, weekly_goal, card },
    isLoadingUserData,
  } = useSelector((state: RootState) => state.userReducer);
  const { userFeedData, next_page } = useSelector((state: RootState) => state.charityReducer);

  const showFeed = isShowFeed ? 'Hide feed' : 'Show feed';
  const progressData = (weekly_amount * 100) / weekly_goal;

  const renderFeedListItem = ({ item }: any) => <FeedItem item={item} />;

  const loadMoreItems = () => {
    if (next_page) {
      getUserFeedData();
    }
  };
  return (
    <Container>
      {/* header */}
      {isLoadingUserData ? (
        <Loader />
      ) : (
        <>
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
          {/* main block */}
          <MainBlock>
            {/* show/hide button */}
            <ShowHideFeedButton
              label={showFeed}
              bg={isShowFeed ? '#E4EDF7' : '#1D65BC'}
              color={isShowFeed && '#1D65BC'}
              onPress={() => setShowFeed(!isShowFeed)}
            />
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
        </>
      )}
    </Container>
  );
};

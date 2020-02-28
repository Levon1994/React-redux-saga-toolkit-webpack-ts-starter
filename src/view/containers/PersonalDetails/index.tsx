/* eslint-disable no-console */
import React from 'react';
import { FlatList } from 'react-native';

import { ProgressBar } from 'view/components/uiKit/ProgressBar';
import { Loader } from 'view/components/uiKit/Loader';

import { PersonalDetailsProps } from './types';
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

export const PersonalDetails = ({
  isShowFeed,
  onPress,
  renderFeedListItem,
  user: { weekly_amount, weekly_goal, card },
  isLoadingUserData,
  editCard,
  userFeedData,
  isLoadingFeedData,
}: PersonalDetailsProps) => {
  const showFeed = isShowFeed ? 'Hide feed' : 'Show feed';
  const progressData = (weekly_amount * 100) / weekly_goal;
  return (
    <Container>
      {/* header */}
      {isLoadingUserData || isLoadingFeedData ? (
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
              onPress={() => onPress(!isShowFeed)}
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
                  bounces={false}
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

import React from 'react';
import { Image, FlatList } from 'react-native';

import { ProgressBar } from 'view/components/uiKit/ProgressBar';
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
  CardInfo,
  CardEndInfo,
  EditIconBlock,
  MainBlock,
  ShowHideFeedButton,
  FlatListBlock,
} from './styled';

export const PersonalDetails = ({
  isShowFeed,
  onPress,
  renderFeedListItem,
  feedList,
}: PersonalDetailsProps) => {
  const showFeed = isShowFeed ? 'Hide feed' : 'Show feed';
  return (
    <Container>
      {/* header */}
      <Header>
        {/* top header */}
        <TopHeaderBlock>
          <TitleBlock>
            <Title>Weekly goal</Title>
          </TitleBlock>
          <ProgressBarBlock>
            {/* progressbar */}
            <ProgressBar progressValue="60%" />
          </ProgressBarBlock>
          <DonateBlock>
            <DonateInfo>Donate $60 of $75</DonateInfo>
            <DonateInfo>Tax Deductible</DonateInfo>
          </DonateBlock>
        </TopHeaderBlock>
        {/* bottom header */}
        <BottomHeaderBlock onPress={() => console.log('12')}>
          <CardBlock>
            <Image
              source={require('assets/img/cardPlaceholder.png')}
              style={{ width: 16, height: 13, marginRight: 14 }}
            />
            <CardInfo>Card ending </CardInfo>
            <CardEndInfo>7842</CardEndInfo>
          </CardBlock>
          <EditIconBlock>
            <Image source={require('assets/img/editIcon.png')} style={{ width: 13, height: 13 }} />
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
              data={feedList}
              renderItem={renderFeedListItem}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => String(item.id)}
              bounces={false}
              style={{
                width: '100%',
              }}
            />
          </FlatListBlock>
        )}
      </MainBlock>
    </Container>
  );
};

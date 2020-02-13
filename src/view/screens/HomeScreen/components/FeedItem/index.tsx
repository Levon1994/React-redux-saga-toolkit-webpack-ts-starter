import React from 'react';

import { Image } from 'react-native';
import { Box } from 'view/components/uiKit/Box';

import {
  DayBlock,
  HorizontalView,
  DayNameBlock,
  DayName,
  FeedInfoBlock,
  NamePriceBlock,
  FeedIconBlock,
  FeedName,
  FeedPrice,
  FeedAdded,
} from './styled';

interface FeedItemProps {
  item: any;
}

export const FeedItem = ({ item }: FeedItemProps) => (
  <>
    <DayBlock>
      <HorizontalView />
      <DayNameBlock>
        <DayName>{item.day}</DayName>
      </DayNameBlock>
    </DayBlock>
    {item.dataItem.map((feed: { name: string; price: number; add: number }) => (
      <FeedInfoBlock>
        <NamePriceBlock flex={3}>
          <FeedIconBlock>
            <Image source={require('assets/img/feedIcon.png')} style={{ width: 18, height: 13 }} />
          </FeedIconBlock>
          <Box width="82%">
            <FeedName>{feed.name}</FeedName>
            <FeedPrice>${feed.price}</FeedPrice>
          </Box>
        </NamePriceBlock>
        <Box flex={1} align="flex-end">
          <FeedAdded>+ ${feed.add}</FeedAdded>
        </Box>
      </FeedInfoBlock>
    ))}
  </>
);

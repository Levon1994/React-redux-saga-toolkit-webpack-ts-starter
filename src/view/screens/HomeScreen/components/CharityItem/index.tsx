import React from 'react';
import { ImageSourcePropType } from 'react-native';

import {
  Container,
  RightBlock,
  LogoBlock,
  StyledImage,
  CharityNameBlock,
  CharityName,
  LeftBlock,
  DonatedBlock,
  DonatedValue,
  Description,
} from './styled';

interface ListProps {
  id: number;
  logo: ImageSourcePropType;
  charityName: string;
  donate: string;
}

interface CharityItemProps {
  item: ListProps;
}

export const CharityItem = ({ item }: CharityItemProps) => (
  <Container
    style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    }}
  >
    <RightBlock>
      <LogoBlock>
        <StyledImage source={item.logo} />
      </LogoBlock>
      <CharityNameBlock>
        <CharityName>{item.charityName}</CharityName>
      </CharityNameBlock>
    </RightBlock>
    <LeftBlock>
      <DonatedBlock>
        <DonatedValue>{`$${item.donate}`}</DonatedValue>
      </DonatedBlock>
      <Description>donated</Description>
    </LeftBlock>
  </Container>
);

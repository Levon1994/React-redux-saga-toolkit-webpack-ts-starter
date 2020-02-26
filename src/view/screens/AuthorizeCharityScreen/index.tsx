import React from 'react';

import { Navigation } from 'types';

import {
  Container,
  Header,
  TopHeaderBlock,
  GoBackBlock,
  GoBackIcon,
  LogoIcon,
  MainBlock,
  TopBlock,
  Title,
  SubTitle,
  AuthorizeIcon,
  ButtonWrapper,
  StyledButton,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const AuthorizeCharityScreen: React.FC<Props> = ({ navigation }) => (
  <Container>
    {/* header */}
    <Header>
      <TopHeaderBlock>
        <GoBackBlock onPress={() => navigation.navigate('SelectCharity')}>
          <GoBackIcon />
        </GoBackBlock>
        <LogoIcon />
      </TopHeaderBlock>
    </Header>
    {/* main block */}
    <MainBlock>
      <TopBlock>
        <Title>Authorise charity purchase roundup</Title>
        <SubTitle>
          With your confirmation, we can make sure that all transactions are conducted in the safest
          way possible.
        </SubTitle>
        <AuthorizeIcon />
      </TopBlock>
      <ButtonWrapper>
        <StyledButton onPress={() => navigation.navigate('AddCard')} />
      </ButtonWrapper>
    </MainBlock>
  </Container>
);

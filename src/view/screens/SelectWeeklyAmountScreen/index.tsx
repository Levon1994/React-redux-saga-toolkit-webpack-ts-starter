// /* eslint-disable no-console */
import React, { useState } from 'react';

import { Navigation } from 'types';

import { WeeklyGoal } from 'view/components';

import {
  Container,
  Header,
  Title,
  SubTitle,
  MainBlock,
  ButtonWrapper,
  StyledButton,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const SelectWeeklyAmountScreen: React.FC<Props> = ({ navigation }) => {
  const [weeklyValue, setWeeklyAmount] = useState(2);
  return (
    <Container>
      {/* header */}
      <Header>
        <Title>Select weekly amount</Title>
        <SubTitle>Set the maximum weekly amount for round up. Minimum $2.</SubTitle>
      </Header>
      {/* main block */}
      <MainBlock>
        <WeeklyGoal
          weeklyValue={weeklyValue}
          onValueChange={(value: number) => setWeeklyAmount(value)}
        />
        <ButtonWrapper>
          <StyledButton onPress={() => navigation.navigate('Home')} />
        </ButtonWrapper>
      </MainBlock>
    </Container>
  );
};

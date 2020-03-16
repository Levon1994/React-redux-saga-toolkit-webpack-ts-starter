// /* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAction } from 'utils/hooks';
import { Navigation, RootState } from 'types';

import { setWeeklyAmount, updateUser } from 'modules/user/actions';

import { WeeklyGoal } from 'view/components';
import { Text } from 'view/components/uiKit/Text';
import { Box } from 'view/components/uiKit/Box';
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
  const { user, isLoadingUpdateUserData, errors, isSetWeeklyGoal } = useSelector(
    (state: RootState) => state.userReducer,
  );

  const changeWeeklyAmount = useAction(setWeeklyAmount);
  const updateUserWeeklyAmount = useAction(updateUser);

  useEffect(() => {
    if (isSetWeeklyGoal) {
      navigation.navigate('Home');
    }
  }, [isSetWeeklyGoal]);

  const showGlobalErrors =
    Object.keys(errors).length === 1 && Object.keys(errors)[0] === 'object_error';

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
          weeklyValue={user.weekly_goal}
          onValueChange={(value: number) => changeWeeklyAmount(value)}
        />
        {showGlobalErrors && (
          <Box align="center" center mt={20}>
            <Text size={14} color="red" width="70%" center weight="regular">
              {Object.values(errors)}
            </Text>
          </Box>
        )}
        <ButtonWrapper>
          <StyledButton
            onPress={updateUserWeeklyAmount}
            loading={isLoadingUpdateUserData}
            reverseLoader
          />
        </ButtonWrapper>
      </MainBlock>
    </Container>
  );
};

/* eslint-disable no-console */
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAction } from 'utils/hooks';
import { pick } from 'utils/helpers';

import { Navigation, RootState } from 'types';

import * as Actions from 'modules/auth/actions';
import { setWeeklyAmount, updateUser } from 'modules/user/actions';

import { WeeklyGoal, globalErrorBlock } from 'view/components';
import { Input } from 'view/components/uiKit/Input';
import { Box } from 'view/components/uiKit/Box';

import {
  Container,
  Header,
  GoBackBlock,
  GoBackIcon,
  Title,
  StyledKeyboardAvoidingView,
  MainBlock,
  StyledScrollView,
  InputWrapper,
  PaymentDetailsBlock,
  GoToPaymentDetails,
  PaymentInfoBlock,
  FeedIconBlock,
  StyledCardImage,
  PaymentInfoWrapper,
  PaymentTitle,
  PaymentInfo,
  StyledNextIcon,
  ButtonWrapper,
  StyledButton,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const ProfileSettingsScreen: React.FC<Props> = React.memo(({ navigation }) => {
  const { user, errors, isLoadingUpdateUserData, isUpdateUserData } = useSelector(
    (state: RootState) => state.userReducer,
  );

  const changeWeeklyAmount = useAction(setWeeklyAmount);
  const changeValue = useAction(Actions.changeValue);
  const updateUserData = useAction(updateUser);

  useEffect(() => {
    if (isUpdateUserData) {
      navigation.navigate('HomeScreen');
    }
  }, [isUpdateUserData]);

  const goBack = useCallback(() => {
    navigation.navigate('HomeScreen', { route: 'notUpdate' });
  }, []);

  const isButtonDisabled = React.useMemo(() => {
    const required = pick(user, ['first_name', 'last_name', 'email']);
    return (
      Object.values(required).some(v => !v.trim()) ||
      (Object.keys(errors)[0] !== 'object_error' && Object.values(errors).some(v => !!v.trim()))
    );
  }, [user, errors]);

  return (
    <Container>
      {/* header */}
      <Header>
        <GoBackBlock onPress={goBack}>
          <GoBackIcon />
        </GoBackBlock>
        <Title>Profile settings</Title>
      </Header>
      {/* main block */}
      <StyledKeyboardAvoidingView>
        <MainBlock>
          {Object.keys(errors).length === 1 &&
            Object.keys(errors)[0] === 'object_error' &&
            globalErrorBlock(errors)}
          <StyledScrollView>
            <Box mb={10}>
              <WeeklyGoal
                weeklyValue={user.weekly_goal}
                onValueChange={(value: number) => changeWeeklyAmount(value)}
              />
            </Box>
            <Box mb={15}>
              <InputWrapper>
                <Input
                  label="First Name"
                  placeholder="Alex"
                  maxLength={50}
                  key="firstName"
                  textContentType="name"
                  value={user.first_name}
                  onChangeText={(value: string) => changeValue({ first_name: value })}
                  error={errors.first_name}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  maxLength={50}
                  key="lastName"
                  textContentType="name"
                  value={user.last_name}
                  onChangeText={(value: string) => changeValue({ last_name: value })}
                  error={errors.last_name}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  label="Email Address"
                  placeholder="example@mail.com"
                  maxLength={50}
                  key="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  autoCompleteType="email"
                  value={user.email}
                  onChangeText={(value: string) => changeValue({ email: value })}
                  error={errors.email}
                />
              </InputWrapper>
            </Box>
            <PaymentDetailsBlock>
              <GoToPaymentDetails onPress={() => navigation.navigate('AddCard', { route: 'edit' })}>
                <PaymentInfoBlock>
                  <FeedIconBlock>
                    <StyledCardImage />
                  </FeedIconBlock>
                  <PaymentInfoWrapper>
                    <PaymentTitle>Payment details</PaymentTitle>
                    <PaymentInfo>{`Card ending ${user.card.card_ending}`}</PaymentInfo>
                  </PaymentInfoWrapper>
                </PaymentInfoBlock>
                <StyledNextIcon />
              </GoToPaymentDetails>
            </PaymentDetailsBlock>
          </StyledScrollView>
          <ButtonWrapper>
            <StyledButton
              disabled={isButtonDisabled}
              onPress={updateUserData}
              loading={isLoadingUpdateUserData}
              reverseLoader
            />
          </ButtonWrapper>
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
});

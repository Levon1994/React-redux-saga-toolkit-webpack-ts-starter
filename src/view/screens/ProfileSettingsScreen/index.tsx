/* eslint-disable no-console */
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAction } from 'utils/hooks';

import { Navigation, RootState } from 'types';

import * as Actions from 'modules/auth/actions';
import { setWeeklyAmount } from 'modules/user/actions';

import { WeeklyGoal } from 'view/components';
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
  const { user, errors } = useSelector((state: RootState) => state.userReducer);

  const changeWeeklyAmount = useAction(setWeeklyAmount);
  const changeValue = useAction(Actions.changeValue);

  const goBack = useCallback(() => {
    navigation.navigate('HomeScreen', { route: 'notUpdate' });
  }, []);

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
                  error={errors && errors.first_name}
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
                  error={errors && errors.last_name}
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
                  error={errors && errors.email}
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
            <StyledButton onPress={() => navigation.navigate('HomeScreen')} />
          </ButtonWrapper>
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
});

/* eslint-disable no-console */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useAction } from 'utils/hooks';

import { Navigation, RootState } from 'types';

import * as Actions from 'modules/auth/actions';

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

export const ProfileSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [weeklyValue, setWeeklyAmount] = useState(2);
  const { values, errors } = useSelector((state: RootState) => state.authReducer);

  const changeValue = useAction(Actions.changeValue);

  return (
    <Container>
      {/* header */}
      <Header>
        <GoBackBlock onPress={() => navigation.navigate('HomeScreen')}>
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
                weeklyValue={weeklyValue}
                onValueChange={(value: number) => setWeeklyAmount(value)}
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
                  value={values.firstName}
                  onChangeText={(value: string) => changeValue({ firstName: value })}
                  error={errors.firstName || errors.first_name}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  maxLength={50}
                  key="lastName"
                  textContentType="name"
                  value={values.lastName}
                  onChangeText={(value: string) => changeValue({ lastName: value })}
                  error={errors.lastName || errors.last_name}
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
                  value={values.email}
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
                    <PaymentInfo>Card ending 7842</PaymentInfo>
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
};

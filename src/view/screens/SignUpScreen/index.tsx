import React from 'react';
import { useSelector } from 'react-redux';

import { useAction } from 'utils/hooks';
import { RootState, Navigation } from 'types';

import * as Actions from 'modules/auth/actions';

import { Input } from 'view/components/uiKit/Input';
import {
  Container,
  Header,
  Title,
  StyledKeyboardAvoidingView,
  MainBlock,
  StyledScrollView,
  InputWrapper,
  ButtonWrapper,
  StyledButton,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const changeValue = useAction(Actions.changeValue);
  const values = useSelector((state: RootState) => state.authReducer);
  return (
    <Container>
      {/* header */}
      <Header>
        <Title>Let’s do this!</Title>
      </Header>
      {/* main block */}
      <StyledKeyboardAvoidingView>
        <MainBlock>
          <StyledScrollView>
            <InputWrapper>
              <Input
                label="First Name"
                placeholder="Alex"
                maxLength={100}
                textContentType="firstName"
                value={values.firstName.value}
                onChangeText={(value: any) => changeValue('firstName', value)}
                error={values.firstName.error}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Last Name"
                placeholder="Doe"
                maxLength={100}
                textContentType="lastName"
                value={values.lastName.value}
                onChangeText={(value: any) => changeValue('lastName', value)}
                error={values.lastName.error}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Email Address"
                placeholder="example@mail.com"
                maxLength={100}
                textContentType="email"
                keyboardType="email-address"
                autoCompleteType="email"
                value={values.email.value}
                onChangeText={(value: any) => changeValue('email', value)}
                error={values.email.error}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Password"
                placeholder="Password"
                secureTextEntry
                maxLength={100}
                textContentType="password"
                autoCompleteType="password"
                value={values.password.value}
                onChangeText={(value: any) => changeValue('password', value)}
                error={values.password.error}
              />
            </InputWrapper>
          </StyledScrollView>
          <ButtonWrapper>
            <StyledButton label="Sign Up" onPress={() => navigation.navigate('SelectCharity')} />
          </ButtonWrapper>
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
};

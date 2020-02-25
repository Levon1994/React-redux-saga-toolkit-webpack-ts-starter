import React from 'react';
import { useSelector } from 'react-redux';

import { useAction } from 'utils/hooks';
import { pick } from 'utils/helpers';
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

export const SignUpScreen: React.FC<Props> = React.memo(({ navigation }) => {
  const { values, errors, registerStatus } = useSelector((state: RootState) => state.authReducer);
  const { userId } = useSelector((state: RootState) => state.userReducer);

  const changeValue = useAction(Actions.changeValue);
  const auth = useAction(Actions.register);

  React.useEffect(() => {
    if (userId) {
      navigation.navigate('SelectCharity', { route: 'choose' });
    }
  }, [userId]);

  const isButtonDisabled = React.useMemo(() => {
    const required = pick(values, ['firstName', 'lastName', 'email', 'password']);
    return (
      Object.values(required).some(v => !v.trim()) || Object.values(errors).some(v => !!v.trim())
    );
  }, [values, errors]);

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
            <InputWrapper>
              <Input
                label="Password"
                placeholder="Password"
                secureTextEntry
                maxLength={50}
                key="password"
                textContentType="password"
                autoCompleteType="password"
                value={values.password}
                onChangeText={(value: string) => changeValue({ password: value })}
                error={errors.password}
              />
            </InputWrapper>
          </StyledScrollView>
          <ButtonWrapper>
            <StyledButton
              disabled={isButtonDisabled}
              onPress={auth}
              loading={registerStatus}
              reverseLoader
            />
          </ButtonWrapper>
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
});

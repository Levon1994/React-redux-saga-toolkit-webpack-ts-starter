/* eslint-disable no-console */
import React from 'react';
// import { useSelector } from 'react-redux';

// import { useAction } from 'utils/hooks';

import { Navigation } from 'types';

// import * as Actions from 'modules/auth/actions';

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
  ButtonWrapper,
  StyledButton,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const CreateBankAccountScreen: React.FC<Props> = React.memo(({ navigation }) => {
  const route = navigation.state.params && navigation.state.params;
  console.log('route: ', route);

  return (
    <Container>
      {/* header */}
      <Header>
        <GoBackBlock onPress={() => navigation.goBack()}>
          <GoBackIcon />
        </GoBackBlock>
        <Title>Add account</Title>
      </Header>
      {/* main block */}
      <StyledKeyboardAvoidingView>
        <MainBlock>
          <StyledScrollView>
            {/* Todo:: add bank's logo */}
            <Box mb={15}>
              <InputWrapper>
                <Input
                  label="Customer Registration Number"
                  placeholder="Customer Registration Number"
                  maxLength={50}
                  key="loginId"
                  textContentType="name"
                  value=""
                  onChangeText={(value: string) => console.log(value)}
                  // value={user.first_name}
                  // onChangeText={(value: string) => changeValue({ first_name: value })}
                  // error={errors && errors.first_name}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  label="Password"
                  placeholder="Password"
                  maxLength={50}
                  secureTextEntry
                  key="password"
                  textContentType="name"
                  value=""
                  onChangeText={(value: string) => console.log(value)}
                  // value={user.last_name}
                  // onChangeText={(value: string) => changeValue({ last_name: value })}
                  // error={errors && errors.last_name}
                />
              </InputWrapper>
              {route.item.securityCodeCaption && (
                <InputWrapper>
                  <Input
                    label={route.item.securityCodeCaption}
                    placeholder={route.item.securityCodeCaption}
                    maxLength={50}
                    key="securityCode"
                    textContentType="name"
                    value=""
                    onChangeText={(value: string) => console.log(value)}
                    // value={user.last_name}
                    // onChangeText={(value: string) => changeValue({ last_name: value })}
                    // error={errors && errors.last_name}
                  />
                </InputWrapper>
              )}
              {route.item.secondaryLoginIdCaption && (
                <InputWrapper>
                  <Input
                    label={route.item.secondaryLoginIdCaption}
                    placeholder={route.item.secondaryLoginIdCaption}
                    maxLength={50}
                    key="secondaryLoginId"
                    textContentType="name"
                    value=""
                    onChangeText={(value: string) => console.log(value)}
                    // value={user.last_name}
                    // onChangeText={(value: string) => changeValue({ last_name: value })}
                    // error={errors && errors.last_name}
                  />
                </InputWrapper>
              )}
            </Box>
          </StyledScrollView>
          <ButtonWrapper>
            <StyledButton onPress={() => console.log('screen')} />
          </ButtonWrapper>
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
});

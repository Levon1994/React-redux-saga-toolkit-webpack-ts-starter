/* eslint-disable no-console */
import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

import { useAction } from 'utils/hooks';
import { pick } from 'utils/helpers';

import { Navigation, RootState } from 'types';

import * as Actions from 'modules/bank/actions';

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
  ErrorBlock,
  ErrorTitlte,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const CreateBankAccountScreen: React.FC<Props> = React.memo(({ navigation }) => {
  const route = navigation.state.params && navigation.state.params;
  const { values, errors, isLoadingCreateBankAccount } = useSelector(
    (state: RootState) => state.bankReducer,
  );
  const { createdBankAccountStatus } = useSelector((state: RootState) => state.userReducer);
  const changeValue = useAction(Actions.changeValue);
  const createBankAccount = useAction(Actions.createBankAccount);

  React.useEffect(() => {
    if (createdBankAccountStatus) {
      navigation.navigate('AddCard');
    }
  }, [createdBankAccountStatus]);

  const isButtonDisabled = React.useMemo(() => {
    const required = pick(values, ['loginId', 'password']);
    return Object.values(required).some(v => !v.trim());
  }, [values]);
  return (
    <Container>
      {/* header */}
      <Header>
        <GoBackBlock onPress={() => navigation.goBack()}>
          <GoBackIcon />
        </GoBackBlock>
        <Title>Add account</Title>
      </Header>
      {Object.keys(errors).length === 1 && Object.keys(errors)[0] === 'object_error' && (
        <ErrorBlock>
          <ErrorTitlte>{Object.values(errors)}</ErrorTitlte>
        </ErrorBlock>
      )}
      {/* main block */}
      <StyledKeyboardAvoidingView>
        <MainBlock>
          <StyledScrollView>
            {/* Todo:: add bank's logo */}
            {route.logo && (
              <Image
                source={{ uri: route.logo }}
                style={{ width: '20%', height: '20%', marginBottom: 5 }}
                resizeMode="contain"
              />
            )}
            <Box mb={15}>
              <InputWrapper>
                <Input
                  label="Customer Registration Number"
                  placeholder="Customer Registration Number"
                  maxLength={50}
                  key="loginId"
                  textContentType="name"
                  value={values.loginId}
                  onChangeText={(value: string) => changeValue({ loginId: value })}
                  error={errors && errors.loginId}
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
                  value={values.password}
                  onChangeText={(value: string) => changeValue({ password: value })}
                  error={errors && errors.password}
                />
              </InputWrapper>
              {route.securityCodeCaption && (
                <InputWrapper>
                  <Input
                    label={route.securityCodeCaption}
                    placeholder={route.securityCodeCaption}
                    maxLength={50}
                    key="securityCode"
                    textContentType="name"
                    value={values.securityCode}
                    onChangeText={(value: string) => changeValue({ securityCode: value })}
                    error={errors && errors.securityCode}
                  />
                </InputWrapper>
              )}
              {route.secondaryLoginIdCaption && (
                <InputWrapper>
                  <Input
                    label={route.secondaryLoginIdCaption}
                    placeholder={route.secondaryLoginIdCaption}
                    maxLength={50}
                    key="secondaryLoginId"
                    textContentType="name"
                    value={values.secondaryLoginId}
                    onChangeText={(value: string) => changeValue({ secondaryLoginId: value })}
                    error={errors && errors.secondaryLoginId}
                  />
                </InputWrapper>
              )}
            </Box>
          </StyledScrollView>
          <ButtonWrapper>
            <StyledButton
              onPress={() => createBankAccount(route.bank_id)}
              disabled={isButtonDisabled}
              loading={isLoadingCreateBankAccount}
              reverseLoader
            />
          </ButtonWrapper>
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
});

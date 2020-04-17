/* eslint-disable no-console */
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import { useAction } from 'utils/hooks';
import { isIOS, pick } from 'utils/helpers';
import { Navigation, RootState } from 'types';

import * as Actions from 'modules/card/actions';

import { Input } from 'view/components/uiKit/Input';
import { Box } from 'view/components/uiKit/Box';
import { Text } from 'view/components/uiKit/Text';
import { Loader } from 'view/components/uiKit/Loader';

import {
  Container,
  Header,
  GoBackBlock,
  GoBackIcon,
  TopHeaderBlock,
  Title,
  StyledKeyboardAvoidingView,
  MainBlock,
  StyledScrollView,
  InputWrapper,
  ButtonWrapper,
  Deductible,
  StyledButton,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const AddCardScreen: React.FC<Props> = ({ navigation }) => {
  const route = navigation.state.params ? navigation.state.params.route : 'create';
  const isEditViewScreen = route === 'edit';

  const [isTooltipVisible, toogleTooltipVisible] = useState(false);

  const {
    card_number,
    cardHolder,
    expiryDate,
    cvcValue,
    errors,
    createStatus,
    isLoadingCreateUserCard,
    isChange,
    isLoadingGetUserCard,
    globalErrors,
  } = useSelector((state: RootState) => state.cardReducer);

  const changeCardData = useAction(Actions.changeCardData);
  const scanCard = useAction(Actions.scanCard);
  const createUserCard = useAction(Actions.createUserCard);
  const getUserCard = useAction(Actions.getUserCard);

  useEffect(() => {
    if (isEditViewScreen) {
      getUserCard();
    }
  }, [isEditViewScreen, route]);

  useEffect(() => {
    if (createStatus) {
      navigation.navigate('SelectWeeklyAmount');
    }
  }, [createStatus]);

  const handleScanIconPress = useCallback(() => {
    if (isIOS) {
      navigation.navigate('ScanCard');
    } else {
      scanCard();
    }
  }, []);

  const goBack = React.useCallback(() => navigation.goBack(), []);

  const createCard = React.useCallback(() => {
    createUserCard();
  }, []);

  const isButtonDisabled = React.useMemo(() => {
    const required = pick({ card_number, cardHolder, expiryDate, cvcValue }, [
      'card_number',
      'cardHolder',
      'expiryDate',
      'cvcValue',
    ]);
    return (
      Object.values(required).some(v => !v.trim()) ||
      (Object.keys(globalErrors)[0] !== 'object_error' &&
        Object.keys(globalErrors)[0] !== 'card' &&
        Object.values(errors).some(v => !!v.trim()))
    );
  }, [card_number, cardHolder, expiryDate, cvcValue, errors]);

  const showGlobalErrors =
    Object.keys(globalErrors).length === 1 &&
    (Object.keys(globalErrors)[0] === 'object_error' || Object.keys(globalErrors)[0] === 'card');

  return (
    <Container>
      {/* header */}
      <Header isEditViewScreen={isEditViewScreen}>
        {isEditViewScreen && (
          <GoBackBlock onPress={goBack}>
            <GoBackIcon />
          </GoBackBlock>
        )}
        <TopHeaderBlock>
          <Title>{isEditViewScreen ? 'Payment details' : 'Add your card'}</Title>
        </TopHeaderBlock>
      </Header>
      {/* main block */}
      <StyledKeyboardAvoidingView>
        <MainBlock>
          {isLoadingGetUserCard ? (
            <Loader />
          ) : (
            <StyledScrollView>
              <InputWrapper>
                <Input
                  type="credit-card"
                  keyboardType="numeric"
                  placeholder="0000 0000 0000 0000"
                  options={{
                    mask: '9999 9999 9999 9999',
                    obfuscated: !isChange && isEditViewScreen,
                  }}
                  textContentType="creditCardNumber"
                  value={card_number}
                  onChangeText={(value: string) => changeCardData('card_number', value)}
                  sourceLeftIcon={require('assets/img/cardIcon.png')}
                  sourceRightIcon={require('assets/img/scanIcon.png')}
                  handleIconPress={handleScanIconPress}
                  error={errors.card_number}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  placeholder="Cardholder name"
                  maxLength={50}
                  textContentType="username"
                  sourceLeftIcon={require('assets/img/cardHolder.png')}
                  value={cardHolder}
                  onChangeText={(value: string) => changeCardData('cardHolder', value)}
                  error={errors.card_holder}
                />
              </InputWrapper>
              <Box mb={30}>
                <Box row>
                  <View style={{ flex: 2, marginRight: 12 }}>
                    <Input
                      type="datetime"
                      keyboardType="numeric"
                      placeholder="MM/YY"
                      options={{
                        format: 'MM/YY',
                      }}
                      maxLength={5}
                      sourceLeftIcon={require('assets/img/dateIcon.png')}
                      value={expiryDate}
                      onChangeText={(value: string) => changeCardData('expiryDate', value)}
                      error={errors.card_expiration}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      type="custom"
                      keyboardType="numeric"
                      placeholder="CVC"
                      options={{ mask: '999' }}
                      maxLength={3}
                      sourceLeftIcon={require('assets/img/cvcIcon.png')}
                      sourceTooltipRightIcon={require('assets/img/infoIcon.png')}
                      value={cvcValue}
                      onChangeText={(value: string) => changeCardData('cvcValue', value)}
                      handleIconPress={() => toogleTooltipVisible(true)}
                      isTooltip
                      isTooltipVisible={isTooltipVisible}
                      onClose={() => toogleTooltipVisible(false)}
                      error={errors.cvcValue || errors.card_cvc}
                    />
                  </View>
                </Box>
              </Box>
              {showGlobalErrors && (
                <Box align="center" center>
                  <Text size={14} color="red" width="70%" center weight="regular">
                    {Object.values(globalErrors)}
                  </Text>
                </Box>
              )}
            </StyledScrollView>
          )}
          <ButtonWrapper>
            <Deductible>Tax Deductible</Deductible>
            <StyledButton
              disabled={isButtonDisabled}
              onPress={createCard}
              loading={isLoadingCreateUserCard}
              reverseLoader
              label={isEditViewScreen ? 'Save' : 'Continue'}
            />
          </ButtonWrapper>
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
};

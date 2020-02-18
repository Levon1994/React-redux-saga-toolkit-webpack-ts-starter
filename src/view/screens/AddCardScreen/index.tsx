/* eslint-disable no-console */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import { useAction } from 'utils/hooks';
import { Navigation, RootState } from 'types';

import * as Actions from 'modules/card/actions';

import { Input } from 'view/components/uiKit/Input';
import { Text } from 'view/components/uiKit/Text';
import { Box } from 'view/components/uiKit/Box';

import {
  Container,
  Header,
  TopHeaderBlock,
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

export const AddCardScreen: React.FC<Props> = ({ navigation }) => {
  const [isTooltipVisible, toogleTooltipVisible] = useState(false);
  const changeCardData = useAction(Actions.changeCardData);
  const { cardNumber, cardHolder, expiryDate, cvcValue } = useSelector(
    (state: RootState) => state.cardReducer,
  );
  return (
    <Container>
      {/* header */}
      <Header>
        <TopHeaderBlock>
          <Title>Add your card</Title>
        </TopHeaderBlock>
      </Header>
      {/* main block */}
      <StyledKeyboardAvoidingView>
        <MainBlock>
          <StyledScrollView>
            <InputWrapper>
              <Input
                type="credit-card"
                keyboardType="numeric"
                placeholder="0000 0000 0000 0000"
                options={{ mask: '9999 9999 9999 9999' }}
                textContentType="creditCardNumber"
                value={cardNumber}
                onChangeText={(value: any) => changeCardData('cardNumber', value)}
                sourceLeftIcon={require('assets/img/cardIcon.png')}
                sourceRightIcon={require('assets/img/scanIcon.png')}
                handleIconPress={() => console.log('2')}
                // error={'Wrong'}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Cardholder name"
                maxLength={50}
                textContentType="username"
                sourceLeftIcon={require('assets/img/cardHolder.png')}
                value={cardHolder}
                onChangeText={(value: any) => changeCardData('cardHolder', value)}
                // error={'Wrong'}
              />
            </InputWrapper>
            <Box>
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
                    onChangeText={(value: any) => changeCardData('expiryDate', value)}
                    // error={'Wrong'}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    type="custom"
                    keyboardType="numeric"
                    placeholder="CVC"
                    options={{
                      mask: '999',
                    }}
                    maxLength={3}
                    sourceLeftIcon={require('assets/img/cvcIcon.png')}
                    sourceTooltipRightIcon={require('assets/img/infoIcon.png')}
                    value={cvcValue}
                    onChangeText={(value: any) => changeCardData('cvcValue', value)}
                    handleIconPress={() => toogleTooltipVisible(true)}
                    // error={'Wrong'}
                    isTooltip
                    isTooltipVisible={isTooltipVisible}
                    onClose={() => toogleTooltipVisible(false)}
                  />
                </View>
              </Box>
            </Box>
          </StyledScrollView>
          <ButtonWrapper>
            <Text color="#1D65BC" size={16} mb={16}>
              Tax Deductible
            </Text>
            <StyledButton onPress={() => navigation.navigate('AuthorizeCharity')} />
          </ButtonWrapper>
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
};

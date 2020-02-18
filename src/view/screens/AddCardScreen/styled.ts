import styled from 'styled-components';
import { moderateScale } from 'react-native-size-matters';

import { bottomSpace, isIOS } from 'utils/helpers';

import { Box } from 'view/components/uiKit/Box';
import { Text } from 'view/components/uiKit/Text';
import { Button } from 'view/components/uiKit/Button';

export const Container = styled(Box).attrs({
  flex: 1,
})``;

//  header
export const Header = styled(Box).attrs(({ theme }) => ({
  bg: theme.colors.main,
  p: `${moderateScale(isIOS ? 60 : 35, 0.5)}px ${moderateScale(16, 0.5)}px ${moderateScale(
    16,
    0.5,
  )}px`,
}))``;

export const TopHeaderBlock = styled(Box).attrs({
  row: true,
  align: 'center',
  spaceBetween: true,
})``;

export const Title = styled(Text).attrs({
  size: 28,
  weight: 'bold',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})``;

// mainBlock
export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: isIOS ? 'padding' : 'height',
  enabled: true,
})`
  width: 100%;
  flex: 1;
`;

export const MainBlock = styled(Box).attrs({
  p: `${moderateScale(16, 0.5)}px ${moderateScale(16, 0.5)}px ${bottomSpace ||
    moderateScale(16, 0.5)}px`,
  flex: 1,
})``;

export const StyledScrollView = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
  flex: 1;
`;

export const InputWrapper = styled(Box).attrs({
  mb: 12,
  row: true,
})``;

export const ButtonWrapper = styled(Box).attrs({
  mt: 'auto',
  align: 'center',
})``;

export const StyledButton = styled(Button).attrs({
  label: 'Continue',
  height: 50,
  size: '14',
})``;

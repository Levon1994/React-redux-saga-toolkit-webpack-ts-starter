import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';

import { Text } from '../Text';
import { Box } from '../Box';

export const CheckboxContainer = styled.TouchableOpacity`
  background: ${({ isCheck, theme }) => (isCheck ? 'transparent' : theme.colors.main)};
  width: auto;
  border-radius: 20;
  margin-right: 6;
  margin-bottom: 8;
  border-color: ${({ isCheck, theme }) => (isCheck ? theme.colors.secondaryText : 'transparent')};
  border-width: 1;
`;

export const CheckboxText = styled(Text).attrs(({ theme, isCheck }) => ({
  width: 'auto',
  color: isCheck ? theme.colors.secondary : theme.colors.checkActiveText,
}))`
  margin: 6px 10px;
`;

export const RightBlock = styled(Box).attrs({
  row: true,
  align: 'center',
  flex: 9,
})``;

export const LogoBlock = styled(Box).attrs({
  width: 60,
  height: 70,
  mr: `${moderateScale(15, 0.5)}px`,
})``;

export const StyledImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 60;
  height: 70;
`;

export const CharityNameBlock = styled(Box).attrs({
  width: '63%',
})``;

export const CharityName = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.secondaryText,
  size: '14',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))``;

export const LeftBlock = styled(Box).attrs({
  align: 'flex-end',
  flex: 1,
})``;

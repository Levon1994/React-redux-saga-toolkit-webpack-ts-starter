import { moderateScale } from 'react-native-size-matters';
import styled, { css } from 'styled-components';
import { TextInputMask } from 'react-native-masked-text';

import { Text } from '../Text';
import { Box } from '../Box';

interface ContainerProps {
  error?: string;
}

export const InputContainer = styled(Box).attrs<ContainerProps>(({ error, theme }) => ({
  width: '100%',
  border: `1px solid ${error ? theme.colors.error : theme.colors.inputBorder}`,
  p: `${moderateScale(16, 0.2)}px`,
  pr: `${moderateScale(2, 0.2)}px`,
  row: true,
  align: 'center',
  br: 4,
}))``;

export const Label = styled(Text).attrs(({ theme }) => ({
  width: '100%',
  color: theme.colors.feedPrice,
  size: moderateScale(14, 0.2),
  mb: moderateScale(10, 0.2),
  weight: 'regular',
}))``;

const inputCss = css`
  /* width: 100%; */
  width: auto;
  height: ${moderateScale(17, 0.2)};
  padding: 0;
  font-size: ${moderateScale(14, 0.2)};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const StyledInput = styled.TextInput`
  ${inputCss};
`;

export const StyledMaskedInput = styled(TextInputMask)`
  ${inputCss};
`;

export const ErrorText = styled(Text).attrs(({ theme }) => ({
  width: '100%',
  size: 14,
  lh: 18,
  color: theme.colors.error,
  weight: 'regular',
}))`
  margin-top: 10px;
`;

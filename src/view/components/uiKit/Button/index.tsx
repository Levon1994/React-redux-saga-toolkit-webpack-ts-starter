/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled, { css } from 'styled-components';
import { moderateScale } from 'react-native-size-matters';

import { Text } from 'view/components/uiKit/Text';
import { Loader } from 'view/components/uiKit/Loader';
import { ButtonProps } from './types';

const StyledButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})<Partial<ButtonProps>>`
  ${({ theme, ...props }) => css`
    width: ${props.width};
    height: ${props.height};
    background-color: ${props.disabled ? 'lightgrey' : props.bg || theme.colors.main};
  `};
  align-items: center;
  justify-content: center;
  border-radius: 4;
  padding-horizontal: ${moderateScale(16, 0.2)};
`;

const ButtonLabel = styled(Text).attrs(({ size, lh, color }) => ({
  size: size || moderateScale(12, 0.2),
  lh: lh || moderateScale(16, 0.2),
  center: true,
  color,
}))``;

export const Button: React.FC<ButtonProps> = ({
  label,
  loading,
  reverseLoader,
  disabled,
  onPress,
  ...restProps
}) => (
  <StyledButton onPress={!disabled ? onPress : null} disabled={disabled} {...restProps}>
    {loading ? (
      <Loader reverse={reverseLoader} size={20} />
    ) : (
      <ButtonLabel {...restProps}>{label}</ButtonLabel>
    )}
  </StyledButton>
);

Button.defaultProps = {
  width: '100%',
  height: moderateScale(45, 0.2),
};

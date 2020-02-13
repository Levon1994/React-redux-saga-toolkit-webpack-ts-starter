/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { InputProps } from './types';

import { Box } from '../Box';

import { Label, InputContainer, StyledInput, ErrorText } from './styled';

export const Input: React.FC<InputProps> = ({ label, error, ...inputProps }) => (
  <>
    <Label>{label}</Label>
    <InputContainer error={error}>
      <Box flex={1}>
        <StyledInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#AAA9A9"
          {...inputProps}
        />
      </Box>
    </InputContainer>
    {error.length > 0 && <ErrorText>{error}</ErrorText>}
  </>
);

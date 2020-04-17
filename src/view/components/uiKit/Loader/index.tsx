/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BallIndicator } from 'react-native-indicators';

import { Box } from '../Box';

interface LoaderProps {
  reverse?: boolean;
  size?: number;
}
export const Loader = ({ reverse, ...restProps }: LoaderProps) => (
  <Box align="center" width="100%" height="100%">
    <BallIndicator color={reverse ? '#fff' : '#1D65BC'} animationDuration={800} {...restProps} />
  </Box>
);

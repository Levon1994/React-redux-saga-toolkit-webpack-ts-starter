import React from 'react';
import { BallIndicator } from 'react-native-indicators';

import { Box } from '../Box';

export const Loader = () => (
  <Box align="center" width="100%" height="100%">
    <BallIndicator color="#1D65BC" animationDuration={800} />
  </Box>
);

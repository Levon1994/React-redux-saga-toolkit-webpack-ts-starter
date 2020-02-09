import React from 'react';

import { Box } from 'view/components/uiKit/Box';

interface ProgressBarProps {
  progressValue?: string | number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progressValue }) => (
  <Box height={8} br={30} bg="#367CCF">
    <Box height={8} br={30} bg="#fff" width={progressValue} />
  </Box>
);

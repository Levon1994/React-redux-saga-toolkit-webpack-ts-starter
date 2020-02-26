import styled from 'styled-components';

import { Box } from 'view/components/uiKit/Box';
import { Text } from 'view/components/uiKit/Text';

export const WeeklyGoalBlock = styled(Box).attrs({
  row: true,
  align: 'center',
  spaceBetween: true,
})``;

export const WeeklyTitle = styled(Text).attrs({
  size: 14,
  color: '#AAA9A9',
})``;

export const WeeklyValueWrapper = styled(Box).attrs({
  align: 'center',
  center: true,
  width: '56px',
  height: '30px',
  bg: '#1D65BC',
  br: 4,
})``;

export const WeeklyValue = styled(Text).attrs({
  size: 14,
})``;

export const SliderBlock = styled.View`
  width: 100%;
`;

export const WeeklyIntervalWrapper = styled(Box).attrs({
  align: 'center',
  spaceBetween: true,
  row: true,
})``;

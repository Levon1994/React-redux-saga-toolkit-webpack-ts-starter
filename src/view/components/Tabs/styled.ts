import styled from 'styled-components';
import { moderateScale } from 'react-native-size-matters';

import { Text } from 'view/components/uiKit/Text';

export const TabBarLabel = styled(Text).attrs<{ focused: boolean }>(props => ({
  size: moderateScale(14, 0.5),
  lh: moderateScale(18, 0.5),
  ls: '1px',
  color: props.focused ? '#fff' : '#85B2E8',
}))<{ focused: boolean }>`
  margin-bottom: ${moderateScale(8, 0.5)};
`;

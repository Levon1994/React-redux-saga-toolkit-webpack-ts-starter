import styled from 'styled-components';
import { moderateScale } from 'react-native-size-matters';

import { bottomSpace, statusBarHeight } from 'utils/helpers';

import { Box } from 'view/components/uiKit/Box';
import { Text } from 'view/components/uiKit/Text';
import { Button } from 'view/components/uiKit/Button';

export const Container = styled(Box).attrs(({ theme }) => ({
  flex: 1,
  bg: theme.colors.main,
}))``;

//  header
export const Header = styled(Box).attrs({
  p: `${statusBarHeight + moderateScale(20, 0.5)}px ${moderateScale(16, 0.5)}px ${moderateScale(
    16,
    0.5,
  )}px`,
})`
  position: relative;
`;

export const GoBackBlock = styled.TouchableOpacity`
  width: 40;
  height: 100%;
  position: absolute;
  left: 0;
  justify-content: center;
`;

export const GoBackIcon = styled.Image.attrs({
  source: require('assets/img/backIcon.png'),
})`
  width: 24;
  height: 24;
`;

export const LogoIcon = styled.Image.attrs({
  source: require('assets/img/reverseLogo.png'),
})`
  width: 44;
  height: 40;
`;

export const TopHeaderBlock = styled(Box).attrs({
  row: true,
  align: 'center',
  center: true,
})`
  position: relative;
`;

// mainBlock

export const MainBlock = styled(Box).attrs({
  p: `${moderateScale(16, 0.5)}px ${moderateScale(16, 0.5)}px ${bottomSpace ||
    moderateScale(16, 0.5)}px`,
  flex: 1,
})``;

export const TopBlock = styled(Box).attrs({
  pb: moderateScale(100, 0.2),
  height: '100%',
  spaceBetween: true,
  align: 'center',
})``;

export const Title = styled(Text).attrs({
  size: moderateScale(28, 0.2),
  weight: 'bold',
  center: true,
  width: '80%',
  mb: moderateScale(16, 0.2),
})``;

export const SubTitle = styled(Text).attrs(({ theme }) => ({
  size: moderateScale(14, 0.2),
  color: theme.colors.progressValue,
  center: true,
  width: '80%',
  mb: moderateScale(30, 0.2),
}))``;

export const AuthorizeIcon = styled.Image.attrs({
  source: require('assets/img/authorizeIcon.png'),
  resizeMode: 'contain',
})`
  width: 100%;
  height: 65%;
`;

export const ButtonWrapper = styled(Box).attrs({
  mt: 'auto',
})``;

export const StyledButton = styled(Button).attrs(({ theme }) => ({
  label: 'Authorise',
  height: moderateScale(50, 0.2),
  size: '14',
  bg: theme.colors.mainText,
  color: theme.colors.main,
}))``;

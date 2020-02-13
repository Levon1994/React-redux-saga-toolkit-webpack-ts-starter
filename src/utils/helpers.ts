import { Platform, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { moderateScale } from 'react-native-size-matters';

export const isIOS = Platform.OS === 'ios';

const Screen = Dimensions.get('window');
export const ScreenWidth = Screen.width;
export const ScreenHeight = isIOS ? Screen.height : ExtraDimensions.getRealWindowHeight();

export const statusBarHeight = isIOS ? getStatusBarHeight() : 0;

export const defaultScale = (size: number) => moderateScale(size, 0.2);

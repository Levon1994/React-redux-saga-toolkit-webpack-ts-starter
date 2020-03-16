/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Image, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { ThemeContext } from 'styled-components';
import { moderateScale } from 'react-native-size-matters';

import { InputProps } from './types';

import { Box } from '../Box';
import { Text } from '../Text';

import { Label, InputContainer, StyledInput, StyledMaskedInput, ErrorText } from './styled';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type,
  isTooltip,
  isTooltipVisible,
  sourceRightIcon,
  sourceTooltipRightIcon,
  sourceLeftIcon,
  handleIconPress,
  handleTooltipIconPress,
  onClose,
  ...inputProps
}) => {
  const theme = useContext(ThemeContext);
  const errorText = () => {
    if (error && error.length > 0) {
      return <ErrorText>{error}</ErrorText>;
    }
    return null;
  };
  return (
    <>
      {label && <Label>{label}</Label>}
      <InputContainer error={error}>
        <Box flex={1} row align="center" spaceBetween>
          <Box row align="center" width="auto" flex={2}>
            {sourceLeftIcon && (
              <Image
                source={sourceLeftIcon}
                style={{
                  width: 16,
                  height: 16,
                  marginRight: moderateScale(8, 0.2),
                  tintColor: error && theme.colors.errorIcon,
                }}
                resizeMode="contain"
              />
            )}
            {type ? (
              <StyledMaskedInput type={type} {...inputProps} />
            ) : (
              <StyledInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={theme.colors.feedPrice}
                {...inputProps}
              />
            )}
          </Box>
          {isTooltip && (
            <Box flex={1} align="flex-end">
              <Tooltip
                animated
                arrowSize={{ width: 8, height: 9 }}
                backgroundColor="none"
                isVisible={isTooltipVisible}
                displayInsets={{ left: 16, right: 16 }}
                content={
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <Image
                      source={require('assets/img/infoIcon.png')}
                      style={{
                        width: 16,
                        height: 16,
                        marginRight: moderateScale(8, 0.2),
                        tintColor: theme.colors.main,
                      }}
                      resizeMode="contain"
                    />
                    <Text color={theme.colors.dark} width="auto">
                      The three-digit number on the back of your card
                    </Text>
                  </View>
                }
                placement="bottom"
                onClose={onClose}
                childContentSpacing={20}
                contentStyle={{
                  width: '100%',
                }}
                tooltipStyle={{
                  width: '100%',
                  shadowColor: theme.colors.dark,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 1,

                  elevation: 3,
                }}
              >
                <TouchableWithoutFeedback onPress={handleIconPress}>
                  <Image
                    source={sourceTooltipRightIcon}
                    style={{ width: 16, height: 16, marginRight: moderateScale(6, 0.2) }}
                    resizeMode="contain"
                  />
                </TouchableWithoutFeedback>
              </Tooltip>
            </Box>
          )}
          {sourceRightIcon && (
            <Box flex={1} align="flex-end">
              <TouchableOpacity onPress={handleIconPress}>
                <Image
                  source={sourceRightIcon}
                  style={{ width: 16, height: 16, marginRight: moderateScale(8, 0.2) }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Box>
          )}
        </Box>
      </InputContainer>
      {errorText()}
    </>
  );
};

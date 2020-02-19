/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

import { InputProps } from './types';

import { Box } from '../Box';
import { Text } from '../Text';

// eslint-disable-next-line no-unused-vars
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
}) => (
  <>
    {label && <Label>{label}</Label>}
    <InputContainer error={error}>
      <Box flex={1} row align="center" spaceBetween>
        <Box row align="center" width="auto">
          {sourceLeftIcon && (
            <Image
              source={sourceLeftIcon}
              style={{ width: 16, height: 16, marginRight: 9, tintColor: error && '#F43428' }}
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
              placeholderTextColor="#AAA9A9"
              {...inputProps}
            />
          )}
        </Box>
        {isTooltip && (
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
                  style={{ width: 16, height: 16, marginRight: 12, tintColor: '#1D65BC' }}
                  resizeMode="contain"
                />
                <Text color="black">The three-digit number on the back of your card</Text>
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
              shadowColor: '#000',
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
                style={{ width: 16, height: 16, marginRight: 9 }}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
          </Tooltip>
        )}
        {sourceRightIcon && (
          <TouchableOpacity onPress={handleIconPress}>
            <Image
              source={sourceRightIcon}
              style={{ width: 16, height: 16, marginRight: 9 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </Box>
    </InputContainer>
    {/* {error && error.length > 0 && <ErrorText>{error}</ErrorText>} */}
  </>
);

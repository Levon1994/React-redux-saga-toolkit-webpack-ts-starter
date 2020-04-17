/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/state-in-constructor */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Image } from 'react-native';

import {
  RightBlock,
  LogoBlock,
  StyledImage,
  CharityNameBlock,
  CharityName,
  LeftBlock,
} from './styled';

export const CheckBox = ({ value, label, item, checkSelected, clicked, notSelected }: any) => {
  const [isCheck, setChecked] = useState(false);

  useEffect(() => {
    const newCheck = checkSelected.map((i: { label: any }) => i.label);
    newCheck.map((i: any) => {
      if (i === label) {
        setChecked(true);
      }
    });
  }, [checkSelected]);

  const checkClicked = () => {
    if (checkSelected.length === 3 && !isCheck) {
      return null;
    } else {
      setChecked(!isCheck);
      clicked && clicked(value, label, isCheck);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={checkClicked} style={{ width: '100%', height: '100%' }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          opacity: checkSelected.length === 3 && !isCheck ? 0.5 : 1,
        }}
      >
        <RightBlock>
          <LogoBlock>{item.logo && <StyledImage source={{ uri: item.logo }} />}</LogoBlock>
          <CharityNameBlock>
            <CharityName>{item.name}</CharityName>
          </CharityNameBlock>
        </RightBlock>
        <LeftBlock>
          {isCheck ? (
            <View
              style={{
                width: 32,
                height: 32,
                backgroundColor: '#1D65BC',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('assets/img/checkIcon.png')}
                style={{ width: 11, height: 8 }}
              />
            </View>
          ) : (
            <View
              style={{
                width: 32,
                height: 32,
                borderColor: '#E6EAEE',
                borderWidth: 1,
                borderRadius: 50,
              }}
            />
          )}
        </LeftBlock>
      </View>
    </TouchableWithoutFeedback>
  );
};

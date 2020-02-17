/* eslint-disable no-unused-vars */
/* eslint-disable react/state-in-constructor */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';

import {
  RightBlock,
  LogoBlock,
  StyledImage,
  CharityNameBlock,
  CharityName,
  LeftBlock,
} from './styled';

export class CheckBox extends Component {
  state = {
    isCheck: false,
  };

  componentDidMount() {
    const { label, checkSelected } = this.props;
    // const newCheck = checkSelected.map((i: { label: any }) => i.label);
    // newCheck.map((i: any) => {
    //   if (i === label) {
    //     this.setState({
    //       isCheck: true,
    //     });
    //   }
    // });
  }

  checkClicked = checkSelected => {
    const { clicked, value, label } = this.props;
    const { isCheck } = this.state;
    this.setState({ isCheck: !isCheck });
    clicked && clicked(value, label, isCheck);
  };

  render() {
    const { isCheck } = this.state;
    const { label, item, disabled, checkSelected } = this.props;

    return (
      <TouchableOpacity
        isCheck={isCheck}
        onPress={this.checkClicked}
        style={{ width: '100%', height: '100%' }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <RightBlock>
            <LogoBlock>
              <StyledImage source={item.logo} />
            </LogoBlock>
            <CharityNameBlock>
              <CharityName>{item.charityName}</CharityName>
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
      </TouchableOpacity>
    );
  }
}

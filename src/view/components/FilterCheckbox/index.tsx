/* eslint-disable no-unused-vars */
/* eslint-disable react/state-in-constructor */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import { ItemFilterWrapper, FilterTitle } from './styled';

export class FilterCheckbox extends Component {
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
    const { label, filterItem, disabled, checkSelected } = this.props;

    return (
      <TouchableOpacity
        isCheck={isCheck}
        onPress={this.checkClicked}
        // style={{ width: '100%', height: '100%' }}
      >
        <ItemFilterWrapper isCheck={isCheck}>
          <FilterTitle key={filterItem.id} isCheck={isCheck}>
            {filterItem.title}
          </FilterTitle>
        </ItemFilterWrapper>
      </TouchableOpacity>
    );
  }
}

import React, { useState } from 'react';
import { FlatList, ScrollView } from 'react-native';

import { Navigation } from 'types';

import { Box } from 'view/components/uiKit/Box';
import { CheckBox } from 'view/components/uiKit/CheckBox';
import { SearchInput } from 'view/components/uiKit/SearchInput';
import { EmptyView } from 'view/components/EmptyView';
import { FilterCheckbox } from 'view/components/FilterCheckbox';

import {
  Container,
  Header,
  TopHeaderBlock,
  Title,
  BottomHeaderBlock,
  StyledKeyboardAvoidingView,
  MainBlock,
  ErrorBlock,
  ErrorTitlte,
  FlatListBlock,
  ButtonWrapper,
  StyledButton,
  ContainerList,
} from './styled';

import { listData, filterData } from './fakeData';

interface Props {
  navigation: Navigation;
}

export const SelectCharityScreen: React.FC<Props> = ({ navigation }) => {
  const [checkSelected, setCheckSelected] = useState([]);
  const [checkFilter, setFliterSelected] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = React.useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const toggleCheckBox = (title, label, isCheck) => {
    if (!isCheck) {
      checkSelected.push({ label });
    } else {
      const index = checkSelected.map(e => e.label).indexOf(label);
      if (index > -1) {
        checkSelected.splice(index, 1);
      }
    }
    setCheckSelected(checkSelected);
    // TODO:: setting checking charities from list

    // let qwer = listData.map((el) => {
    //   checkSelected.map((item) => {
    //     if (item.label === el.id && !el.isSelected) {
    //       console.log('el: ', el);
    //       el['isSelected'] = true;
    //     } else {
    //       el['isSelected'] = false;
    //     }
    //     // console.log('item: ', item.label);
    //   })
    //   // console.log('el: ', el.id);
    // })
    // console.log('qwer: ', qwer);
  };

  const toggleFilterCheckBox = (title, label, isCheck) => {
    if (!isCheck) {
      checkFilter.push({ label });
    } else {
      const index = checkFilter.map(e => e.label).indexOf(label);
      if (index > -1) {
        checkFilter.splice(index, 1);
      }
    }
    setFliterSelected(checkFilter);
  };

  const renderListItem = ({ item }: any) => (
    <ContainerList
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
    >
      <CheckBox
        key={item.id}
        value={item.id}
        label={item.id}
        item={item}
        clicked={(title: any, label: any, isCheck: any) => {
          toggleCheckBox(title, label, isCheck);
        }}
        checkSelected={checkSelected}
      />
    </ContainerList>
  );
  return (
    <Container>
      {/* header */}
      <Header>
        <TopHeaderBlock>
          <Title>Select your charity</Title>
        </TopHeaderBlock>
        <BottomHeaderBlock>
          <SearchInput value={searchValue} onChangeText={handleSearchInputChange} />
        </BottomHeaderBlock>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {filterData.map(filterItem => (
            <FilterCheckbox
              key={filterItem.id}
              filterItem={filterItem}
              value={filterItem.id}
              label={filterItem.id}
              clicked={(title: any, label: any, isCheck: any) => {
                toggleFilterCheckBox(title, label, isCheck);
              }}
              checkSelected={checkFilter}
            />
          ))}
        </ScrollView>
      </Header>
      {/* main block */}
      <StyledKeyboardAvoidingView>
        <MainBlock>
          <ErrorBlock>
            <ErrorTitlte>Please select at least one charity from the list below</ErrorTitlte>
          </ErrorBlock>
          <FlatListBlock>
            {listData.length !== 0 ? (
              <FlatList
                data={listData}
                renderItem={renderListItem}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item.id)}
                bounces={false}
                ItemSeparatorComponent={() => <Box height={10} />}
                style={{
                  width: '100%',
                }}
              />
            ) : (
              <EmptyView />
            )}
          </FlatListBlock>
          <ButtonWrapper>
            <StyledButton onPress={() => navigation.navigate('AuthorizeCharity')} />
          </ButtonWrapper>
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
};

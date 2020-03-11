/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { Navigation, RootState } from 'types';
import { useAction } from 'utils/hooks';

import {
  getCharitiesList,
  getFilterCharity,
  setFilterSelected,
  changeValue,
} from 'modules/charity/actions';

import { Box } from 'view/components/uiKit/Box';
import { CheckBox } from 'view/components/uiKit/CheckBox';
import { SearchInput } from 'view/components/uiKit/SearchInput';
import { EmptyView } from 'view/components/EmptyView';
import { FilterCheckbox } from 'view/components/FilterCheckbox';
import { Loader } from 'view/components/uiKit/Loader';

import {
  Container,
  Header,
  TopHeaderBlock,
  GoBackBlock,
  GoBackIcon,
  Title,
  BottomHeaderBlock,
  StyledKeyboardAvoidingView,
  MainBlock,
  // ErrorBlock,
  // ErrorTitlte,
  FlatListBlock,
  ButtonWrapper,
  StyledButton,
  ContainerList,
  ItemFilterWrapper,
  FilterTitle,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const SelectCharityScreen: React.FC<Props> = ({ navigation }) => {
  const [checkSelected, setCheckSelected] = useState([]);
  const [isAll, setAllFilter] = useState(true);
  const route = navigation.state.params ? navigation.state.params.route : 'choose';
  const isEditViewScreen = route === 'edit';

  const {
    charitiesList,
    isLoadingCharitiesList,
    filterList,
    checkFilter,
    searchValue,
  } = useSelector((state: RootState) => state.charityReducer);
  console.log('charitiesList', charitiesList);

  const fetchCharitiesList = useAction(getCharitiesList);
  const fetchFilterCharity = useAction(getFilterCharity);
  const setFilterSelect = useAction(setFilterSelected);
  const changeSearchValue = useAction(changeValue);

  useEffect(() => {
    fetchCharitiesList();
    fetchFilterCharity();
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

  let delayTimer: number;
  const doSearch = React.useCallback(value => {
    changeSearchValue(value);
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      fetchCharitiesList();
    }, 1000); // Will do the the fetch data after 1000 ms, or 1 s
  }, []);

  let delayFilterTimer: number;
  const toggleFilterCheckBox = React.useCallback(
    (label, isCheck) => {
      if (!isCheck) {
        checkFilter.push({ label });
      } else {
        const index = checkFilter.map(e => e.label).indexOf(label);
        if (index > -1) {
          checkFilter.splice(index, 1);
        }
      }
      setFilterSelect(checkFilter);
      if (checkFilter.length === 0) {
        setAllFilter(true);
      } else {
        setAllFilter(false);
      }
      clearTimeout(delayFilterTimer);
      delayFilterTimer = setTimeout(() => {
        fetchCharitiesList();
      }, 1000);
    },
    [checkFilter],
  );

  const goToNext = React.useCallback(() => {
    if (isEditViewScreen) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.navigate('AuthorizeCharity');
    }
  }, [route]);

  const changeFilter = React.useCallback(() => {
    setAllFilter(true);
    setFilterSelect([]);
    fetchCharitiesList();
  }, [checkFilter]);

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
      <Header isEditViewScreen={isEditViewScreen}>
        {isEditViewScreen && (
          <GoBackBlock onPress={goToNext}>
            <GoBackIcon />
          </GoBackBlock>
        )}
        <TopHeaderBlock>
          <Title>{isEditViewScreen ? 'Edit charities' : 'Select your charity'}</Title>
        </TopHeaderBlock>
        <BottomHeaderBlock>
          <SearchInput value={searchValue} onChangeText={doSearch} />
        </BottomHeaderBlock>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {isLoadingCharitiesList || (
            <>
              <TouchableOpacity onPress={changeFilter}>
                <ItemFilterWrapper isCheck={isAll}>
                  <FilterTitle isCheck={isAll}>All</FilterTitle>
                </ItemFilterWrapper>
              </TouchableOpacity>
              {filterList.map(filterItem => (
                <FilterCheckbox
                  key={filterItem.id}
                  filterItem={filterItem}
                  value={filterItem.name}
                  label={filterItem.name}
                  clicked={(label: any, isCheck: any) => {
                    toggleFilterCheckBox(label, isCheck);
                  }}
                  checkSelected={checkFilter}
                />
              ))}
            </>
          )}
        </ScrollView>
      </Header>
      {/* main block */}
      <StyledKeyboardAvoidingView>
        <MainBlock>
          {isLoadingCharitiesList ? (
            <Loader />
          ) : (
            <>
              {/* Todo: style screen when is error message */}
              {/* <ErrorBlock>
              <ErrorTitlte>Please select at least one charity from the list below</ErrorTitlte>
            </ErrorBlock> */}
              <FlatListBlock>
                {charitiesList.length !== 0 ? (
                  <FlatList
                    data={charitiesList}
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
                <StyledButton
                  onPress={goToNext}
                  label={isEditViewScreen ? 'Save changes' : 'Next'}
                />
              </ButtonWrapper>
            </>
          )}
        </MainBlock>
      </StyledKeyboardAvoidingView>
    </Container>
  );
};

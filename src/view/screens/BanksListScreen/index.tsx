/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';

import { useAction } from 'utils/hooks';

import { Navigation, RootState } from 'types';

import * as Actions from 'modules/bank/actions';

import { SearchInput } from 'view/components/uiKit/SearchInput';
import { Loader } from 'view/components/uiKit/Loader';
// import { globalErrorBlock } from 'view/components';
import { FullBanksList } from './components/FullBanksList';
import { TopBanksList } from './components/TopBanksList';

import {
  Container,
  Header,
  TopHeaderBlock,
  Title,
  BottomHeaderBlock,
  MainBlock,
  ButtonWrapper,
  StyledButton,
  ErrorBlock,
  ErrorTitlte,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const BanksListScreen: React.FC<Props> = React.memo(({ navigation }) => {
  const [showFullList, setshowFullList] = useState(false);

  const { isLoadingBanksList, isLoadingTopBanksList, getBanksListError } = useSelector(
    (state: RootState) => state.bankReducer,
  );

  const getTopBanks = useAction(Actions.getTopBanks);
  const getBanksList = useAction(Actions.getBanksList);

  useEffect(() => {
    getTopBanks();
    getBanksList('');
  }, []);

  let delayTimer: number;
  const doSearch = React.useCallback(value => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      getBanksList(value);
    }, 1000); // Will do the the fetch data after 1000 ms, or 1 s
  }, []);

  const onRefresh = React.useCallback(() => {
    getTopBanks();
    getBanksList('');
  }, []);

  const listView = showFullList ? (
    <FullBanksList navigation={navigation} />
  ) : (
    <TopBanksList navigation={navigation} />
  );

  return (
    <Container>
      {/* header */}
      <Header>
        <TopHeaderBlock showFullList={showFullList}>
          <Title>Connect accounts</Title>
        </TopHeaderBlock>
        {showFullList && (
          <BottomHeaderBlock>
            <SearchInput placeholder="Search all banks" value="" onChangeText={doSearch} />
          </BottomHeaderBlock>
        )}
      </Header>
      {/* main block */}
      <MainBlock>
        {Object.values(getBanksListError).length > 0 && (
          <ErrorBlock>
            <ErrorTitlte>{Object.values(getBanksListError)}</ErrorTitlte>
            <TouchableOpacity onPress={onRefresh}>
              <ErrorTitlte>Press here for try load data again.</ErrorTitlte>
            </TouchableOpacity>
          </ErrorBlock>
        )}
        {isLoadingBanksList || isLoadingTopBanksList ? (
          <Loader />
        ) : (
          <>
            {listView}
            {showFullList || (
              <ButtonWrapper>
                <StyledButton onPress={() => setshowFullList(!showFullList)} />
              </ButtonWrapper>
            )}
          </>
        )}
      </MainBlock>
    </Container>
  );
});

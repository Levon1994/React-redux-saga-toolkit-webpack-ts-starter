/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAction } from 'utils/hooks';

import { Navigation, RootState } from 'types';

import * as Actions from 'modules/bank/actions';

import { SearchInput } from 'view/components/uiKit/SearchInput';
import { Loader } from 'view/components/uiKit/Loader';
import { globalErrorBlock } from 'view/components';
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
} from './styled';

interface Props {
  navigation: Navigation;
}

export const BanksListScreen: React.FC<Props> = React.memo(({ navigation }) => {
  const [showFullList, setshowFullList] = useState(false);

  const { isLoadingBanksList, isLoadingTopBanksList, searchValue, getBanksListError } = useSelector(
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
      // Do the fetch data
      getBanksList(value);
    }, 2000); // Will do the  the fetch data after 2000 ms, or 2 s
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
            <SearchInput
              placeholder="Search all banks"
              value={searchValue}
              onChangeText={doSearch}
            />
          </BottomHeaderBlock>
        )}
      </Header>
      {/* main block */}
      <MainBlock>
        {globalErrorBlock(getBanksListError)}
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

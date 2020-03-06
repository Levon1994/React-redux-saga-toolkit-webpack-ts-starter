/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import {
  getBanksList,
  getBanksListSuccess,
  getBanksListFail,
  getTopBanks,
  getTopBanksSuccess,
  getTopBanksFail,
} from './actions';
import { changeValue } from '../auth/actions';
import { BanksState } from './types';

const defaultState: BanksState = {
  banksList: [],
  topBanks: [],
  searchValue: '',
  isLoadingBanksList: false,
  isLoadingTopBanksList: false,
  getBanksListError: {},
};

export const bankReducer = createReducer(defaultState, handle => [
  handle(getBanksList, state => ({
    ...state,
    isLoadingBanksList: true,
  })),
  handle(
    getBanksListSuccess,
    (state, { payload }): BanksState => ({
      ...state,
      banksList: payload,
      isLoadingBanksList: false,
    }),
  ),
  handle(
    getBanksListFail,
    (state, { payload }): BanksState => ({
      ...state,
      isLoadingBanksList: false,
      getBanksListError: payload,
    }),
  ),
  handle(getTopBanks, state => ({
    ...state,
    isLoadingTopBanksList: true,
  })),
  handle(
    getTopBanksSuccess,
    (state, { payload }): BanksState => ({
      ...state,
      topBanks: payload,
      isLoadingTopBanksList: false,
    }),
  ),
  handle(
    getTopBanksFail,
    (state, { payload }): BanksState => ({
      ...state,
      isLoadingTopBanksList: false,
      getBanksListError: payload,
    }),
  ),
  handle(
    changeValue,
    (state, { payload }): BanksState => {
      console.log('payload: ', payload);
      return {
        ...state,
        ...payload,
      };
    },
  ),
]);

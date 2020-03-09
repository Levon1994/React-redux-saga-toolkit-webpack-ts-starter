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
  changeValue,
  createBankAccount,
  createBankAccountSuccess,
  createBankAccountFail,
} from './actions';
import { BanksState } from './types';

const defaultState: BanksState = {
  banksList: [],
  topBanks: [],
  isLoadingBanksList: false,
  isLoadingTopBanksList: false,
  getBanksListError: {},
  values: {
    loginId: '',
    password: '',
    secondaryLoginId: '',
    securityCode: '',
  },
  errors: {},
  isLoadingCreateBankAccount: false,
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
      return {
        ...state,
        values: {
          ...state.values,
          ...payload,
        },
      };
    },
  ),
  handle(createBankAccount, state => ({
    ...state,
    // isLoadingCreateBankAccount: true,
  })),
  handle(
    createBankAccountSuccess,
    (state, { payload }): BanksState => ({
      ...state,
      // banksList: payload,
      // isLoadingCreateBankAccount: false,
    }),
  ),
  handle(
    createBankAccountFail,
    (state, { payload }): BanksState => ({
      ...state,
      // isLoadingCreateBankAccount: false,
      errors: payload,
    }),
  ),
]);

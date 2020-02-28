/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import {
  getUserCharity,
  getUserCharitySuccess,
  getUserCharityFail,
  getUserTransactions,
  getUserTransactionsSuccess,
  getUserTransactionsFail,
} from './actions';
import { CharityState } from './types';

const defaultState: CharityState = {
  userCharityData: {},
  isLoadingCharityData: false,
  getUserCharityError: {},
  userTransactionsData: {},
  isLoadingTransactionsData: false,
};

export const charityReducer = createReducer(defaultState, handle => [
  handle(getUserCharity, state => ({
    ...state,
    isLoadingCharityData: true,
  })),
  handle(
    getUserCharitySuccess,
    (state, { payload }): CharityState => ({
      ...state,
      userCharityData: payload,
      isLoadingCharityData: false,
    }),
  ),
  handle(
    getUserCharityFail,
    (state, { payload }): CharityState => ({
      ...state,
      isLoadingCharityData: false,
      getUserCharityError: payload,
    }),
  ),
  handle(getUserTransactions, state => ({
    ...state,
    isLoadingTransactionsData: true,
  })),
  handle(
    getUserTransactionsSuccess,
    (state, { payload }): CharityState => {
      console.log('payload', payload);
      return {
        ...state,
        userTransactionsData: payload,
        isLoadingTransactionsData: false,
      };
    },
  ),
  handle(
    getUserTransactionsFail,
    (state, { payload }): CharityState => ({
      ...state,
      isLoadingTransactionsData: false,
      // getUserCharityError: payload,
    }),
  ),
]);

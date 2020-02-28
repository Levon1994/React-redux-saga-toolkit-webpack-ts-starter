/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import { getUserCharity, getUserCharitySuccess, getUserCharityFail } from './actions';
import { CharityState } from './types';

const defaultState: CharityState = {
  userCharityData: {},
  isLoadingCharityData: false,
  getUserCharityError: {},
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
]);

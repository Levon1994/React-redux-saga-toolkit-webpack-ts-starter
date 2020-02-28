/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import {
  getUserCharity,
  getUserCharitySuccess,
  getUserCharityFail,
  getUserFeed,
  getUserFeedSuccess,
  getUserFeedFail,
} from './actions';
import { CharityState } from './types';

const defaultState: CharityState = {
  userCharityData: {},
  userFeedData: [],
  isLoadingCharityData: false,
  isLoadingFeedData: false,
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
  handle(getUserFeed, state => ({
    ...state,
    isLoadingFeedData: true,
  })),
  handle(
    getUserFeedSuccess,
    (state, { payload }): CharityState => ({
      ...state,
      userFeedData: payload,
      isLoadingFeedData: false,
    }),
  ),
  handle(
    getUserFeedFail,
    (state, { payload }): CharityState => ({
      ...state,
      isLoadingFeedData: false,
      getUserCharityError: payload,
    }),
  ),
]);

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
  next_page: null,
  isLoadingCharityData: false,
  getUserCharityError: {},
  isLoadMore: true,
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
  })),
  handle(
    getUserFeedSuccess,
    (state, { payload }): CharityState => {
      const feedArray: any[] = [];
      Object.entries(payload.donations).forEach(([key, value]) => feedArray.push({ [key]: value }));
      const nextFeed = state.userFeedData;
      const newArrayFeed = [...nextFeed, ...feedArray];
      return {
        ...state,
        userFeedData: newArrayFeed,
        next_page: payload.next_page,
      };
    },
  ),
  handle(
    getUserFeedFail,
    (state, { payload }): CharityState => ({
      ...state,
      getUserCharityError: payload,
    }),
  ),
]);

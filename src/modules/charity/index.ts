/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import {
  getCharitiesList,
  getCharitiesListSuccess,
  getCharitiesListFail,
  getFilterCharity,
  getFilterCharitySuccess,
  getFilterCharityFail,
  setFilterSelected,
  changeValue,
  getUserCharity,
  getUserCharitySuccess,
  getUserCharityFail,
  getUserFeed,
  getUserFeedSuccess,
  getMoreUserFeedSuccess,
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
  getUserFeedError: {},
  charitiesList: [],
  isLoadingCharitiesList: false,
  getCharitiesListError: {},
  searchValue: '',
  filterList: [],
  checkFilter: [],
};

export const charityReducer = createReducer(defaultState, handle => [
  handle(getCharitiesList, state => ({
    ...state,
    isLoadingCharitiesList: true,
  })),
  handle(
    getCharitiesListSuccess,
    (state, { payload }): CharityState => ({
      ...state,
      charitiesList: payload,
      isLoadingCharitiesList: false,
      getCharitiesListError: {},
    }),
  ),
  handle(
    getCharitiesListFail,
    (state, { payload }): CharityState => ({
      ...state,
      isLoadingCharitiesList: false,
      getCharitiesListError: payload,
    }),
  ),
  handle(getFilterCharity, state => ({
    ...state,
    // isLoadingCharitiesList: true,
  })),
  handle(
    getFilterCharitySuccess,
    (state, { payload }): CharityState => ({
      ...state,
      filterList: payload,
      // isLoadingCharitiesList: false,
      // getCharitiesListError: {},
    }),
  ),
  handle(
    getFilterCharityFail,
    (state, { payload }): CharityState => ({
      ...state,
      // isLoadingCharitiesList: false,
      // getCharitiesListError: payload,
    }),
  ),
  handle(
    setFilterSelected,
    (state, { payload }): CharityState => ({
      ...state,
      checkFilter: payload,
    }),
  ),
  handle(
    changeValue,
    (state, { payload }): CharityState => ({
      ...state,
      searchValue: payload,
    }),
  ),
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
      getUserCharityError: {},
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
    getMoreUserFeedSuccess,
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
    getUserFeedSuccess,
    (state, { payload }): CharityState => {
      const feedArray: any[] = [];
      Object.entries(payload.donations).forEach(([key, value]) => feedArray.push({ [key]: value }));
      return {
        ...state,
        userFeedData: feedArray,
        next_page: payload.next_page,
        getUserFeedError: {},
      };
    },
  ),
  handle(
    getUserFeedFail,
    (state, { payload }): CharityState => ({
      ...state,
      getUserFeedError: payload,
    }),
  ),
]);

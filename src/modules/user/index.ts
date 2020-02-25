/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import { setUser, getUser, getUserSuccess, getUserFail } from './actions';
import { UserState } from './types';

const defaultState: UserState = {
  userId: null,
  user: {},
  isLoadingUserData: false,
  getUserDataError: {},
};

export const userReducer = createReducer(defaultState, handle => [
  handle(
    setUser,
    (state, { payload }): UserState => ({
      ...state,
      userId: payload,
    }),
  ),
  handle(getUser, state => ({
    ...state,
    isLoadingUserData: true,
  })),
  handle(
    getUserSuccess,
    (state, { payload }): UserState => ({
      ...state,
      user: payload,
      isLoadingUserData: false,
    }),
  ),
  handle(
    getUserFail,
    (state, { payload }): UserState => ({
      ...state,
      isLoadingUserData: false,
      getUserDataError: payload,
    }),
  ),
]);

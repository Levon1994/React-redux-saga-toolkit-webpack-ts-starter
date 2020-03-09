/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import { validateField } from 'utils/validation';

import { changeValue } from 'modules/auth/actions';
import {
  setUser,
  setWeeklyAmount,
  setStatusCreatedBankAccount,
  getUser,
  getUserSuccess,
  getUserFail,
} from './actions';
import { UserState } from './types';

const defaultState: UserState = {
  userId: null,
  user: {
    first_name: '',
    last_name: '',
    email: '',
    weekly_goal: 2,
    weekly_amount: 0,
  },
  isLoadingUserData: false,
  getUserDataError: {},
  errors: {},
  userToken: null,
  createdBankAccountStatus: false,
};

export const userReducer = createReducer(defaultState, handle => [
  handle(
    setUser,
    (state, { payload }): UserState => ({
      ...state,
      userId: payload.user_id,
      userToken: payload.access_token,
    }),
  ),
  handle(
    setWeeklyAmount,
    (state, { payload }): UserState => ({
      ...state,
      user: {
        ...state.user,
        weekly_goal: payload,
      },
    }),
  ),
  handle(
    setStatusCreatedBankAccount,
    (state): UserState => ({
      ...state,
      createdBankAccountStatus: true,
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
      user: {
        ...state.user,
        ...payload,
      },
      isLoadingUserData: false,
      errors: {},
      getUserDataError: {},
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
  handle(
    changeValue,
    (state, { payload }): UserState => {
      const key = Object.keys(payload);
      const value = Object.values(payload);
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
        errors: {
          ...state.errors,
          [key[0]]: validateField(key[0], String(value[0])),
        },
      };
    },
  ),
]);

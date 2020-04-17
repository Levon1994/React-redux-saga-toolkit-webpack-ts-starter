import { createAction } from 'deox';
import { ResponseErrors } from 'types/responseData';
import { UserProfile } from './types';

export const setUser = createAction(
  'user/SET_USER',
  resolve => (payload: { access_token: string; user_id: number }) => resolve(payload),
);

export const setUserCharity = createAction('user/SET_USER_CHARITY');

export const setStatusCreatedBankAccount = createAction('user/SET_STATUS_CREATED_BANK_ACCOUNT');

export const setUserCreatedCard = createAction('user/SET_USER_CREATED_CARD');

export const setWeeklyAmount = createAction(
  'user/SET_WEEKLY_AMOUNT',
  resolve => (payload: number) => resolve(payload),
);

export const getUser = createAction('user/GET_USER_REQUEST');

export const getUserSuccess = createAction(
  'user/GET_USER_SUCCESS',
  resolve => (payload: UserProfile) => resolve(payload),
);

export const getUserFail = createAction(
  'user/GET_USER_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

export const updateUser = createAction('user/UPDATE_USER_REQUEST');

export const updateUserSuccess = createAction(
  'user/UPDATE_USER_SUCCESS',
  resolve => (payload: UserProfile) => resolve(payload),
);

export const updateUserFail = createAction(
  'user/UPDATE_USER_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

export const resetUserReducer = createAction('user/RESET_USER_REDUCER');

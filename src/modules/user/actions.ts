import { createAction } from 'deox';
import { ResponseErrors } from 'types/responseData';
import { UserProfile } from './types';

export const setUser = createAction(
  'user/SET_USER',
  resolve => (payload: { access_token: string; user_id: number }) => resolve(payload),
);

export const setWeeklyAmount = createAction(
  'user/SET_WEEKLY_AMOUNT',
  resolve => (payload: number) => resolve(payload),
);

export const setStatusCreatedBankAccount = createAction('user/SET_STATUS_CREATED_BANK_ACCOUNT');

export const getUser = createAction('user/GET_USER_REQUEST');

export const getUserSuccess = createAction(
  'user/GET_USER_SUCCESS',
  resolve => (payload: UserProfile) => resolve(payload),
);

export const getUserFail = createAction(
  'user/GET_USER_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

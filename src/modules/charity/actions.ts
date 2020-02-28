import { createAction } from 'deox';
import { ResponseErrors } from 'types/responseData';
import { UserCharity } from './types';

export const getUserCharity = createAction('charity/GET_USER_CHARITY_REQUEST');

export const getUserCharitySuccess = createAction(
  'charity/GET_USER_CHARITY_SUCCESS',
  resolve => (payload: UserCharity) => resolve(payload),
);

export const getUserCharityFail = createAction(
  'charity/GET_USER_CHARITY_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

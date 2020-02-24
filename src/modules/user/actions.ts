import { createAction } from 'deox';
import { ResponseErrors } from 'types/responseData';
import { UserProfile } from './types';

export const getUser = createAction('user/GET_USER_REQUEST');

export const getUserSuccess = createAction(
  'user/GET_USER_SUCCESS',
  resolve => (payload: UserProfile) => resolve(payload),
);

export const getUserFail = createAction(
  'user/GET_USER_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

import { createAction } from 'deox';
import { ResponseErrors } from 'types/responseData';
import { UserCharity, UserTransactions } from './types';

export const getUserCharity = createAction('charity/GET_USER_CHARITY_REQUEST');

export const getUserCharitySuccess = createAction(
  'charity/GET_USER_CHARITY_SUCCESS',
  resolve => (payload: UserCharity) => resolve(payload),
);

export const getUserCharityFail = createAction(
  'charity/GET_USER_CHARITY_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

export const getUserTransactions = createAction('charity/GET_USER_TRANSACTIONS_REQUEST');

export const getUserTransactionsSuccess = createAction(
  'charity/GET_USER_TRANSACTIONS_SUCCESS',
  resolve => (payload: UserTransactions) => resolve(payload),
);

export const getUserTransactionsFail = createAction(
  'charity/GET_USER_TRANSACTIONS_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

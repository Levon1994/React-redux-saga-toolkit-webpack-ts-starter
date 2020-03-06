import { createAction } from 'deox';
import { ResponseErrors } from 'types/responseData';
import { BanksList } from './types';

export const getBanksList = createAction(
  'bank/GET_BANKS_LIST_REQUEST',
  resolve => (payload: string) => resolve(payload),
);

export const getBanksListSuccess = createAction(
  'bank/GET_BANKS_LIST_SUCCESS',
  resolve => (payload: BanksList[]) => resolve(payload),
);

export const getBanksListFail = createAction(
  'bank/GET_BANKS_LIST_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

export const getTopBanks = createAction('bank/GET_TOP_BANKS_REQUEST');

export const getTopBanksSuccess = createAction(
  'bank/GET_TOP_BANKS_SUCCESS',
  resolve => (payload: BanksList[]) => resolve(payload),
);

export const getTopBanksFail = createAction(
  'bank/GET_TOP_BANKS_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

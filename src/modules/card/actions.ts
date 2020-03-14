import { createAction } from 'deox';

import { ResponseErrors } from 'types/responseData';

export const changeCardData = createAction('card/CHANGE_CARD_DATA', resolve => (name, value) =>
  resolve(name, value),
);

export const setScanCard = createAction('card/SET_SCAN_CARD', resolve => payload =>
  resolve(payload),
);

export const scanCard = createAction('card/SCAN_CARD');

export const createUserCard = createAction('card/CREATE_USER_CARD_REQUEST');

export const createUserCardSuccess = createAction('card/CREATE_USER_CARD_SUCCESS');

export const createUserCardFail = createAction(
  'card/CREATE_USER_CARD_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

export const getUserCard = createAction('card/GET_USER_CARD_REQUEST');

export const getUserCardSuccess = createAction(
  'card/GET_USER_CARD_SUCCESS',
  resolve => (payload: any) => resolve(payload),
);

export const getUserCardFail = createAction(
  'card/GET_USER_CARD_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

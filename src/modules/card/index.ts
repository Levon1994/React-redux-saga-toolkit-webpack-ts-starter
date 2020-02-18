/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import { changeCardData } from './actions';
import { CardState } from './types';

const defaultState: CardState = {
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvcValue: '',
};

export const cardReducer = createReducer(defaultState, handle => [
  handle(changeCardData, (state, { payload, meta }) => ({
    ...state,
    [payload]: meta,
  })),
]);

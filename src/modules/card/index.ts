/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import { changeCardData, setScanCard } from './actions';
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
  handle(setScanCard, (state, { payload }) => {
    const expiryMonth =
      payload.expiryMonth > 10
        ? payload.expiryMonth.toString()
        : `0${payload.expiryMonth.toString()}`;
    return {
      ...state,
      cardNumber: payload.cardNumber || '',
      cardHolder: payload.cardholderName || '',
      expiryDate:
        payload.expiryYear > 0 ? `${expiryMonth} ${payload.expiryYear.toString().slice(-2)}` : '',
    };
  }),
]);

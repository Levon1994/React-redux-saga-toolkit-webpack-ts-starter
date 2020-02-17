/* eslint-disable @typescript-eslint/camelcase */
import { createReducer } from 'deox';

import { validateField } from 'utils/validation';
import { changeValue } from './actions';
import { AuthState } from './types';

const defaultState: AuthState = {
  firstName: {
    value: '',
    error: '',
  },
  lastName: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
};

export const authReducer = createReducer(defaultState, handle => [
  handle(changeValue, (state, { payload, meta }) => ({
    ...state,
    [payload]: {
      value: meta,
      error: validateField(payload, meta) || '',
    },
  })),
]);

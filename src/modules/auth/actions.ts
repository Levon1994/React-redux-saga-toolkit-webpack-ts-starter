import { createAction } from 'deox';

import { ResponseErrors } from 'types/responseData';
import { UserProfile } from 'modules/user/types';
import { BanksState } from 'modules/bank/types';
import { Values } from './types';

export const changeValue = createAction(
  'auth/CHANGE_VALUE',
  resolve => (payload: Partial<Values> | Partial<UserProfile> | Partial<BanksState>) =>
    resolve(payload),
);

export const register = createAction('auth/REGISTER_REQUEST');

export const registerSuccess = createAction('auth/REGISTER_SUCCESS', resolve => (payload: string) =>
  resolve(payload),
);

export const registerFail = createAction(
  'auth/REGISTER_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

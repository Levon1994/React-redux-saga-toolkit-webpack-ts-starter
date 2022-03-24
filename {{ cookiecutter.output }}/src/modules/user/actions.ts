import { createAction } from '@reduxjs/toolkit';

import { UserProfileModel } from '~/models/user';

export const setUser = createAction<UserProfileModel>('user/SET_USER');

export const setAuth = createAction<Nullable<{ access: string; refresh: string }>>('user/SET_AUTH');

export const signOut = createAction('user/SIGN_OUT');

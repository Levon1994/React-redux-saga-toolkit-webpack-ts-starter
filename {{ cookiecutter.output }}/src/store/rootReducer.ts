import { getType } from 'deox';
import { Action, combineReducers } from 'redux';
import { createMigrate, createTransform, persistReducer } from 'redux-persist';
import { MigrationManifest } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

import { resetStore } from '~/modules/app/actions';
import { userReducer } from '~/modules/user/reducer';

import { RootState } from './types';

const transforms = [
  createTransform(
    state => JSON.stringify(state),
    state =>
      JSON.parse(state, (key, value) =>
        typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
          ? new Date(value)
          : value,
      ),
  ),
];

const migrations: MigrationManifest = {
  // eslint-disable-next-line no-underscore-dangle
  0: state => (state ? { _persist: state._persist } : state),
};

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms,
  version: 0,
  migrate: createMigrate(migrations),
};

const appReducer = combineReducers({
  user: userReducer,
});

const reducer = (state: RootState | undefined, action: Action): RootState => {
  if (action.type === getType(resetStore)) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const rootReducer = persistReducer(rootPersistConfig, reducer);

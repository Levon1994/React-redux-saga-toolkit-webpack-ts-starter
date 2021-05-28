import { getType } from 'deox';
import { Action, combineReducers } from 'redux';
import { createTransform, persistReducer } from 'redux-persist';
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

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms,
};

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state: RootState | undefined, action: Action): RootState => {
  if (action.type === getType(resetStore)) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);

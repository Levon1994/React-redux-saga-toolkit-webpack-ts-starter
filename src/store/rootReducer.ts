import { Action, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// import { getType } from 'deox';
import { RootState } from 'types';
import AsyncStorage from '@react-native-community/async-storage';

import { onboardingReducer } from 'modules/reviewOnboarding';
import { authReducer } from 'modules/auth';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboardingReducer'],
};

const appReducer = combineReducers({ onboardingReducer, authReducer });

const rootReducer = (state: RootState | undefined, action: Action) => {
  // if (action.type === getType(resetStore)) {
  //   // eslint-disable-next-line no-param-reassign
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);

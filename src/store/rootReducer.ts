import { Action, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { RootState } from 'types';
import AsyncStorage from '@react-native-community/async-storage';

import { onboardingReducer } from 'modules/reviewOnboarding';
import { authReducer } from 'modules/auth';
import { cardReducer } from 'modules/card';
import { userReducer } from 'modules/user';
import { charityReducer } from 'modules/charity';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboardingReducer', 'userReducer', 'authReducer'],
};

const appReducer = combineReducers({
  onboardingReducer,
  authReducer,
  cardReducer,
  userReducer,
  charityReducer,
});

const rootReducer = (state: RootState | undefined, action: Action) => {
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);

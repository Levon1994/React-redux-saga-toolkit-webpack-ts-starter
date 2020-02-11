import { Action, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// import { getType } from 'deox';
import { RootState } from 'types';
import AsyncStorage from '@react-native-community/async-storage';

import { onboardingReducer } from 'modules/reviewOnboarding';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const appReducer = combineReducers({ onboardingReducer });

const rootReducer = (state: RootState | undefined, action: Action) => {
  // if (action.type === getType(resetStore)) {
  //   // eslint-disable-next-line no-param-reassign
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);

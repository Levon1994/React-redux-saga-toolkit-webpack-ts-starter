import { combineReducers } from 'redux';
import createReducer from 'helpers/createReducer';

import darkMode from './darkMode';

const rootReducer = combineReducers({
  darkMode,
});

export default rootReducer;

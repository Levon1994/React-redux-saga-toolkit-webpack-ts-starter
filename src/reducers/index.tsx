import { combineReducers } from 'redux';

const darkMode = (state = false, action: any) => {
    switch (action.type) {
        case 'DARK_MODE':
            return action.payload;
        default:
            return state
    }
}

const rootReducer = combineReducers({ darkMode });

export default rootReducer;

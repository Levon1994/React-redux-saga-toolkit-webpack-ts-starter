import { put, takeLatest, select } from 'redux-saga/effects';
import { getType } from 'deox';

import { UserProfile, UserProfileResponse } from 'api/UserProfile';
import { RootState } from 'types';

import { processRequestError } from 'modules/errors/actions';
import {
  getUser,
  getUserSuccess,
  getUserFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
} from './actions';

function* getUserProfileSaga() {
  try {
    const { userId } = yield select((state: RootState) => state.userReducer);
    const { data }: UserProfileResponse = yield UserProfile.getUserProfile(userId);
    yield put(getUserSuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getUserFail }));
  }
}

function* updateUserProfileSaga() {
  try {
    const {
      userId,
      user: { weekly_goal, first_name, last_name, email },
    } = yield select((state: RootState) => state.userReducer);
    const requestData = {
      weekly_goal,
      first_name,
      last_name,
      email,
    };
    const { data }: Partial<UserProfileResponse> = yield UserProfile.updateUserProfile(
      userId,
      requestData,
    );
    yield put(updateUserSuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: updateUserFail }));
  }
}

export function* watchUserProfile() {
  yield takeLatest(getType(getUser), getUserProfileSaga);
  yield takeLatest(getType(updateUser), updateUserProfileSaga);
}

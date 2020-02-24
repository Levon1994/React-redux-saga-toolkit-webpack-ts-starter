import { put, takeLatest } from 'redux-saga/effects';
import { getType } from 'deox';

import { UserProfile, GetUserProfileResponse } from 'api/UserProfile';

import { processRequestError } from 'modules/errors/actions';
import { getUser, getUserSuccess, getUserFail } from './actions';

function* getUserProfileSaga() {
  try {
    const { data }: GetUserProfileResponse = yield UserProfile.getUserProfile();
    yield put(getUserSuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getUserFail }));
  }
}

export function* watchUserProfile() {
  yield takeLatest(getType(getUser), getUserProfileSaga);
}

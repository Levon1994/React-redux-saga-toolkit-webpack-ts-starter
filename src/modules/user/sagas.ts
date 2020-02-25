import { put, takeLatest, select } from 'redux-saga/effects';
import { getType } from 'deox';

import { UserProfile, GetUserProfileResponse } from 'api/UserProfile';
import { RootState } from 'types';

import { processRequestError } from 'modules/errors/actions';
import { getUser, getUserSuccess, getUserFail } from './actions';

function* getUserProfileSaga() {
  try {
    const { userId } = yield select((state: RootState) => state.userReducer);
    const { data }: GetUserProfileResponse = yield UserProfile.getUserProfile(userId);
    yield put(getUserSuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getUserFail }));
  }
}

export function* watchUserProfile() {
  yield takeLatest(getType(getUser), getUserProfileSaga);
}

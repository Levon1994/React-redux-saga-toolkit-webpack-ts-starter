/* eslint-disable no-console */
import { put, takeLatest, delay, select } from 'redux-saga/effects';
import { getType } from 'deox';

import { Charity, CharityResponse } from 'api/Charity';
import { RootState } from 'types';

import { processRequestError } from 'modules/errors/actions';
import {
  getUserCharity,
  getUserCharitySuccess,
  getUserCharityFail,
  getUserFeed,
  getUserFeedSuccess,
  getUserFeedFail,
} from './actions';

function* getUserCharitySaga() {
  try {
    const { userId } = yield select((state: RootState) => state.userReducer);
    const { data }: CharityResponse = yield Charity.getUserCharity(userId);
    yield put(getUserCharitySuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getUserCharityFail }));
  }
}

function* getUserFeedSaga() {
  try {
    const { userId } = yield select((state: RootState) => state.userReducer);
    const { data }: CharityResponse = yield Charity.getUserFeed(userId);
    const feedArray: any[] = [];
    Object.entries(data).forEach(([key, value]) => feedArray.push({ [key]: value }));
    yield put(getUserFeedSuccess(feedArray));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getUserFeedFail }));
  }
}

export function* watchCharityPeriodically() {
  while (true) {
    // get charity 5 times per day
    yield delay(17280000);
    yield put(getUserCharity());
  }
}

export function* watchCharity() {
  yield takeLatest(getType(getUserCharity), getUserCharitySaga);
  yield takeLatest(getType(getUserFeed), getUserFeedSaga);
}

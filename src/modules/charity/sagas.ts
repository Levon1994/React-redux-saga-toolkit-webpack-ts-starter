/* eslint-disable no-console */
import { put, takeLatest, delay, select } from 'redux-saga/effects';
import { getType, ActionType } from 'deox';

import { Charity, CharityResponse, FeedResponse } from 'api/Charity';
import { RootState } from 'types';

import { processRequestError } from 'modules/errors/actions';
import {
  getUserCharity,
  getUserCharitySuccess,
  getUserCharityFail,
  getUserFeed,
  getUserFeedSuccess,
  getMoreUserFeedSuccess,
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

function* getUserFeedSaga({ payload }: ActionType<typeof getUserFeed>) {
  try {
    const { userId } = yield select((state: RootState) => state.userReducer);
    const { next_page } = yield select((state: RootState) => state.charityReducer);
    let page = 1;
    if (payload && next_page) {
      page = next_page;
    }
    const { data }: FeedResponse = yield Charity.getUserFeed(userId, page);
    if (payload) {
      yield put(getMoreUserFeedSuccess(data));
    } else {
      yield put(getUserFeedSuccess(data));
    }
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getUserFeedFail }));
  }
}

export function* watchCharityPeriodically() {
  while (true) {
    // get charity and user feed 5 times per day
    yield delay(17280000);
    yield put(getUserCharity());
    yield put(getUserFeed(false));
  }
}

export function* watchCharity() {
  yield takeLatest(getType(getUserCharity), getUserCharitySaga);
  yield takeLatest(getType(getUserFeed), getUserFeedSaga);
}

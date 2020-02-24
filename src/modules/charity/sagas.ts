import { put, takeLatest, delay } from 'redux-saga/effects';
import { getType } from 'deox';

import { Charity, CharityResponse } from 'api/Charity';

import { processRequestError } from 'modules/errors/actions';
import { getUserCharity, getUserCharitySuccess, getUserCharityFail } from './actions';

function* getUserCharitySaga() {
  try {
    const { data }: CharityResponse = yield Charity.getUserCharity();
    yield put(getUserCharitySuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getUserCharityFail }));
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
}

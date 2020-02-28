/* eslint-disable no-console */
import { put, takeLatest, delay, select } from 'redux-saga/effects';
import { getType } from 'deox';

import { Charity, CharityResponse, TransactionsResponse } from 'api/Charity';
import { RootState } from 'types';

import { processRequestError } from 'modules/errors/actions';
import {
  getUserCharity,
  getUserCharitySuccess,
  getUserCharityFail,
  getUserTransactions,
  getUserTransactionsSuccess,
  // getUserTransactionsFail,
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

function* getUserTransactionsSaga() {
  try {
    const { userId } = yield select((state: RootState) => state.userReducer);
    const { data }: TransactionsResponse = yield Charity.getUserTransactions(userId);
    console.log('data: ', data);
    yield put(getUserTransactionsSuccess(data));
  } catch (e) {
    console.log('e: ', e);
    // yield put(processRequestError({ error: e, failAction: getUserTransactionsFail }));
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
  yield takeLatest(getType(getUserTransactions), getUserTransactionsSaga);
}

/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects';
import { getType, ActionType } from 'deox';

import { BankSystemResponse, BankSystem } from 'api/BankSystem';

import { processRequestError } from 'modules/errors/actions';
import {
  getBanksList,
  getBanksListSuccess,
  getBanksListFail,
  getTopBanks,
  getTopBanksSuccess,
  getTopBanksFail,
} from './actions';

function* getBanksListSaga({ payload }: ActionType<typeof getBanksList>) {
  console.log('payload: ', payload);
  try {
    // const { searchValue } = yield select((state: RootState) => state.bankReducer);
    const { data }: BankSystemResponse = yield BankSystem.getBanksList(payload);
    console.log('data: ', data);
    yield put(getBanksListSuccess(data));
  } catch (e) {
    console.log('e: ', e.response);
    yield put(processRequestError({ error: e, failAction: getBanksListFail }));
  }
}

function* getTopBanksSaga() {
  try {
    const { data }: BankSystemResponse = yield BankSystem.getTopBanks();
    console.log('data: ', data);
    yield put(getTopBanksSuccess(data));
  } catch (e) {
    console.log('e: ', e.response);
    yield put(processRequestError({ error: e, failAction: getTopBanksFail }));
  }
}

export function* watchBankSystem() {
  yield takeLatest(getType(getBanksList), getBanksListSaga);
  yield takeLatest(getType(getTopBanks), getTopBanksSaga);
}

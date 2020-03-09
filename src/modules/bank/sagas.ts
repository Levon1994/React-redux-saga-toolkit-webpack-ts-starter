/* eslint-disable no-console */
import { put, takeLatest, select } from 'redux-saga/effects';
import { getType, ActionType } from 'deox';

import { BankSystemResponse, BankSystem } from 'api/BankSystem';
import { RootState } from 'types';

import { processRequestError } from 'modules/errors/actions';
import {
  getBanksList,
  getBanksListSuccess,
  getBanksListFail,
  getTopBanks,
  getTopBanksSuccess,
  getTopBanksFail,
  createBankAccount,
  // createBankAccountSuccess,
  // createBankAccountFail,
} from './actions';

function* getBanksListSaga({ payload }: ActionType<typeof getBanksList>) {
  try {
    const { data }: BankSystemResponse = yield BankSystem.getBanksList(payload);
    yield put(getBanksListSuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getBanksListFail }));
  }
}

function* getTopBanksSaga() {
  try {
    const { data }: BankSystemResponse = yield BankSystem.getTopBanks();
    yield put(getTopBanksSuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getTopBanksFail }));
  }
}

function* createBankAccountSaga({ payload }: ActionType<typeof createBankAccount>) {
  try {
    const { values } = yield select((state: RootState) => state.bankReducer);
    const { userId } = yield select((state: RootState) => state.userReducer);
    const requestData = {
      user_id: userId,
      bank_id: payload,
      loginId: values.loginId.trim(),
      password: values.password.trim(),
      secondaryLoginId: values.secondaryLoginId.trim(),
      securityCode: values.securityCode.trim(),
    };
    const { data } = yield BankSystem.createUserBankAccount(requestData);
    console.log('data: ', data);
    // yield put(createBankAccountSuccess());
  } catch (e) {
    console.log('e: ', e.response);
    // yield put(processRequestError({ error: e, failAction: createBankAccountFail }));
  }
}

export function* watchBankSystem() {
  yield takeLatest(getType(getBanksList), getBanksListSaga);
  yield takeLatest(getType(getTopBanks), getTopBanksSaga);
  yield takeLatest(getType(createBankAccount), createBankAccountSaga);
}

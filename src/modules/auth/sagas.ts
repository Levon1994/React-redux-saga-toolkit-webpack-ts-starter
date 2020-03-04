import { put, select, takeLatest } from 'redux-saga/effects';
import { getType } from 'deox';

import Api from 'api';
import { Register } from 'api/Auth';
import { RootState } from 'types';

import { processRequestError } from 'modules/errors/actions';
import { setUser } from 'modules/user/actions';
import { register, registerSuccess, registerFail } from './actions';

function* registerSaga() {
  try {
    const { values } = yield select((state: RootState) => state.authReducer);
    const { fcmToken } = yield select((state: RootState) => state.notificationsReducer);
    const requestData = {
      email: values.email.trim(),
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      password: values.password,
      device_token: fcmToken,
    };
    const { data } = yield Register.register(requestData);
    Api.setAuthToken(data.access_token);
    yield put(setUser(data.user_id));
    yield put(registerSuccess(data.access_token));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: registerFail }));
  }
}

export function* watchAuth() {
  yield takeLatest(getType(register), registerSaga);
}

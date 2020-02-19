/* eslint-disable no-console */
import { takeLatest, put } from 'redux-saga/effects';
import { CardIOModule } from 'react-native-awesome-card-io';

import { scanCard, setScanCard } from './actions';

function* scanCardSaga() {
  try {
    const card = yield CardIOModule.scanCard({
      hideCardIOLogo: true,
      suppressManualEntry: true,
      scanInstructions: 'Hold card here. It will scan automatically.',
      suppressConfirmation: true,
      scanExpiry: true,
    });
    yield put(setScanCard(card));
  } catch (err) {
    // the user cancelled
    console.log(err);
  }
}

export function* watchCard() {
  yield takeLatest(scanCard, scanCardSaga);
}

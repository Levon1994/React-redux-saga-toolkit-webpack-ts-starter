import { all } from 'redux-saga/effects';

import { watchCard } from 'modules/card/sagas';

export default function* rootSaga() {
  yield all([watchCard()]);
}

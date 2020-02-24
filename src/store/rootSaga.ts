import { all } from 'redux-saga/effects';

import { watchErrors } from 'modules/errors/sagas';
import { watchCard } from 'modules/card/sagas';
import { watchUserProfile } from 'modules/user/sagas';
import { watchCharity, watchCharityPeriodically } from 'modules/charity/sagas';

export default function* rootSaga() {
  yield all([
    watchErrors(),
    watchCard(),
    watchUserProfile(),
    watchCharity(),
    watchCharityPeriodically(),
  ]);
}

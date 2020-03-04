import { all } from 'redux-saga/effects';

import { watchErrors } from 'modules/errors/sagas';
import { watchAuth } from 'modules/auth/sagas';
import { watchCard } from 'modules/card/sagas';
import { watchUserProfile } from 'modules/user/sagas';
import { watchCharity, watchCharityPeriodically } from 'modules/charity/sagas';
import { watchNotifications } from 'modules/notifications/sagas';

export default function* rootSaga() {
  yield all([
    watchErrors(),
    watchAuth(),
    watchCard(),
    watchUserProfile(),
    watchCharity(),
    watchCharityPeriodically(),
    watchNotifications(),
  ]);
}

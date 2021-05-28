import { all, SagaGenerator } from 'typed-redux-saga';

import { watchUser } from '~/modules/user/sagas';

export default function* rootSaga(): SagaGenerator<any> {
  yield* all([watchUser()]);
}

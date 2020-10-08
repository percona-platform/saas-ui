import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authSagas } from './auth/auth.sagas';
import { persistenceSagas } from './persistence/persistence.sagas';

export function* rootSaga() {
  yield all([
    authSagas(),
    persistenceSagas(),
  ]);
}

export const sagaMiddleware = createSagaMiddleware();

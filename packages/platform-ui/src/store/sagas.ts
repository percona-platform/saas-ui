import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authSagas } from './auth/auth.sagas';
import { persistenceSaga } from './persistence/persistence.sagas';

export function* rootSaga() {
  yield all([
    authSagas(),
    persistenceSaga(),
  ]);
}

export const sagaMiddleware = createSagaMiddleware();

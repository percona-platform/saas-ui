import {
  takeEvery, all, select, call,
} from 'redux-saga/effects';
import { saveState } from 'store/persistence/engine';
import {
  authRefreshAction, authLoginAction, authSignupAction, authLogoutAction,
} from 'store/auth/auth.reducer';

export function* save() {
  const state = yield select();

  yield call(saveState, state);
}

export function* persistenceSagas() {
  yield all([
    takeEvery(authRefreshAction.success, save),
    takeEvery(authRefreshAction.failure, save),
    takeEvery(authLoginAction.success, save),
    takeEvery(authLoginAction.failure, save),
    takeEvery(authSignupAction.success, save),
    takeEvery(authSignupAction.failure, save),
    takeEvery(authLogoutAction.success, save),
    takeEvery(authLogoutAction.failure, save),
  ]);
}

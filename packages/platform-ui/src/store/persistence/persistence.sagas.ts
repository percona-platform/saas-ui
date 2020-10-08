import { fork, all, take, select, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { saveState } from 'store/persistence/engine';
import { authRefreshAction, authLoginAction, authSignupAction, authLogoutAction } from 'store/auth/auth.reducer';

const PersistedActions = new Set([
  getType(authRefreshAction.request),
  getType(authLoginAction.request),
  getType(authSignupAction.request),
  getType(authLogoutAction.request),
]);

function* save() {
  while (true) {
    const action = yield take();

    if (!PersistedActions.has(action.type)) {
      continue;
    }

    const state = yield select();

    try {
      yield call(saveState, state);
    } catch (e) {
      console.error(e);
    }
  }
}

export function* persistenceSaga() {
  yield all([
      fork(save),
  ]);
}

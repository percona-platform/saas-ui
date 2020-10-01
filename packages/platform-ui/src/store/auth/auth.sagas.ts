import { AuthPB } from 'core';
import { all, put, call, takeLatest, StrictEffect } from 'redux-saga/effects';
import { authRefreshAction } from './auth.reducer';
import { refreshSession } from 'core/api/auth';
import { Messages } from 'core/messages';
import * as grpcWeb from 'grpc-web';
import { store } from 'store';
import { saveState } from 'store/persistency';

function* authRefreshSessionRequest(): Generator<StrictEffect, void, AuthPB.RefreshSessionResponse> {
  try {
    const response: AuthPB.RefreshSessionResponse = yield call(refreshSession);

    yield put(authRefreshAction.success({ email: response.getEmail() }));
  } catch (e) {
    if (e.code === grpcWeb.StatusCode.UNAUTHENTICATED) {
      yield put(authRefreshAction.failure(new Error(Messages.api.unauthenticated)));
    } else {
      yield put(authRefreshAction.failure(new Error(Messages.api.refreshSessionFailed)));
      console.error(e);
    }
  } finally {
    saveState(store.getState());
  }
}

export function* authSagas() {
  yield all([
      takeLatest(authRefreshAction.request, authRefreshSessionRequest),
  ]);
}

import { AuthPB } from 'core';
import { all, put, call, takeLatest, StrictEffect } from 'redux-saga/effects';
import { authRefreshAction, authLoginAction } from './auth.reducer';
import { refreshSession, signIn } from 'core/api/auth';
import { Messages } from 'core/messages';
import * as grpcWeb from 'grpc-web';
import { toast } from 'react-toastify';
import { history, store } from 'store';
import { saveState } from 'store/persistency';
import { Routes } from 'core/routes';

function* authRefreshSessionRequest(): Generator<StrictEffect, void, AuthPB.RefreshSessionResponse> {
  try {
    const response: AuthPB.RefreshSessionResponse = yield call(refreshSession);

    yield put(authRefreshAction.success({ email: response.getEmail() }));
  } catch (e) {
    if (e.code !== grpcWeb.StatusCode.UNAUTHENTICATED) {
      console.error(e);
    }
    yield put(authRefreshAction.failure(e));
  } finally {
    saveState(store.getState());
  }
}

function* authLoginRequest(action: ReturnType<typeof authLoginAction.request>): Generator<StrictEffect, void, AuthPB.RefreshSessionResponse> {
  try {
    yield call(signIn, action.payload);

    yield put(authRefreshAction.success({ email: action.payload.email }));
  } catch (e) {
    yield put(authLoginAction.failure(e));
  } finally {
    saveState(store.getState());
  }
}

function* authLoginFailure(action: ReturnType<typeof authLoginAction.failure>): Generator<StrictEffect, void, never> {
  if (action.payload.code === grpcWeb.StatusCode.INVALID_ARGUMENT) {
    yield call([toast, toast.error], action.payload.message);
  } else {
    yield call([toast, toast.error], Messages.api.signInFailed);
    console.error(action.payload);
  }
}

function* authLoginSuccess(action: ReturnType<typeof authLoginAction.success>): Generator<StrictEffect, void, never> {
  yield call([toast, toast.success], `${Messages.api.signInSucceeded} ${action.payload.email}`);
  yield call([history, history.replace], Routes.root);
}

export function* authSagas() {
  yield all([
      takeLatest(authRefreshAction.request, authRefreshSessionRequest),
      takeLatest(authLoginAction.request, authLoginRequest),
      takeLatest(authLoginAction.success, authLoginSuccess),
      takeLatest(authLoginAction.failure, authLoginFailure),
  ]);
}

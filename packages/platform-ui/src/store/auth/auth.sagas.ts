import { AuthPB } from 'core';
import { all, put, call, takeLatest, StrictEffect } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { authRefreshAction, authLoginAction, authSignupAction, authLogoutAction } from './auth.reducer';
import { refreshSession, signIn, signUp, signOut } from 'core/api/auth';
import { Messages } from 'core/api/messages';
import * as grpcWeb from 'grpc-web';
import { toast } from 'react-toastify';
import { store } from 'store';
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

function* authLoginRequest(action: ReturnType<typeof authLoginAction.request>): Generator<StrictEffect, void, AuthPB.SignInResponse> {
  try {
    yield call(signIn, action.payload);

    yield put(authLoginAction.success({ email: action.payload.email }));
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
    yield call([toast, toast.error], Messages.signInFailed);
    console.error(action.payload);
  }
}

function* authLoginSuccess(action: ReturnType<typeof authLoginAction.success>): Generator<StrictEffect, void, never> {
  yield call([toast, toast.success], `${Messages.signInSucceeded} ${action.payload.email}`);
  yield put(replace(Routes.root));
}

function* authSignupRequest(action: ReturnType<typeof authSignupAction.request>): Generator<StrictEffect, void, AuthPB.SignUpResponse> {
  try {
      yield call(signUp, action.payload);

      yield put(authSignupAction.success());
    } catch (e) {
      yield put(authSignupAction.failure(e));
    } finally {
      saveState(store.getState());
    }
}

function* authSignupFailure(action: ReturnType<typeof authSignupAction.failure>): Generator<StrictEffect, void, never> {
  yield call([toast, toast.error], Messages.signUpFailed);
  console.error(action.payload);
}

function* authSignupSuccess(): Generator<StrictEffect, void, never> {
  yield call([toast, toast.success], Messages.signUpSucceeded);
  yield put(replace(Routes.root));
}

function* authLogoutRequest(): Generator<StrictEffect, void, AuthPB.SignOutResponse> {
  try {
    yield call(signOut);

    yield put(authLogoutAction.success());
  } catch (e) {
      yield put(authRefreshAction.failure(e));
  } finally {
    saveState(store.getState());
  }
}

function* authLogoutFailure(action: ReturnType<typeof authLogoutAction.failure>): Generator<StrictEffect, void, never>{
  yield call([toast, toast.success], Messages.signOutFailed);
  console.error(action.payload);
}

function* authLogoutSuccess(): Generator<StrictEffect, void, never> {
  yield call([toast, toast.success], Messages.signOutSucceeded);
  yield put(replace(Routes.root));
}

export function* authSagas() {
  yield all([
      takeLatest(authRefreshAction.request, authRefreshSessionRequest),
      takeLatest(authLoginAction.request, authLoginRequest),
      takeLatest(authLoginAction.success, authLoginSuccess),
      takeLatest(authLoginAction.failure, authLoginFailure),
      takeLatest(authSignupAction.request, authSignupRequest),
      takeLatest(authSignupAction.success, authSignupSuccess),
      takeLatest(authSignupAction.failure, authSignupFailure),
      takeLatest(authLogoutAction.request, authLogoutRequest),
      takeLatest(authLogoutAction.success, authLogoutSuccess),
      takeLatest(authLogoutAction.failure, authLogoutFailure),
  ]);
}

import { AuthPB } from 'core';
import {
  all, put, call, takeLatest, StrictEffect
} from 'redux-saga/effects';
import {
  refreshSession, signIn, signUp, signOut
} from 'core/api/auth';
import { Messages } from 'core/api/messages';
import * as grpcWeb from 'grpc-web';
import { toast } from 'react-toastify';
import { Routes } from 'core/routes';
import { history } from 'core/history';
import {
  authRefreshAction, authLoginAction, authSignupAction, authLogoutAction
} from './auth.reducer';

type AuthRefreshSessionRequestGenerator = Generator<StrictEffect, void, AuthPB.RefreshSessionResponse>;

export function* authRefreshSessionRequest(): AuthRefreshSessionRequestGenerator {
  try {
    const response: AuthPB.RefreshSessionResponse = yield call(refreshSession);

    yield put(authRefreshAction.success({ email: response.getEmail() }));
  } catch (e) {
    if (e.code !== grpcWeb.StatusCode.UNAUTHENTICATED) {
      console.error(e);
    }

    yield put(authRefreshAction.failure(e));
  }
}

type AuthLoginActionRequest = ReturnType<typeof authLoginAction.request>;
type AuthLoginRequestGenerator = Generator<StrictEffect, void, AuthPB.SignInResponse>;

export function* authLoginRequest(action: AuthLoginActionRequest): AuthLoginRequestGenerator {
  try {
    yield call(signIn, action.payload);

    yield put(authLoginAction.success({ email: action.payload.email }));
  } catch (e) {
    yield put(authLoginAction.failure(e));
  }
}

type AuthLoginActionFailure = ReturnType<typeof authLoginAction.failure>;
type AuthLoginFailureGenerator = Generator<StrictEffect, void, never>;

export function* authLoginFailure(action: AuthLoginActionFailure): AuthLoginFailureGenerator {
  if (action.payload.code === grpcWeb.StatusCode.INVALID_ARGUMENT) {
    yield call([toast, toast.error], action.payload.message);
  } else {
    yield call([toast, toast.error], Messages.signInFailed);
    console.error(action.payload);
  }
}

type AuthLoginActionSuccess = ReturnType<typeof authLoginAction.success>;
type AuthLoginSuccessGenerator = Generator<StrictEffect, void, never>;

export function* authLoginSuccess(action: AuthLoginActionSuccess): AuthLoginSuccessGenerator {
  yield call([toast, toast.success], `${Messages.signInSucceeded} ${action.payload.email}`);
  history.replace(Routes.root);
}

type AuthSignupActionRequest = ReturnType<typeof authSignupAction.request>;
type AuthSignupRequestGenerator = Generator<StrictEffect, void, AuthPB.SignUpResponse>;

export function* authSignupRequest(action: AuthSignupActionRequest): AuthSignupRequestGenerator {
  try {
    yield call(signUp, action.payload);

    yield put(authSignupAction.success());
  } catch (e) {
    yield put(authSignupAction.failure(e));
  }
}

type AuthSignupActionFailure = ReturnType<typeof authSignupAction.failure>;
type AuthSignupFailureGenerator = Generator<StrictEffect, void, never>;

export function* authSignupFailure(action: AuthSignupActionFailure): AuthSignupFailureGenerator {
  yield call([toast, toast.error], Messages.signUpFailed);
  console.error(action.payload);
}

type AuthSignupSuccessGenerator = Generator<StrictEffect, void, never>;

export function* authSignupSuccess(): AuthSignupSuccessGenerator {
  yield call([toast, toast.success], Messages.signUpSucceeded);
  history.replace(Routes.login);
}

type AuthLogoutRequestGenerator = Generator<StrictEffect, void, AuthPB.SignOutResponse>;

export function* authLogoutRequest(): AuthLogoutRequestGenerator {
  try {
    yield call(signOut);

    yield put(authLogoutAction.success());
  } catch (e) {
    yield put(authLogoutAction.failure(e));
  }
}

type AuthLogoutActionFailure = ReturnType<typeof authLogoutAction.failure>;
type AuthLogoutFailureGenerator = Generator<StrictEffect, void, never>;

export function* authLogoutFailure(action: AuthLogoutActionFailure): AuthLogoutFailureGenerator {
  yield call([toast, toast.error], Messages.signOutFailed);
  console.error(action.payload);
}

type AuthLogoutSuccessGenerator = Generator<StrictEffect, void, never>;

export function* authLogoutSuccess(): AuthLogoutSuccessGenerator {
  yield call([toast, toast.success], Messages.signOutSucceeded);
  history.replace(Routes.root);
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

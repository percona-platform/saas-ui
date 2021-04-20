import { AuthPB } from 'core';
import {
  all, put, call, takeLatest, StrictEffect,
} from 'redux-saga/effects';
import {
  refreshSession, signIn, signUp, signOut, getProfile, updateProfile,
} from 'core/api/auth';
import { SignUp } from 'core/api/types';
import { Messages } from 'core/api/messages';
import * as grpcWeb from 'grpc-web';
import { toast } from 'react-toastify';
import { Routes } from 'core/routes';
import { history } from 'core/history';
import {
  authRefreshAction,
  authLoginAction,
  authSignupAction,
  authLogoutAction,
  authGetProfileAction,
  authUpdateProfileAction,
} from './auth.reducer';

// Refresh Session

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

// Login

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

// Signup

type AuthSignupActionRequest = ReturnType<typeof authSignupAction.request>;
type AuthSignupRequestGenerator = Generator<StrictEffect, void, AuthPB.SignUpResponse>;

export function* authSignupRequest(action: AuthSignupActionRequest): AuthSignupRequestGenerator {
  try {
    yield call<SignUp>(signUp, action.payload);

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

// Logout

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

// Get Profile

type AuthGetProfileRequestGenerator = Generator<StrictEffect, void, AuthPB.GetProfileResponse>;

export function* authGetProfileRequest(): AuthGetProfileRequestGenerator {
  try {
    const response: AuthPB.GetProfileResponse = yield call(getProfile);

    yield put(authGetProfileAction.success({
      email: response.getEmail(),
      firstName: response.getFirstName(),
      lastName: response.getLastName(),
    }));
  } catch (e) {
    yield put(authGetProfileAction.failure(e));
  }
}

type AuthGetProfileActionFailure = ReturnType<typeof authGetProfileAction.failure>;
type AuthGetProfileFailureGenerator = Generator<StrictEffect, void, never>;

export function* authGetProfileFailure(action: AuthGetProfileActionFailure):
AuthGetProfileFailureGenerator {
  yield call([toast, toast.error], Messages.genericAPIFailure);
  console.error(action.payload);
  history.replace(Routes.root);
}

// Update Profile

type AuthUpdateProfileActionRequest = ReturnType<typeof authUpdateProfileAction.request>;
type AuthUpdateProfileRequestGenerator = Generator<StrictEffect, void, AuthPB.UpdateProfileResponse>;

export function* authUpdateProfileRequest(
  action: AuthUpdateProfileActionRequest): AuthUpdateProfileRequestGenerator {
  try {
    yield call(updateProfile, action.payload);

    yield put(authUpdateProfileAction.success());
  } catch (e) {
    yield put(authUpdateProfileAction.failure(e));
  }
}

type AuthUpdateProfileActionFailure = ReturnType<typeof authUpdateProfileAction.failure>;
type AuthUpdateProfileFailureGenerator = Generator<StrictEffect, void, never>;

export function* authUpdateProfileFailure(action: AuthUpdateProfileActionFailure):
AuthUpdateProfileFailureGenerator {
  if (action.payload.code === grpcWeb.StatusCode.INVALID_ARGUMENT) {
    yield call([toast, toast.error], action.payload.message);
  } else {
    yield call([toast, toast.error], Messages.genericAPIFailure);
    console.error(action.payload);
  }
}

type AuthUpdateProfileSuccessGenerator = Generator<StrictEffect, void, never>;

export function* authUpdateProfileSuccess(): AuthUpdateProfileSuccessGenerator {
  yield call([toast, toast.success], Messages.updateProfileSucceeded);
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
    takeLatest(authGetProfileAction.request, authGetProfileRequest),
    takeLatest(authGetProfileAction.failure, authGetProfileFailure),
    takeLatest(authUpdateProfileAction.request, authUpdateProfileRequest),
    takeLatest(authUpdateProfileAction.failure, authUpdateProfileFailure),
    takeLatest(authUpdateProfileAction.success, authUpdateProfileSuccess),
  ]);
}

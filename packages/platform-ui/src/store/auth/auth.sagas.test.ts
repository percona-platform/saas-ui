import { runSaga, Saga } from 'redux-saga';
import { all, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from 'typesafe-actions';
import { authRefreshAction, authLoginAction, authSignupAction, authLogoutAction } from './auth.reducer';
import { authSagas, authRefreshSessionRequest, authLoginFailure, authLoginRequest, authLoginSuccess, authLogoutFailure, authLogoutRequest, authLogoutSuccess, authSignupFailure, authSignupRequest, authSignupSuccess } from './auth.sagas';
import { Messages } from 'core/api/messages';
import { Routes } from 'core/routes';

import { AuthPB } from 'core';
import * as grpcWeb from 'grpc-web';
import * as authApi from 'core/api/auth';
import { toast } from 'react-toastify';
import { history } from 'core/history';

const TEST_EMAIL = 'test@test.test';
const TEST_MESSAGE = 'test';
const TEST_PASSWORD = 'test';

type Action = PayloadAction<string, any>;

let consoleError: jest.SpyInstance;
let toastError: jest.SpyInstance;
let toastSuccess: jest.SpyInstance;
let historyReplace: jest.SpyInstance;
let dispatchedActions: Action[];

const runSagaPromise = (saga: Saga, payload?: any) => runSaga({
  dispatch: (action: Action) => {
    dispatchedActions.push(action);
  }
}, saga, { payload }).toPromise();

describe('Auth Sagas', () => {
  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    toastError = jest.spyOn(toast, 'error');
    toastSuccess = jest.spyOn(toast, 'success');
    historyReplace = jest.spyOn(history, 'replace');
    dispatchedActions = [];
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('authSagas calls the right function on auth actions', () => {
    const genObj = authSagas();
    const expected = all([
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

    expect(genObj.next().value).toEqual(expected);
  });

  test('authSagas should be done on next iteration', () => {
    const genObj = authSagas();
    genObj.next();
    expect(genObj.next().done).toBe(true);
  });

  test('authRefreshSessionRequest succeeds', async () => {
    const refreshSession = jest.spyOn(authApi, 'refreshSession').mockImplementation(() => Promise.resolve({
      getEmail: () => TEST_EMAIL,
    } as AuthPB.RefreshSessionResponse));

    await runSagaPromise(authRefreshSessionRequest as Saga);

    expect(dispatchedActions).toEqual([authRefreshAction.success({ email: TEST_EMAIL })]);

    expect(refreshSession).toHaveBeenCalledTimes(1);

    refreshSession.mockRestore();
  });

  test('authRefreshSessionRequest fails (generic error)', async () => {
    const error = { code: grpcWeb.StatusCode.CANCELLED };
    const refreshSession = jest.spyOn(authApi, 'refreshSession').mockImplementation(() => Promise.reject(error));

    await runSagaPromise(authRefreshSessionRequest as Saga);

    expect(dispatchedActions).toEqual([authRefreshAction.failure(error as grpcWeb.Error)]);

    expect(refreshSession).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledWith(error);

    refreshSession.mockRestore();
  });

  test('authRefreshSessionRequest fails (unauthenticated)', async () => {
    const error = { code: grpcWeb.StatusCode.UNAUTHENTICATED };
    const refreshSession = jest.spyOn(authApi, 'refreshSession').mockImplementation(() => Promise.reject(error));

    await runSagaPromise(authRefreshSessionRequest as Saga);

    expect(dispatchedActions).toEqual([authRefreshAction.failure(error as grpcWeb.Error)]);
    expect(refreshSession).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledTimes(0);

    refreshSession.mockRestore();
  });

  test('authLoginRequest succeeds', async () => {
    const signIn = jest.spyOn(authApi, 'signIn').mockImplementation(() => Promise.resolve({} as AuthPB.SignInResponse));

    await runSagaPromise(authLoginRequest as Saga, { email: TEST_EMAIL });

    expect(dispatchedActions).toEqual([authLoginAction.success({ email: TEST_EMAIL })]);

    expect(signIn).toHaveBeenCalledWith({ email: TEST_EMAIL });
    expect(signIn).toHaveBeenCalledTimes(1);

    signIn.mockRestore();
  });

  test('authLoginRequest fails', async () => {
    const error = { code: grpcWeb.StatusCode.CANCELLED };
    const signIn = jest.spyOn(authApi, 'signIn').mockImplementation(() => Promise.reject(error));

    await runSagaPromise(authLoginRequest as Saga, { email: TEST_EMAIL });

    expect(dispatchedActions).toEqual([authLoginAction.failure(error as grpcWeb.Error)]);

    expect(signIn).toHaveBeenCalledTimes(1);

    signIn.mockRestore();
  });

  test('authLoginFailure (invalid argument)', async () => {
    await runSagaPromise(authLoginFailure as Saga, { code: grpcWeb.StatusCode.INVALID_ARGUMENT, message: TEST_MESSAGE });

    expect(dispatchedActions).toEqual([]);
    expect(toastError).toHaveBeenCalledWith(TEST_MESSAGE);
    expect(toastError).toHaveBeenCalledTimes(1);
  });

  test('authLoginFailure (generic error)', async () => {
    const error = { code: grpcWeb.StatusCode.CANCELLED };

    await runSagaPromise(authLoginFailure as Saga, { code: grpcWeb.StatusCode.CANCELLED });

    expect(dispatchedActions).toEqual([]);
    expect(toastError).toHaveBeenCalledWith(Messages.signInFailed);
    expect(toastError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledWith(error);
  });

  test('authLoginSuccess', async () => {
    await runSagaPromise(authLoginSuccess as Saga, { email: TEST_EMAIL });

    expect(dispatchedActions).toEqual([]);
    expect(toastSuccess).toHaveBeenCalledWith(`${Messages.signInSucceeded} ${TEST_EMAIL}`);
    expect(toastSuccess).toHaveBeenCalledTimes(1);
    expect(historyReplace).toHaveBeenCalledTimes(1);
    expect(historyReplace).toHaveBeenCalledWith(Routes.root);
  });

  test('authSignupRequest succeeds', async () => {
    const signUp = jest.spyOn(authApi, 'signUp').mockImplementation(() => Promise.resolve({} as AuthPB.SignUpResponse));

    await runSagaPromise(authSignupRequest as Saga, { email: TEST_EMAIL, password: TEST_PASSWORD });

    expect(dispatchedActions).toEqual([authSignupAction.success()]);

    expect(signUp).toHaveBeenCalledTimes(1);

    signUp.mockRestore();
  });

  test('authSignupRequest fails', async () => {
    const error = { code: grpcWeb.StatusCode.CANCELLED };

    const signUp = jest.spyOn(authApi, 'signUp').mockImplementation(() => Promise.reject(error));

    await runSagaPromise(authSignupRequest as Saga, { email: TEST_EMAIL, password: TEST_PASSWORD });

    expect(dispatchedActions).toEqual([authSignupAction.failure(error as grpcWeb.Error)]);
    expect(signUp).toHaveBeenCalledTimes(1);

    signUp.mockRestore();
  });

  test('authSignupFailure', async () => {
    await runSagaPromise(authSignupFailure as Saga, TEST_MESSAGE);

    expect(toastError).toBeCalledTimes(1);
    expect(toastError).toBeCalledWith(Messages.signUpFailed);
    expect(consoleError).toBeCalledTimes(1);
    expect(consoleError).toBeCalledWith(TEST_MESSAGE);
  });

  test('authSignupSuccess', async () => {
    await runSagaPromise(authSignupSuccess as Saga);

    expect(toastSuccess).toBeCalledTimes(1);
    expect(toastSuccess).toBeCalledWith(Messages.signUpSucceeded);
    expect(historyReplace).toBeCalledTimes(1);
    expect(historyReplace).toBeCalledWith(Routes.root);
  });

  test('authLogoutRequest succeeds', async () => {
    const signOut = jest.spyOn(authApi, 'signOut').mockImplementation(() => Promise.resolve({} as AuthPB.SignOutResponse));

    await runSagaPromise(authLogoutRequest as Saga);

    expect(dispatchedActions).toEqual([authLogoutAction.success()]);

    expect(signOut).toHaveBeenCalledTimes(1);

    signOut.mockRestore();
  });

  test('authLogoutRequest fails', async () => {
    const error = { code: grpcWeb.StatusCode.CANCELLED };

    const signOut = jest.spyOn(authApi, 'signOut').mockImplementation(() => Promise.reject(error));

    await runSagaPromise(authLogoutRequest as Saga);

    expect(dispatchedActions).toEqual([authLogoutAction.failure(error as grpcWeb.Error)]);
    expect(signOut).toHaveBeenCalledTimes(1);

    signOut.mockRestore();
  });

  test('authLogoutFailure', async () => {
    await runSagaPromise(authLogoutFailure as Saga, TEST_MESSAGE);

    expect(toastError).toBeCalledTimes(1);
    expect(toastError).toBeCalledWith(Messages.signOutFailed);
    expect(consoleError).toBeCalledTimes(1);
    expect(consoleError).toBeCalledWith(TEST_MESSAGE);
  });

  test('authLogoutSuccess', async () => {
    await runSagaPromise(authLogoutSuccess as Saga);

    expect(toastSuccess).toBeCalledTimes(1);
    expect(toastSuccess).toBeCalledWith(Messages.signOutSucceeded);
    expect(historyReplace).toBeCalledTimes(1);
    expect(historyReplace).toBeCalledWith(Routes.root);
  });
});

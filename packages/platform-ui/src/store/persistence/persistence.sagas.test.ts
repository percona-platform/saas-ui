import {
  authRefreshAction, authLoginAction, authSignupAction, authLogoutAction,
} from 'store/auth/auth.reducer';
import {
  all, call, takeEvery, select,
} from 'redux-saga/effects';
import { save, persistenceSagas } from 'store/persistence/persistence.sagas';
import * as persistenceEngine from 'store/persistence/engine';

let saveState: jest.SpyInstance;

const TEST_STATE = { test: 'state' };

describe('Persistence Sagas', () => {
  beforeEach(() => {
    saveState = jest.spyOn(persistenceEngine, 'saveState');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('persistenceSagas', () => {
    const genObj = persistenceSagas();
    const expected = all([
      takeEvery(authRefreshAction.success, save),
      takeEvery(authRefreshAction.failure, save),
      takeEvery(authLoginAction.success, save),
      takeEvery(authLoginAction.failure, save),
      takeEvery(authSignupAction.success, save),
      takeEvery(authSignupAction.failure, save),
      takeEvery(authLogoutAction.success, save),
      takeEvery(authLogoutAction.failure, save),
    ]);

    expect(genObj.next().value).toEqual(expected);
  });

  test('save', () => {
    const genObj = save();

    expect(genObj.next().value).toEqual(select());

    expect(genObj.next(TEST_STATE).value).toEqual(call(saveState as any, TEST_STATE));
  });
});

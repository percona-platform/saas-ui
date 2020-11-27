import { runSaga, Saga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { PayloadAction } from 'typesafe-actions';
import { GrafanaTheme } from '@grafana/data';
import { themeSagas, themeChangeSuccess } from './theme.sagas';
import { themeChangeRequestAction } from './theme.reducer';

type Action = PayloadAction<string, any>;

let dispatchedActions: Action[];

const runSagaPromise = <T>(saga: Saga, payload?: T) => runSaga(
  {
    dispatch: (action: Action) => {
      dispatchedActions.push(action);
    },
  },
  saga,
  { payload }
).toPromise();

describe('Theme Sagas', () => {
  beforeEach(() => {
    dispatchedActions = [];
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('themeSagas calls the right function on themeChangeRequest', () => {
    const genObj = themeSagas();
    const expected = takeLatest(themeChangeRequestAction, themeChangeSuccess);

    expect(genObj.next().value).toEqual(expected);
  });

  test('themeSagas should be exhausted on next iteration', () => {
    const genObj = themeSagas();

    genObj.next();
    expect(genObj.next().done).toBe(true);
  });

  test('dispatching themeChangeRequestAction reverts the theme', async () => {
    const theme = { isDark: true };

    await runSagaPromise(themeChangeSuccess as Saga, theme);

    expect(!dispatchedActions[0].payload.isDark).toEqual(themeChangeRequestAction(theme as GrafanaTheme ).payload.isDark);
  });
});

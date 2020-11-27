import { ActionType } from 'typesafe-actions';
import {
  put, takeLatest, StrictEffect,
} from 'redux-saga/effects';
import { getTheme } from '@percona/platform-core';
import { THEME_STORAGE_KEY } from 'core/constants';
import { themeChangeRequestAction, themeChangeSuccessAction } from './theme.reducer';

type ThemeChangeRequestAction = ReturnType<typeof themeChangeRequestAction>;
type ThemeChangeActionGenerator = Generator<StrictEffect, void, ThemeChangeRequestAction>;

export function* themeChangeSuccess(
  action: ActionType<typeof themeChangeRequestAction>,
): ThemeChangeActionGenerator {
  const theme = getTheme(action.payload.isDark ? 'light' : 'dark');

  localStorage.setItem(THEME_STORAGE_KEY, theme.type);
  yield put(themeChangeSuccessAction(theme));
}

export function* themeSagas() {
  yield takeLatest(themeChangeRequestAction, themeChangeSuccess);
}

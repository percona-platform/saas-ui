import { createAction, ActionType, getType } from 'typesafe-actions';
import { GrafanaTheme } from '@grafana/data';
import { getTheme } from '@percona/platform-core';
import { THEME_STORAGE_KEY } from 'core/constants';
import { ThemeState } from './theme.types';

const themeValue: string = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
const theme = getTheme(themeValue);

const DEFAULT_STATE: ThemeState = theme;

export const themeChangeRequestAction = createAction('THEME_CHANGE_REQUEST')<GrafanaTheme>();
export const themeChangeSuccessAction = createAction('THEME_CHANGE_SUCCESS')<GrafanaTheme>();

export type ThemeActions = (
  ActionType<typeof themeChangeRequestAction> |
  ActionType<typeof themeChangeSuccessAction>
);

export function themeReducer(state: ThemeState = DEFAULT_STATE, action: ThemeActions): ThemeState {
  switch (action.type) {
    case getType(themeChangeSuccessAction): {
      if (state.isDark && action.payload.isDark) {
        return state;
      }

      if (state.isLight && action.payload.isLight) {
        return state;
      }

      return action.payload;
    }
    default:
      return state;
  }
}

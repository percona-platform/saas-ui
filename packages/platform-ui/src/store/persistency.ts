import { STATE_LOCALSTORAGE_KEY } from 'core/constants';
import { AppState } from './types';

export const loadState = (): AppState | undefined => {
  try {
    const serializedState = localStorage.getItem(STATE_LOCALSTORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_LOCALSTORAGE_KEY, serializedState);
  } catch (e) {
    console.error(e);
  }
};

import { createStore, combineReducers, Store } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { AppState } from './types';
import { loadState } from './persistency';

const persistedState = loadState();

const reducers = combineReducers({
  auth: authReducer,
});

export const store: Store<AppState> = createStore(reducers, persistedState);

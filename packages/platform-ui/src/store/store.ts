import { createStore, combineReducers, Store } from 'redux';
import { authReducer } from './auth.reducer';
import { AppState } from './store.types';

const reducers = combineReducers({
  auth: authReducer,
});

export const store: Store<AppState> = createStore(reducers);

import { createStore, combineReducers, Store } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { AppState } from './types';

const reducers = combineReducers({
  auth: authReducer,
});

export const store: Store<AppState> = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

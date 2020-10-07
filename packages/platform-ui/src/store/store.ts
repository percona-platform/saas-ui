import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AppState } from './types';
import { loadState } from './persistence';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { authSagas } from './auth/auth.sagas';
import { createRootReducer } from './reducers';

const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const enhancers = composeWithDevTools(
  applyMiddleware(...middlewares),
);
const rootReducer = createRootReducer();

export const store: Store<AppState> = createStore(
  rootReducer,
  persistedState,
  enhancers
);

sagaMiddleware.run(authSagas);

import { createStore, Store, applyMiddleware } from 'redux';
import { loadState } from 'store/persistence/engine';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { sagaMiddleware, rootSaga } from 'store/sagas';
import { AppState } from './types';
import { createRootReducer } from './reducers';

const persistedState = loadState();

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

sagaMiddleware.run(rootSaga);

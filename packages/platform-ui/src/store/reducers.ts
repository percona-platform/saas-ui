import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { authReducer } from './auth/auth.reducer';

export const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history), // this key must be 'router'
  auth: authReducer,
});

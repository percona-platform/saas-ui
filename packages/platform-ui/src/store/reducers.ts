import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { connectRouter } from 'connected-react-router';
import { history } from 'core/history';

export const createRootReducer = () => combineReducers({
  auth: authReducer,
  router: connectRouter(history),
});

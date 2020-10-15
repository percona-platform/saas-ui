import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from 'core/history';
import { authReducer } from './auth/auth.reducer';

export const createRootReducer = () => combineReducers({
  auth: authReducer,
  router: connectRouter(history),
});

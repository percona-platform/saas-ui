import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer';

export const createRootReducer = () => combineReducers({
  auth: authReducer,
});

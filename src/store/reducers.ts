import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from 'core/history';
import { authReducer } from 'store/auth/auth.reducer';
import { themeReducer } from 'store/theme/theme.reducer';

export const createRootReducer = () => combineReducers({
  auth: authReducer,
  router: connectRouter(history),
  theme: themeReducer,
});

/// <reference types="react-scripts" />
/// <reference types="@testing-library/jest-dom" />
/// <reference types="@testing-library/jest-dom/extend-expect" />

import { Store } from 'redux';
import { AppState } from 'store/types';

// Extend the window type with `Сypress` and `store`
declare global {
  interface Window {
    Cypress: any;
    store: Store<AppState>;
  }
}

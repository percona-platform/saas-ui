/// <reference types="react-scripts" />
/// <reference types="@testing-library/jest-dom" />
/// <reference types="@testing-library/jest-dom/extend-expect" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_PLATFORM_AUTH_API_BASE_URL: string;
  }
}

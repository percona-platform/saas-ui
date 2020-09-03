import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders home component', () => {
  const { container } = render(<App />);
  const linkElement = container.querySelector('legend');
  expect(linkElement).toHaveTextContent('Login');
});

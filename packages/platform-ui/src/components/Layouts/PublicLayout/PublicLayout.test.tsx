import React from 'react';
import { render } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import { PublicLayout } from './PublicLayout';

describe('PublicLayout::', () => {
  it('renders children when unauthenticated', () => {
    const { container } = render(
      <TestContainer>
        <PublicLayout>
          <legend>Login</legend>
        </PublicLayout>
      </TestContainer>,
    );
    const legend = container.querySelector('legend');
    expect(legend).toHaveTextContent('Login');
  });
});

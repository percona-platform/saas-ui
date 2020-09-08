import React from 'react';
import { render } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import { PrivateLayout } from './PrivateLayout';

describe('PrivateLayout::', () => {
  it('renders children when authenticated', () => {
    const { container } = render(
      <TestContainer>
        <PrivateLayout>
          <legend>Logout</legend>
        </PrivateLayout>
      </TestContainer>,
    );
    const legend = container.querySelector('legend');
    expect(legend).toHaveTextContent('Logout');
  });
});

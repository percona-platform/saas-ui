import React from 'react';
import { render } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import { Anonymous } from './Anonymous';

describe('Anonymous Layout::', () => {
  it('renders component on a default route /login', () => {
    const { container } = render(
      <TestContainer>
        <Anonymous />
      </TestContainer>,
    );
    const legend = container.querySelector('legend');
    expect(legend).toHaveTextContent('Login');
  });
});

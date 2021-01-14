import React from 'react';
import { render } from '@testing-library/react';
import { dataQa } from '@percona/platform-core';
import { Routes } from 'core/routes';
import { TestContainer } from 'components/TestContainer';
import { NotFound } from './NotFound';
import { Messages } from './NotFound.messages';

describe('NotFound', () => {
  test('has the 404 image', () => {
    const { container } = render(<TestContainer><NotFound /></TestContainer>);

    expect(container.querySelector(dataQa('404-image'))).not.toBeNull();
  });

  test('links to root', () => {
    const { container } = render(<TestContainer><NotFound /></TestContainer>);
    const button = container.querySelector(dataQa('404-home-button'));
    const anchor = button?.querySelector('a');

    expect(button).not.toBeNull();
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toEqual(Routes.root);
  });

  test('link contains only the configured text', () => {
    const { container } = render(<TestContainer><NotFound /></TestContainer>);
    const anchor = container.querySelector('a');

    expect(anchor?.textContent).toEqual(Messages.homepage);
  });
});

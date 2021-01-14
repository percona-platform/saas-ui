import React from 'react';
import { render } from '@testing-library/react';
import { GrafanaTheme } from '@grafana/data';
import { dataQa } from '@percona/platform-core';
import { Routes } from 'core/routes';
import * as themeSelectors from 'store/theme/theme.selectors';
import { TestContainer } from 'components/TestContainer';
import { NotFound } from './NotFound';

const getTheme = jest.spyOn(themeSelectors, 'getCurrentTheme');

describe('NotFound', () => {
  beforeEach(() => {
    const mockTheme: Partial<GrafanaTheme> = { isDark: true };

    getTheme.mockImplementation(() => mockTheme as GrafanaTheme);
  });

  afterEach(() => {
    getTheme.mockClear();
  });

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
});

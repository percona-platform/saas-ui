import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { GrafanaTheme } from '@grafana/data';
import { Routes } from 'core/routes';
import * as themeSelectors from 'store/theme/theme.selectors';
import { TestContainer } from 'components/TestContainer';
import { NotFound } from './NotFound';

let container: HTMLElement;
const getTheme = jest.spyOn(themeSelectors, 'getCurrentTheme');

describe('NotFound', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    const mockTheme: Partial<GrafanaTheme> = { isDark: true };

    getTheme.mockImplementation(() => mockTheme as GrafanaTheme);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    jest.clearAllMocks();
  });

  test('sets correct dark image', () => {
    act(() => {
      render(<TestContainer><NotFound /></TestContainer>, container);
    });

    expect(container.querySelector('[data-qa="404-image-dark"]')).not.toBeNull();
  });

  test('sets correct light image', () => {
    getTheme.mockImplementation(() => ({ isDark: false }) as GrafanaTheme);
    act(() => {
      render(<TestContainer><NotFound /></TestContainer>, container);
    });

    expect(container.querySelector('[data-qa="404-image-light"]')).not.toBeNull();
  });

  test('links to root', () => {
    act(() => {
      render(<TestContainer><NotFound /></TestContainer>, container);
    });

    const button = container.querySelector('[data-qa="404-home-button"]');
    const anchor = button?.querySelector('a');

    expect(button).not.toBeNull();
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toEqual(Routes.root);
  });
});
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import { dataQa } from '@percona/platform-core';
import { TestContainer } from 'components/TestContainer';
import * as authApi from 'core/api/auth';
import { UIDemo, tabs } from './UIDemo';

jest.spyOn(authApi, 'signIn');

let container: HTMLElement;

describe('UI Demo Page', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('renders the demo page', () => {
    act(() => {
      render(<TestContainer><UIDemo /></TestContainer>, container);
    });

    expect(container.querySelector(dataQa('demo-page-wrapper'))).not.toBeNull();
  });

  it('changes tab', () => {
    act(() => {
      render(<TestContainer><UIDemo /></TestContainer>, container);
    });

    expect(window.location.pathname).toBe(tabs.inputs.path);

    const overlaysTab = container.querySelector(dataQa('demo-page-overlays-tab'));

    fireEvent.click(overlaysTab!);

    expect(window.location.pathname).toBe(tabs.overlays.path);
  });
});

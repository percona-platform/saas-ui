import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import { dataQa } from 'shared';
import { Dropdown } from './Dropdown';

let container: HTMLElement;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Toggle = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button type="button" ref={ref} {...props}>Toggle</button>
));

const DATA_QA_MENU='dropdown-menu-menu';
const DATA_QA_TOGGLE='dropdown-menu-toggle';

describe('Dropdown ::', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  test('should render the toggle', () => {
    act(() => {
      render(<Dropdown toggle={Toggle}><a href="/">root</a><a href="/test">test</a></Dropdown>, container);
    });

    expect(container.querySelector(dataQa(DATA_QA_TOGGLE))).not.toBe(null);
  });

  test('clicking on the toggle toggles the menu visibility', async () => {
    act(() => {
      render(<Dropdown toggle={Toggle}><a href="/">root</a><a href="/test">test</a></Dropdown>, container);
    });

    const toggle = container.querySelector(dataQa(DATA_QA_TOGGLE));

    expect(container.querySelector(dataQa(DATA_QA_MENU))).toBe(null);

    await act(async () => {
      fireEvent.click(toggle!);
    });

    expect(container.querySelector(dataQa(DATA_QA_MENU))).not.toBe(null);

    await act(async () => {
      fireEvent.click(toggle!);
    });

    expect(container.querySelector(dataQa(DATA_QA_MENU))).toBe(null);
  });

  test('clicking outside the dropdown closes the menu', async () => {
    act(() => {
      render(<Dropdown toggle={Toggle}><a href="/">root</a><a href="/test">test</a></Dropdown>, container);
    });

    const toggle = container.querySelector(dataQa(DATA_QA_TOGGLE));

    await act(async () => {
      fireEvent.click(toggle!);
    });

    expect(container.querySelector(dataQa(DATA_QA_MENU))).not.toBe(null);

    await act(async () => {
      fireEvent.mouseDown(container);
    });

    expect(container.querySelector(dataQa(DATA_QA_MENU))).toBe(null);
  });

  test('mousedown on the dropdown does not close the menu', async () => {
    const menuAction = jest.fn();

    act(() => {
      render(<Dropdown toggle={Toggle}>
        <div data-qa="menu-item" onClick={menuAction}>root</div>
        <a href="/test">test</a>
      </Dropdown>, container);
    });

    const toggle = container.querySelector(dataQa(DATA_QA_TOGGLE));

    await act(async () => {
      fireEvent.click(toggle!);
    });

    // NOTE: this needs to be in a separate 'act'
    await act(async () => {
      fireEvent.mouseDown(toggle!);
      fireEvent.mouseDown(container.querySelector(dataQa(DATA_QA_MENU))!);
    });

    expect(container.querySelector(dataQa(DATA_QA_MENU))).not.toBe(null);
  });

  test('clicking on a menu item propagates the event and closes the menu', async () => {
    const menuAction = jest.fn();

    act(() => {
      render(<Dropdown toggle={Toggle}>
        <div data-qa="menu-item" onClick={menuAction}>root</div>
        <a href="/test">test</a>
      </Dropdown>, container);
    });

    const toggle = container.querySelector(dataQa(DATA_QA_TOGGLE));

    expect(menuAction).toBeCalledTimes(0);

    await act(async () => {
      fireEvent.click(toggle!);
    });

    // NOTE: this needs to be in a separate 'act'
    await act(async () => {
      const menuItem = container.querySelector(dataQa('menu-item'));

      fireEvent.click(menuItem!);
    });

    expect(menuAction).toBeCalledTimes(1);
  });
});

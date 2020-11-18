import React from 'react';
import { mount } from 'enzyme';
import * as logger from 'shared/logger/logger';
import { TableToolbar } from './TableToolbar';
import { TableToolbarButton } from './TableToolbarButton';
import { Messages } from './TableToolbar.messages';

describe('TableToolbar::', () => {
  it('should render an input element of type number and two buttons', () => {
    let wrapper = mount(
      <TableToolbar actions={[
        { callback: jest.fn(), label: 'test1', icon: 'toolbarAdd' },
        { callback: jest.fn(), label: 'test2', icon: 'toolbarAdd', minItems: 1 },
        { callback: jest.fn(), label: 'test3', icon: 'toolbarAdd', maxItems: 2 },
        { callback: jest.fn(), label: 'test4', icon: 'toolbarAdd', minItems: 1, maxItems: 1 },
      ]} selectedItems={[]} />,
    );

    expect(wrapper.find(TableToolbarButton)).toHaveLength(4);
    expect(wrapper.find(TableToolbarButton).at(0)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(1)).toHaveProp('disabled', true);
    expect(wrapper.find(TableToolbarButton).at(2)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(3)).toHaveProp('disabled', true);

    wrapper = mount(
      <TableToolbar actions={[
        { callback: jest.fn(), label: 'test1', icon: 'toolbarAdd' },
        { callback: jest.fn(), label: 'test2', icon: 'toolbarAdd', minItems: 1 },
        { callback: jest.fn(), label: 'test3', icon: 'toolbarAdd', maxItems: 2 },
        { callback: jest.fn(), label: 'test4', icon: 'toolbarAdd', minItems: 1, maxItems: 1 },
      ]} selectedItems={['a']} />,
    );

    expect(wrapper.find(TableToolbarButton)).toHaveLength(4);
    expect(wrapper.find(TableToolbarButton).at(0)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(1)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(2)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(3)).toHaveProp('disabled', false);

    wrapper = mount(
      <TableToolbar actions={[
        { callback: jest.fn(), label: 'test1', icon: 'toolbarAdd' },
        { callback: jest.fn(), label: 'test2', icon: 'toolbarAdd', minItems: 1 },
        { callback: jest.fn(), label: 'test3', icon: 'toolbarAdd', maxItems: 2 },
        { callback: jest.fn(), label: 'test4', icon: 'toolbarAdd', minItems: 1, maxItems: 1 },
      ]} selectedItems={['a', 'b']} />,
    );

    expect(wrapper.find(TableToolbarButton)).toHaveLength(4);
    expect(wrapper.find(TableToolbarButton).at(0)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(1)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(2)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(3)).toHaveProp('disabled', true);

    wrapper = mount(
      <TableToolbar actions={[
        { callback: jest.fn(), label: 'test1', icon: 'toolbarAdd' },
        { callback: jest.fn(), label: 'test2', icon: 'toolbarAdd', minItems: 1 },
        { callback: jest.fn(), label: 'test3', icon: 'toolbarAdd', maxItems: 2 },
        { callback: jest.fn(), label: 'test4', icon: 'toolbarAdd', minItems: 1, maxItems: 1 },
      ]} selectedItems={[9, 9, 9]} />,
    );

    expect(wrapper.find(TableToolbarButton)).toHaveLength(4);
    expect(wrapper.find(TableToolbarButton).at(0)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(1)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(2)).toHaveProp('disabled', true);
    expect(wrapper.find(TableToolbarButton).at(3)).toHaveProp('disabled', true);

    wrapper.unmount();
  });

  it('should show errors when actions have bad options', () => {
    const loggerError = jest.spyOn(logger, 'error').mockImplementation(() => {});

    const wrapper = mount(
      <TableToolbar actions={[
        { callback: jest.fn(), label: 'test1', icon: 'toolbarAdd', minItems: 2, maxItems: 1 },
        { callback: jest.fn(), label: 'test2', icon: 'toolbarAdd', minItems: -1, maxItems: 1 },
        { callback: jest.fn(), label: 'test3', icon: 'toolbarAdd', minItems: -1, maxItems: -10 },
        { callback: jest.fn(), label: 'test4', icon: 'toolbarAdd', minItems: 1, maxItems: -10 },
      ]} selectedItems={[]} />,
    );

    expect(loggerError).toBeCalledTimes(4);
    expect(loggerError.mock.calls).toEqual([
      [Messages.minLessThanMaxError],
      [Messages.negativeNumberError],
      [Messages.negativeNumberError],
      [Messages.negativeNumberError],
    ]);

    loggerError.mockRestore();
    wrapper.unmount();
  });
});

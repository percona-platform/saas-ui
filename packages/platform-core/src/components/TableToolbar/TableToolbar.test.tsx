import React from 'react';
import { mount } from 'enzyme';
import { TableToolbar } from './TableToolbar';
import { TableToolbarButton } from './TableToolbarButton';

describe('TableToolbar::', () => {
  it('should render an input element of type number and two buttons', () => {
    let wrapper = mount(
      <TableToolbar actions={[
        { callback: jest.fn(), label: 'test1', icon: 'plusSquare' },
        { callback: jest.fn(), label: 'test2', icon: 'plusSquare', isBulkAction: true },
      ]} selectedItems={[]} />,
    );

    expect(wrapper.find(TableToolbarButton)).toHaveLength(2);
    expect(wrapper.find(TableToolbarButton).at(0)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(1)).toHaveProp('disabled', true);

    wrapper = mount(
      <TableToolbar actions={[
        { callback: jest.fn(), label: 'test1', icon: 'plusSquare' },
        { callback: jest.fn(), label: 'test2', icon: 'plusSquare', isBulkAction: true },
      ]} selectedItems={['a']} />,
    );

    expect(wrapper.find(TableToolbarButton)).toHaveLength(2);
    expect(wrapper.find(TableToolbarButton).at(0)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(1)).toHaveProp('disabled', true);

    wrapper = mount(
      <TableToolbar actions={[
        { callback: jest.fn(), label: 'test1', icon: 'plusSquare' },
        { callback: jest.fn(), label: 'test2', icon: 'plusSquare', isBulkAction: true },
      ]} selectedItems={['a', 'b']} />,
    );

    expect(wrapper.find(TableToolbarButton)).toHaveLength(2);
    expect(wrapper.find(TableToolbarButton).at(0)).toHaveProp('disabled', false);
    expect(wrapper.find(TableToolbarButton).at(1)).toHaveProp('disabled', false);

    wrapper.unmount();
  });
});

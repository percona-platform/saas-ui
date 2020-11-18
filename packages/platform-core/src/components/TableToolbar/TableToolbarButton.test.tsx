import React from 'react';
import { mount } from 'enzyme';
import { Icon } from 'components/Icon';
import { TableToolbarButton } from './TableToolbarButton';

describe('TableToolbarButton::', () => {
  it('should render a button with an icon and text', () => {
    const wrapper = mount(<TableToolbarButton icon="toolbarAdd" label="test" />);

    expect(wrapper.find('button').text()).toEqual('test');
    expect(wrapper.find(Icon)).toHaveProp('name', 'toolbarAdd');

    wrapper.unmount();
  });
});

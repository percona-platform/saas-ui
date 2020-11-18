import React from 'react';
import { mount } from 'enzyme';
import { Icon } from './Icon';
import AddIcon from '../../shared/icons/TableToolbarAdd';

describe('Icon::', () => {
  it('should display the correct icon', () => {
    const wrapper = mount(<Icon name="toolbarAdd" />);

    expect(wrapper.find(AddIcon).length).toEqual(1);

    wrapper.unmount();
  });
});

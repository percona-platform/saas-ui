import React from 'react';
import { mount } from 'enzyme';
import { Icon } from './Icon';
import { PlusSquare } from '../../shared/icons';

describe('Icon::', () => {
  it('should display the correct icon', () => {
    const wrapper = mount(<Icon name="plusSquare" />);

    expect(wrapper.find(PlusSquare).length).toEqual(1);

    wrapper.unmount();
  });
});

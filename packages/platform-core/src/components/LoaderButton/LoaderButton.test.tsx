import React from 'react';
import { shallow } from 'enzyme';
import { Button, Spinner } from '@grafana/ui';
import { LoaderButton } from './LoaderButton';

const buttonLabel = 'Test button';

describe('LoaderButton::', () => {
  it('should display a spinner when in loading state', () => {
    const wrapper = shallow(<LoaderButton loading>Test text</LoaderButton>);

    expect(wrapper.find(Button).find(Spinner).length).toEqual(1);
    expect(wrapper.find(Button).text()).not.toContain(buttonLabel);

    wrapper.unmount();
  });

  it('should display the children if not in loading state', () => {
    const wrapper = shallow(<LoaderButton>{buttonLabel}</LoaderButton>);

    expect(wrapper.find(Button).find(Spinner).length).toEqual(0);
    expect(wrapper.find(Button).text()).toEqual(buttonLabel);

    wrapper.unmount();
  });
});

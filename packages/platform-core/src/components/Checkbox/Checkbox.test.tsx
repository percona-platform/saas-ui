import React, { FC } from 'react';
import { mount } from 'enzyme';
import { Form, Field } from 'react-final-form';
import { CheckboxField } from './CheckboxField';

jest.spyOn(console, 'error').mockImplementation(() => {});

const Wrapper: FC = ({ children }) => (
  <Form onSubmit={() => {}}>
    {() => (
      <form>{children}</form>
    )}
  </Form>
);

describe('CheckboxField::', () => {
  it('should render an input element of type checkbox', () => {
    const wrapper = mount(<Wrapper><CheckboxField name="test" /></Wrapper>);

    const field = wrapper.find(Field);

    expect(field).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveProp('type', 'checkbox');

    wrapper.unmount();
  });

  it('should call passed validators', () => {
    const validatorOne = jest.fn();
    const validatorTwo = jest.fn();
    const wrapper = mount(<Wrapper><CheckboxField name="test" validators={[validatorOne, validatorTwo]} /></Wrapper>);

    expect(validatorOne).toBeCalledTimes(1);
    expect(validatorTwo).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('should show an error on invalid status', () => {
    const validatorOne = jest.fn().mockReturnValue('some error');
    const validatorTwo = jest.fn();
    const wrapper = mount(<Wrapper><CheckboxField name="test" validators={[validatorOne, validatorTwo]} /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('');

    expect(validatorOne).toBeCalledTimes(1);

    wrapper.find('input').at(0).simulate('change', { target: { value: true } });
    wrapper.find('input').at(0).simulate('blur');

    expect(validatorOne).toBeCalledTimes(2);
    expect(validatorTwo).toBeCalledTimes(0);

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('some error');

    wrapper.unmount();
  });

  it('should show no labels if one is not specified', () => {
    const wrapper = mount(<Wrapper><CheckboxField name="test" /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-label"]').length).toBe(0);

    wrapper.unmount();
  });

  it('should show a label if one is specified', () => {
    const wrapper = mount(<Wrapper><CheckboxField label="test label" name="test" /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-label"]').length).toBe(1);
    expect(wrapper.find('[data-qa="test-field-label"]').text()).toBe('test label');

    wrapper.unmount();
  });

  it('should hide arrow buttons when disabled', () => {
    const wrapper = mount(<Wrapper><CheckboxField name="test" disabled /></Wrapper>);

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(0);

    wrapper.unmount();
  });
});

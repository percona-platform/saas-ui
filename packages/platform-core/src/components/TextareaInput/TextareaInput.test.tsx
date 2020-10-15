import React, { FC } from 'react';
import { mount } from 'enzyme';
import { TextareaInputField } from './TextareaInputField';
import { Form, Field } from 'react-final-form';

jest.spyOn(console, 'error').mockImplementation(() => {});

const Wrapper: FC = ({ children }) => (
  <Form onSubmit={() => {}}>
    {() => (
      <form>{children}</form>
    )}
  </Form>
);

describe('TextareaInputField::', () => {
  it('should render a textarea element', () => {
    const wrapper = mount(<Wrapper><TextareaInputField name="test" /></Wrapper>);

    const field = wrapper.find(Field);

    expect(field).toHaveLength(1);
    expect(wrapper.find('textarea')).toHaveLength(1);

    wrapper.unmount();
  });

  it('should call passed validators', () => {
    const validatorOne = jest.fn();
    const validatorTwo = jest.fn();
    const wrapper = mount(<Wrapper><TextareaInputField name="test" validators={[validatorOne, validatorTwo]} /></Wrapper>);

    expect(validatorOne).toBeCalledTimes(1);
    expect(validatorTwo).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('should show an error on invalid input', () => {
    const validatorOne = jest.fn().mockReturnValue('some error');
    const validatorTwo = jest.fn();
    const wrapper = mount(<Wrapper><TextareaInputField name="test" validators={[validatorOne, validatorTwo]} /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('');

    expect(validatorOne).toBeCalledTimes(1);

    wrapper.find('textarea').at(0).simulate('change', { target: { value: 'Test' } });

    expect(validatorOne).toBeCalledTimes(2);
    expect(validatorTwo).toBeCalledTimes(0);

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('some error');

    wrapper.unmount();
  });

  it('should show validation errors on blur if specified', () => {
    const validatorOne = jest.fn();
    const validatorTwo = jest.fn().mockReturnValue('some error');
    const wrapper = mount(<Wrapper><TextareaInputField showErrorOnBlur name="test" validators={[validatorOne, validatorTwo]} /></Wrapper>);

    wrapper.find('textarea').at(0).simulate('change', { target: { value: 'Test' } });

    expect(validatorOne).toBeCalledTimes(2);
    expect(validatorTwo).toBeCalledTimes(2);

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('');

    wrapper.find('textarea').at(0).simulate('blur');

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('some error');

    wrapper.unmount();
  });

  it('should show no labels if one is not specified', () => {
    const wrapper = mount(<Wrapper><TextareaInputField name="test" /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-label"]').length).toBe(0);

    wrapper.unmount();
  });

  it('should show a label if one is specified', () => {
    const wrapper = mount(<Wrapper><TextareaInputField label="test label" name="test" /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-label"]').length).toBe(1);
    expect(wrapper.find('[data-qa="test-field-label"]').text()).toBe('test label');

    wrapper.unmount();
  });

  it('should show an asterisk on the label if the field is required', () => {
    const wrapper = mount(<Wrapper><TextareaInputField label="test label" name="test" required /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-label"]').length).toBe(1);
    expect(wrapper.find('[data-qa="test-field-label"]').text()).toBe('test label *');

    wrapper.unmount();
  });

  it('should hide arrow buttons when disabled', () => {
    const wrapper = mount(<Wrapper><TextareaInputField name="test" disabled /></Wrapper>);

    expect(wrapper.find('textarea')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(0);

    wrapper.unmount();
  });

  it('should apply the passed class name to the inner textarea element', () => {
    const wrapper = mount(<Wrapper><TextareaInputField name="test" className="testClass" /></Wrapper>);

    expect(wrapper.find('textarea').hasClass('testClass')).toBe(true);

    wrapper.unmount();
  });
});

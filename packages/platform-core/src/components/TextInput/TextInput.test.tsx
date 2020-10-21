import React from 'react';
import { mount } from 'enzyme';
import { Field } from 'react-final-form';
import { dataQa, FormWrapper } from 'shared';
import { TextInputField } from './TextInputField';

describe('TextInputField::', () => {
  it('should render an input element of type text', () => {
    const wrapper = mount(<FormWrapper><TextInputField name="test" /></FormWrapper>);

    const field = wrapper.find(Field);

    expect(field).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveProp('type', 'text');

    wrapper.unmount();
  });

  it('should call passed validators', () => {
    const validatorOne = jest.fn();
    const validatorTwo = jest.fn();
    const wrapper = mount(
      <FormWrapper><TextInputField name="test" validators={[validatorOne, validatorTwo]} /></FormWrapper>,
    );

    expect(validatorOne).toBeCalledTimes(1);
    expect(validatorTwo).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('should show an error on invalid input', () => {
    const validatorOne = jest.fn().mockReturnValue('some error');
    const validatorTwo = jest.fn();
    const wrapper = mount(
      <FormWrapper><TextInputField name="test" validators={[validatorOne, validatorTwo]} /></FormWrapper>,
    );

    expect(wrapper.find(dataQa('test-field-error-message')).text()).toBe('');

    expect(validatorOne).toBeCalledTimes(1);

    wrapper.find('input').at(0).simulate('change', { target: { value: 'Test' } });

    expect(validatorOne).toBeCalledTimes(2);
    expect(validatorTwo).toBeCalledTimes(0);

    expect(wrapper.find(dataQa('test-field-error-message')).text()).toBe('some error');

    wrapper.unmount();
  });

  it('should show validation errors on blur if specified', () => {
    const validatorOne = jest.fn();
    const validatorTwo = jest.fn().mockReturnValue('some error');
    const wrapper = mount(
      <FormWrapper>
        <TextInputField showErrorOnBlur name="test" validators={[validatorOne, validatorTwo]} />
      </FormWrapper>,
    );

    wrapper.find('input').at(0).simulate('change', { target: { value: 'Test' } });

    expect(validatorOne).toBeCalledTimes(2);
    expect(validatorTwo).toBeCalledTimes(2);

    expect(wrapper.find(dataQa('test-field-error-message')).text()).toBe('');

    wrapper.find('input').at(0).simulate('blur');

    expect(wrapper.find(dataQa('test-field-error-message')).text()).toBe('some error');

    wrapper.unmount();
  });

  it('should show no labels if one is not specified', () => {
    const wrapper = mount(<FormWrapper><TextInputField name="test" /></FormWrapper>);

    expect(wrapper.find(dataQa('test-field-label')).length).toBe(0);

    wrapper.unmount();
  });

  it('should show a label if one is specified', () => {
    const wrapper = mount(<FormWrapper><TextInputField label="test label" name="test" /></FormWrapper>);

    expect(wrapper.find(dataQa('test-field-label')).length).toBe(1);
    expect(wrapper.find(dataQa('test-field-label')).text()).toBe('test label');

    wrapper.unmount();
  });

  it('should show an asterisk on the label if the field is required', () => {
    const wrapper = mount(
      <FormWrapper><TextInputField label="test label" name="test" required /></FormWrapper>,
    );

    expect(wrapper.find(dataQa('test-field-label')).length).toBe(1);
    expect(wrapper.find(dataQa('test-field-label')).text()).toBe('test label *');

    wrapper.unmount();
  });

    it('should not pass the required prop to the input if the field is required', () => {
    const wrapper = mount(
      <FormWrapper><TextInputField name="test" required /></FormWrapper>,
    );

    expect(wrapper.find('input').prop('required')).toBeUndefined();

    wrapper.unmount();
  });

  it('should apply the passed class name to the inner input element', () => {
    const wrapper = mount(
      <FormWrapper><TextInputField name="test" className="testClass" /></FormWrapper>,
    );

    expect(wrapper.find('input').hasClass('testClass')).toBe(true);

    wrapper.unmount();
  });

  it('should accept any valid input html attributes and pass them over to the input tag', () => {
    const title = 'Pomodori di riso al forno';
    const wrapper = mount(
      <FormWrapper>
        <TextInputField
          name="test"
          inputProps={{
            autoComplete: 'off',
            autoCorrect: 'off',
            title,
          }}
        />
      </FormWrapper>,
    );

    const input = wrapper.find(dataQa('test-text-input'));

    expect(input.prop('autoComplete')).toEqual('off');
    expect(input.prop('autoCorrect')).toEqual('off');
    expect(input.prop('title')).toEqual(title);

    wrapper.unmount();
  });
});

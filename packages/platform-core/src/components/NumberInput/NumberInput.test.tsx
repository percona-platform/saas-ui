import React from 'react';
import { mount } from 'enzyme';
import { Field } from 'react-final-form';
import { dataQa, FormWrapper } from 'shared';
import { NumberInputField } from './NumberInputField';

describe('NumberInputField::', () => {
  it('should render an input element of type number and two buttons', () => {
    const wrapper = mount(<FormWrapper><NumberInputField name="test" /></FormWrapper>);

    const field = wrapper.find(Field);

    expect(field).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveProp('type', 'number');
    expect(wrapper.find('button')).toHaveLength(2);

    wrapper.unmount();
  });

  it('should call passed validators', () => {
    const validatorOne = jest.fn();
    const validatorTwo = jest.fn();
    const wrapper = mount(
      <FormWrapper><NumberInputField name="test" validators={[validatorOne, validatorTwo]} /></FormWrapper>,
    );

    expect(validatorOne).toBeCalledTimes(1);
    expect(validatorTwo).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('should show an error on invalid input', () => {
    const validatorOne = jest.fn().mockReturnValue('some error');
    const validatorTwo = jest.fn();
    const wrapper = mount(
      <FormWrapper><NumberInputField name="test" validators={[validatorOne, validatorTwo]} /></FormWrapper>,
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
      <FormWrapper><NumberInputField showErrorOnBlur name="test" validators={[validatorOne, validatorTwo]} /></FormWrapper>,
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
    const wrapper = mount(<FormWrapper><NumberInputField name="test" /></FormWrapper>);

    expect(wrapper.find(dataQa('test-field-label')).length).toBe(0);

    wrapper.unmount();
  });

  it('should show a label if one is specified', () => {
    const wrapper = mount(
      <FormWrapper><NumberInputField label="test label" name="test" /></FormWrapper>,
    );

    expect(wrapper.find(dataQa('test-field-label')).length).toBe(1);
    expect(wrapper.find(dataQa('test-field-label')).text()).toBe('test label');

    wrapper.unmount();
  });

  it('should show an asterisk on the label if the field is required', () => {
    const wrapper = mount(
      <FormWrapper><NumberInputField label="test label" name="test" required /></FormWrapper>,
    );

    expect(wrapper.find(dataQa('test-field-label')).length).toBe(1);
    expect(wrapper.find(dataQa('test-field-label')).text()).toBe('test label *');

    wrapper.unmount();
  });

  it('should hide arrow buttons when disabled', () => {
    const wrapper = mount(<FormWrapper><NumberInputField name="test" disabled /></FormWrapper>);

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(0);

    wrapper.unmount();
  });

  it('should apply the passed class name to the inner input element', () => {
    const wrapper = mount(
      <FormWrapper><NumberInputField name="test" className="testClass" /></FormWrapper>,
    );

    expect(wrapper.find('input').hasClass('testClass')).toBe(true);

    wrapper.unmount();
  });

  it('should change the value when clicking on the arrow buttons', () => {
    const wrapper = mount(
      <FormWrapper><NumberInputField name="test" /></FormWrapper>,
    );

    const mockedStepUp = jest.fn();
    const mockedStepDown = jest.fn();

    (wrapper.find('input').instance() as any).stepUp = mockedStepUp;
    (wrapper.find('input').instance() as any).stepDown = mockedStepDown;

    expect(mockedStepUp).toBeCalledTimes(0);
    expect(mockedStepDown).toBeCalledTimes(0);

    wrapper.find('button').at(0).simulate('click');

    expect(mockedStepUp).toBeCalledTimes(1);
    expect(mockedStepDown).toBeCalledTimes(0);

    wrapper.find('button').at(1).simulate('click');

    expect(mockedStepUp).toBeCalledTimes(1);
    expect(mockedStepDown).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('should trigger a change event when clicking on arrow buttons', () => {
    const mockedStepUp = jest.fn();
    const mockedStepDown = jest.fn();
    const mockedDispatchEvent = jest.fn();

    const wrapper = mount(
      <FormWrapper><NumberInputField name="test" /></FormWrapper>,
    );

    (wrapper.find('input').instance() as any).stepUp = mockedStepUp;
    (wrapper.find('input').instance() as any).stepDown = mockedStepDown;
    (wrapper.find('input').instance() as any).dispatchEvent = mockedDispatchEvent;

    expect(mockedDispatchEvent).toBeCalledTimes(0);

    wrapper.find('button').at(0).simulate('click');

    expect(mockedDispatchEvent).toBeCalledTimes(1);
    expect(mockedDispatchEvent.mock.calls[0][0].type).toEqual('change');
    expect(mockedDispatchEvent.mock.calls[0][0].bubbles).toBe(true);

    wrapper.find('button').at(1).simulate('click');

    expect(mockedDispatchEvent).toBeCalledTimes(2);
    expect(mockedDispatchEvent.mock.calls[1][0].type).toEqual('change');
    expect(mockedDispatchEvent.mock.calls[1][0].bubbles).toBe(true);

    wrapper.unmount();
  });

  it('should accept any valid input html attributes and pass them over to the input tag', () => {
    const title = 'Titolo di viaggio';
    const onChange = jest.fn();
    const wrapper = mount(
      <FormWrapper>
        <NumberInputField
          name="test"
          inputProps={{
            autoComplete: 'off',
            onChange,
            title,
          }}
        />
      </FormWrapper>,
    );

    const input = wrapper.find(dataQa('test-number-input'));

    expect(input.prop('autoComplete')).toEqual('off');
    expect(input.prop('onChange')).toEqual(onChange);
    expect(input.prop('title')).toEqual(title);

    wrapper.unmount();
  });
});

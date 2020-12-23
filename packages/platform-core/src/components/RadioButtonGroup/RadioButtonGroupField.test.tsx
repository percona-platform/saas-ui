import React from 'react';
import { mount } from 'enzyme';
import { Field } from 'react-final-form';
import { dataQa, FormWrapper } from 'shared';
import { RadioButtonGroupField } from './RadioButtonGroupField';

const options = [
  { label: 'Lowest', value: 'lowest', icon: 'bolt' },
  { label: 'Medium', value: 'medium', icon: 'arrow-right' },
  { label: 'High', value: 'high', icon: 'arrow-up' },
  { label: 'Highest', value: 'highest', icon: 'clock' },
];

const initialValues = { test: 'lowest' };

describe('RadioButtonGroupField::', () => {
  it('should render as many inputs as there are options + 1', () => {
    const wrapper = mount(
      <FormWrapper>
        <RadioButtonGroupField name="test" options={options} />
      </FormWrapper>,
    );

    const field = wrapper.find(Field);

    expect(field).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(5);
    expect(wrapper.find(dataQa('test-radio-state'))).toHaveProp('type', 'text');
    expect(wrapper.find('label')).toHaveLength(4);

    wrapper.unmount();
  });

  it('should call the validators passed in props', () => {
    const validatorOne = jest.fn();
    const validatorTwo = jest.fn();
    const wrapper = mount(
      <FormWrapper>
        <RadioButtonGroupField name="test" options={options} validators={[validatorOne, validatorTwo]} />
      </FormWrapper>,
    );

    expect(validatorOne).toBeCalledTimes(1);
    expect(validatorTwo).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('should show an error on invalid input', () => {
    const validatorOne = jest.fn().mockReturnValue('some error');
    const validatorTwo = jest.fn();
    const wrapper = mount(
      <FormWrapper>
        <RadioButtonGroupField name="test" options={options} validators={[validatorOne, validatorTwo]} />
      </FormWrapper>,
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
        <RadioButtonGroupField showErrorOnBlur name="test" options={options} validators={[validatorOne, validatorTwo]} />
      </FormWrapper>,
    );

    wrapper.find(dataQa('test-radio-state')).simulate('change', { target: { value: 'Test' } });

    expect(validatorOne).toBeCalledTimes(2);
    expect(validatorTwo).toBeCalledTimes(2);

    expect(wrapper.find(dataQa('test-field-error-message')).text()).toBe('');

    wrapper.find(dataQa('test-radio-state')).simulate('blur');

    expect(wrapper.find(dataQa('test-field-error-message')).text()).toBe('some error');

    wrapper.unmount();
  });

  it('should show no labels if none is passed via props', () => {
    const wrapper = mount(
      <FormWrapper>
        <RadioButtonGroupField name="test" options={options} />
      </FormWrapper>,
    );

    expect(wrapper.find(dataQa('test-field-label')).length).toBe(0);

    wrapper.unmount();
  });

  it('should show a label if one is passed via props', () => {
    const wrapper = mount(
      <FormWrapper>
        <RadioButtonGroupField label="test label" name="test" options={options} />
      </FormWrapper>,
    );

    expect(wrapper.find(dataQa('test-field-label')).length).toBe(1);
    expect(wrapper.find(dataQa('test-field-label')).text()).toBe('test label');

    wrapper.unmount();
  });

  it('should show an asterisk on the label if the field is required', () => {
    const wrapper = mount(
      <FormWrapper>
        <RadioButtonGroupField label="test label" name="test" options={options} required />
      </FormWrapper>,
    );

    expect(wrapper.find(dataQa('test-field-label')).length).toBe(1);
    expect(wrapper.find(dataQa('test-field-label')).text()).toBe('test label *');

    wrapper.unmount();
  });

  it('should change the state value when clicked on a different radio button', () => {
    const wrapper = mount(
      <FormWrapper initialValues={initialValues}>
        <RadioButtonGroupField name="test" options={options} />
      </FormWrapper>,
    );

    expect(wrapper.find(dataQa('test-radio-state'))).toHaveProp('value', 'lowest');
    expect(wrapper.find(dataQa('test-radio-button')).at(0)).toHaveProp('checked', true);
    wrapper.find(dataQa('test-radio-button')).at(1).simulate('change', { target: { checked: true } });
    wrapper.update();

    // The value shouldn't have changed since the component disallows clicks when disabled
    expect(wrapper.find(dataQa('test-radio-state'))).toHaveProp('value', 'medium');
    expect(wrapper.find(dataQa('test-radio-button')).at(1)).toHaveProp('checked', true);

    wrapper.unmount();
  });

  it('should disable all radio buttons when `disabled` is passed via props', () => {
    const wrapper = mount(
      <FormWrapper initialValues={initialValues}>
        <RadioButtonGroupField name="test" options={options} disabled />
      </FormWrapper>,
    );

    expect(wrapper.find(dataQa('test-radio-state'))).toHaveProp('value', 'lowest');
    expect(wrapper.find(dataQa('test-radio-button')).at(0)).toHaveProp('checked', true);
    wrapper.find(dataQa('test-radio-button')).at(2).simulate('click');
    wrapper.update();
    // The value shouldn't have changed since the component disallows clicks when disabled
    expect(wrapper.find(dataQa('test-radio-state'))).toHaveProp('value', 'lowest');
    expect(wrapper.find(dataQa('test-radio-button')).at(0)).toHaveProp('checked', true);

    wrapper.unmount();
  });

  it('should apply the passed class name to the wrapper', () => {
    const wrapper = mount(
      <FormWrapper>
        <RadioButtonGroupField name="test" options={options} className="testClass" />
      </FormWrapper>,
    );

    expect(wrapper.find('div').at(0).hasClass('testClass')).toBe(true);

    wrapper.unmount();
  });

  xit('should trigger a change event when clicking on arrow buttons', () => {
    const wrapper = mount(
      <FormWrapper initialValues={initialValues}>
        <RadioButtonGroupField name="test" options={options} />
      </FormWrapper>,
    );

    // TODO: figure out how to test arrow clicks
    wrapper.unmount();
  });

  it('should accept any valid input html attributes and pass them over to all inputs except state', () => {
    const title = 'Arbitrary test title';
    const onBlur = jest.fn();
    const wrapper = mount(
      <FormWrapper>
        <RadioButtonGroupField
          name="test"
          inputProps={{
            onBlur,
            title,
          }}
          options={options}
        />
      </FormWrapper>,
    );

    const buttons = wrapper.find(dataQa('test-radio-button'));

    expect(buttons.at(0).prop('onBlur')).toEqual(onBlur);
    expect(buttons.at(0).prop('title')).toEqual(title);

    wrapper.unmount();
  });
});

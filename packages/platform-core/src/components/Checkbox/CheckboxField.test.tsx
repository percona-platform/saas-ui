import React from 'react';
import { mount } from 'enzyme';
import { Form, FormRenderProps } from 'react-final-form';
import { requiredTrue } from 'shared/validators';
import { CheckboxField } from './CheckboxField';

const checkboxLabel = 'Checkbox label';

describe('CheckboxField::', () => {
  it('should accept a default value', () => {
    const wrapper = mount(
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit }: FormRenderProps) => (
          <form onSubmit={handleSubmit}>
            <CheckboxField
              name="test"
              label={checkboxLabel}
              validators={[requiredTrue]}
              defaultValue
            />
          </form>
        )}
      </Form>,
    );

    expect(wrapper.find('[data-qa="test-checkbox-input"]').at(0).prop('checked')).toEqual(true);
    expect(wrapper.find('[data-qa="test-field-label"]').at(0).text()).toEqual(checkboxLabel);
    expect(wrapper.find('[data-qa="test-field-error-message"]').at(0).text()).toHaveLength(0);

    wrapper.unmount();
  });

  it('should display an error message when validation fails', () => {
    const eventChangeTrue = { target: { value: true } };
    const eventChangeFalse = { target: { value: false } };
    const wrapper = mount(
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit }: FormRenderProps) => (
          <form onSubmit={handleSubmit}>
            <CheckboxField name="test" label={checkboxLabel} validators={[requiredTrue]} />
          </form>
        )}
      </Form>,
    );

    const checkbox = wrapper.find('input');

    expect(checkbox.at(0).prop('checked')).toEqual(false);
    expect(wrapper.find('[data-qa="test-field-error-message"]').at(0).text()).toHaveLength(0);

    // We need to click twice to trigger an error message, so that checked iterates like: false(initial) -> true -> false
    checkbox.simulate('change', eventChangeTrue);
    wrapper.update();
    expect(wrapper.find('[data-qa="test-checkbox-input"]').at(0).prop('checked')).toEqual(true);

    checkbox.simulate('change', eventChangeFalse);
    checkbox.simulate('blur');
    wrapper.update();
    // NOTE: the handle `checkbox` doesn't work here, which is weird! Probably because it's one cycle behind
    expect(wrapper.find('[data-qa="test-checkbox-input"]').at(0).prop('checked')).toEqual(false);
    expect(wrapper.find('[data-qa="test-field-error-message"]').at(0).text()).toEqual('Required field');
    wrapper.unmount();
  });

  it('should not display the label markup if the label is not passed', () => {
    const wrapper = mount(
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit }: FormRenderProps) => (
          <form onSubmit={handleSubmit}>
            <CheckboxField name="test" validators={[requiredTrue]} />
          </form>
        )}
      </Form>,
    );

    expect(wrapper.find('[data-qa="test-field-label"]')).toHaveLength(0);
    wrapper.unmount();
  });

  it('should accept any valid input html attributes and pass them to the input tag', () => {
    const wrapper = mount(
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit }: FormRenderProps) => (
          <form onSubmit={handleSubmit}>
            <CheckboxField
              name="test"
              label={checkboxLabel}
              validators={[requiredTrue]}
              disabled
              autoComplete="off"
            />
          </form>
        )}
      </Form>,
    );

    console.log(wrapper.debug());
    expect(wrapper.find('[data-qa="test-field-label"]')).toHaveLength(0);
    wrapper.unmount();
  });
});

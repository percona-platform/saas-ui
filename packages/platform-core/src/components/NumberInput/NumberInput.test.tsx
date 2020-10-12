import React, { FC } from 'react';
import { mount, shallow } from 'enzyme';
import { NumberInputField } from './NumberInput';
import { Form, Field } from 'react-final-form';

jest.spyOn(console, 'error').mockImplementation(() => {});

const Wrapper: FC = ({ children }) => (
  <Form onSubmit={() => {}}>
    {() => (
      <form>{children}</form>
    )}
  </Form>
);

describe('NumberInputField::', () => {
  it('should render an input element and two buttons', () => {
    const wrapper = mount(<Wrapper><NumberInputField name="test" /></Wrapper>);

    const field = wrapper.find(Field);

    expect(field).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(2);

    wrapper.unmount();
  });

  it('should call passed validators', () => {
    const validatorOne = jest.fn();
    const validatorTwo = jest.fn();
    const wrapper = mount(<Wrapper><NumberInputField name="test" validators={[validatorOne, validatorTwo]} /></Wrapper>);

    expect(validatorOne).toBeCalledTimes(1);
    expect(validatorTwo).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('should show an error on invalid input', () => {
    const validatorOne = jest.fn().mockReturnValue('some error');
    const validatorTwo = jest.fn();
    const wrapper = mount(<Wrapper><NumberInputField name="test" validators={[validatorOne, validatorTwo]} /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('');

    expect(validatorOne).toBeCalledTimes(1);

    wrapper.find('input').at(0).simulate('change', { target: { value: 'Test' } });

    expect(validatorOne).toBeCalledTimes(2);
    expect(validatorTwo).toBeCalledTimes(0);

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('some error');

    wrapper.unmount();
  });

  it('should show validation errors on blur if specified', () => {
    const validatorOne = jest.fn();
    const validatorTwo = jest.fn().mockReturnValue('some error');
    const wrapper = mount(<Wrapper><NumberInputField showErrorOnBlur name="test" validators={[validatorOne, validatorTwo]} /></Wrapper>);

    wrapper.find('input').at(0).simulate('change', { target: { value: 'Test' } });

    expect(validatorOne).toBeCalledTimes(2);
    expect(validatorTwo).toBeCalledTimes(2);

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('');

    wrapper.find('input').at(0).simulate('blur');

    expect(wrapper.find('[data-qa="test-field-error-message"]').text()).toBe('some error');

    wrapper.unmount();
  });

  it('should show no labels if one is not specified', () => {
    const wrapper = mount(<Wrapper><NumberInputField name="test" /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-label"]').length).toBe(0);

    wrapper.unmount();
  });

  it('should show a label if one is specified', () => {
    const wrapper = mount(<Wrapper><NumberInputField label="test label" name="test" /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-label"]').length).toBe(1);
    expect(wrapper.find('[data-qa="test-field-label"]').text()).toBe('test label');

    wrapper.unmount();
  });

  it('should show an asterisk on the label if the field is required', () => {
    const wrapper = mount(<Wrapper><NumberInputField label="test label" name="test" required /></Wrapper>);

    expect(wrapper.find('[data-qa="test-field-label"]').length).toBe(1);
    expect(wrapper.find('[data-qa="test-field-label"]').text()).toBe('test label *');

    wrapper.unmount();
  });

  it('should hide arrow buttons when disabled', () => {
    const wrapper = mount(<Wrapper><NumberInputField name="test" disabled /></Wrapper>);

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(0);

    wrapper.unmount();
  });

  it('should apply the passed class name to the inner input element', () => {
    const wrapper = mount(<Wrapper><NumberInputField name="test" className="testClass" /></Wrapper>);

    expect(wrapper.find('input').hasClass('testClass')).toBe(true);

    wrapper.unmount();
  });

  it('should set the label width as multiple of 8px when a labelWidth prop is passed', () => {
    const width = 20;

    const wrapper = shallow(<NumberInputField name="test" label="test" labelWidth={width} />);

    wrapper.unmount();
  });

  it('should change the value when clicking on the arrow buttons', () => {
    const wrapper = mount(<Wrapper><NumberInputField name="test" className="testClass" /></Wrapper>);

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

    const wrapper = mount(<Wrapper><NumberInputField name="test" className="testClass" /></Wrapper>);

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
});

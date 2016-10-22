import {shallow} from 'enzyme';
import React from 'react';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  // Page object definition for this component,
  // the main reason of this example
  function Page(component) {
    this.formField = (name) => component.find(`[name="${name}"]`);
    this.submitBtn = () => component.find('button[type="submit"]');
  }

  // We need to implement Fake event instance,
  // because testing library doesn't provide any
  // https://github.com/airbnb/enzyme/issues/277
  class TestEvent {
    constructor(targetMock) {
      this.target = targetMock;
    }
    preventDefault() {}
  }

  // Setup function for component
  // Accepts props for compient as argument
  // Returns compound object that we can destructurize
  function createComponent(props) {
    const onSubmit = jest.fn();
    const component = shallow(<LoginForm {...props} onSubmit={onSubmit} />);
    const page = new Page(component);
    return {page, onSubmit};
  }

  // Here we go, let's start writing tests!
  // There is not very much test cases,
  // but enough to show different types of them
  it('should render default email', () => {
    const {page} = createComponent({email: 'test@email.com'});

    expect(page.formField('email').prop('value')).toEqual('test@email.com');
  });

  it('should submit form', () => {
    const {page, onSubmit} = createComponent();

    page.formField('email').simulate('change', new TestEvent({name: 'email', value: 'test@email.com'}));
    page.formField('password').simulate('change', new TestEvent({name: 'password', value: 'letmein'}));
    page.submitBtn().simulate('click', new TestEvent());

    expect(onSubmit).toBeCalledWith({
      email: 'test@email.com',
      password: 'letmein'
    });
  });
})

// import Vue from 'vue';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  // Page object definition for this component,
  // the main reason of this example
  function Page(component) {
    this.formField = (name) => component.querySelector(`[name="${name}"]`);
    this.form = () => component;
  }

  function triggerEvent(target, name) {
    const event = new Event(name);
    target.dispatchEvent(event);
  }

  // Setup function for component
  // Accepts props for compient as argument
  // Returns compound object that we can destructurize
  function createComponent(props) {
    const onSubmit = jest.fn();
    const component = new LoginForm({propsData: Object.assign({onSubmit}, props)}).$mount()
    const page = new Page(component.$el);
    return {page, component, onSubmit};
  }

  it('should render default email', () => {
    const {page} = createComponent({email: 'test@email.com'});

    expect(page.formField('email').value).toEqual('test@email.com');
  });

  it('should submit form', () => {
    const {page, component, onSubmit} = createComponent();

    page.formField('email').value = 'test@email.com';
    triggerEvent(page.formField('email'), 'input');

    page.formField('password').value = 'letmein';
    triggerEvent(page.formField('password'), 'input');

    triggerEvent(page.form(), 'submit');

    expect(onSubmit).toBeCalledWith({
      email: 'test@email.com',
      password: 'letmein'
    });
  });
})

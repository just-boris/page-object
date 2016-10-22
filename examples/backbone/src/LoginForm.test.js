import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  // Page object definition for this component,
  // the main reason of this example
  function Page(component) {
    this.formField = (name) => component.find(`[name="${name}"]`);
    this.submitBtn = () => component.find('button[type="submit"]');
    this.$el = component;
  }

  // Setup function for component
  // Accepts props for compient as argument
  // Returns compound object that we can destructurize
  function createComponent(props) {
    const onSubmit = jest.fn();
    const view = new LoginForm({...props, onSubmit}).render();
    const page = new Page(view.$el);
    return {page, onSubmit};
  }


  it('should render default email', () => {
    const {page} = createComponent({email: 'test@email.com'});

    expect(page.formField('email').prop('value')).toEqual('test@email.com');
  });

  it('should submit form', () => {
    const {page, onSubmit} = createComponent();

    page.formField('email').val('test@email.com');
    page.formField('password').val('letmein');
    page.submitBtn().trigger('click');

    expect(onSubmit).toBeCalledWith({
      email: 'test@email.com',
      password: 'letmein'
    });
  });
})

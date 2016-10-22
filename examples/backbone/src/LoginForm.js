import _ from 'underscore';
import Backbone from 'backbone';

const template = _.template(`
  <p>
    <label>
      Email
      <input type="email" name="email" required value="<%= email %>" />
    </label>
  </p>
  <p>
    <label>
      Password
      <input type="password" name="password" required />
    </label>
  </p>
  <p>
    <button type="submit">Login</button>
  </p>
`);

export default class LoginForm extends Backbone.View {
  get tagName() {return 'form';}

  get events() {
    return {
      'submit': 'onFormSubmit'
    }
  }

  initialize({onSubmit, email}) {
    this.options = {
      email: email || '',
      onSubmit
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.options.onSubmit({
      email: this.$('[name="email"]').val(),
      password: this.$('[name="password"]').val()
    })
  }

  render() {
    this.$el.html(template({email: this.options.email}));
    return this;
  }
}

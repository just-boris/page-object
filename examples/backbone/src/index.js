import LoginForm from './LoginForm';

function onSubmit(data) {
  alert(`
    Email: ${data.email},
    Password: ${data.password}
  `);
}

const form = new LoginForm({onSubmit}).render();

form.$el.appendTo('#root');

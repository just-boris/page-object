import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm';

function onSubmit(data) {
  alert(`
    Email: ${data.email},
    Password: ${data.password}
  `);
}

ReactDOM.render(
  <LoginForm onSubmit={onSubmit} />,
  document.getElementById('root')
);

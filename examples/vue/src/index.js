import Vue from 'vue'
import LoginForm from './LoginForm'

function onSubmit(data) {
  alert(`
    Email: ${data.email},
    Password: ${data.password}
  `);
}

new Vue({
  el: '#app',
  render: h => h(LoginForm, {
    props: {onSubmit}
  })
})

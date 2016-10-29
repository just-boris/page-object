import Vue from 'vue/dist/vue';

export default Vue.component('login-form', {
  name: 'app',
  props: ['onSubmit', 'email'],
  template: `<form v-on:submit.prevent="onFormSubmit">
    <p>
      <label>
        Email
        <input type="email" name="email" required v-model="form.email" />
      </label>
    </p>
    <p>
      <label>
        Password
        <input type="password" name="password" required v-model="form.password" />
      </label>
    </p>
    <p>
      <button type="submit">Login</button>
    </p>
  </form>`,
  data () {
    return {
      form: {
        email: this.email || '',
        password: ''
      }
    }
  },
  methods: {
    onFormSubmit() {
      this.onSubmit(this.$data.form);
    }
  }
})

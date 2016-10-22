import React from 'react';

export default class LoginForm extends React.Component {
  state = {
    email: this.props.email,
    password: ''
  };


  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  onInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    const {email, password} = this.state;
    return (<form>
      <p>
        <label>
          Email
          <input type="email" name="email" required value={email} onChange={this.onInputChange} />
        </label>
      </p>
      <p>
        <label>
          Password
          <input type="password" name="password" required value={password} onChange={this.onInputChange} />
        </label>
      </p>
      <p>
        <button type="submit" onClick={this.onSubmit}>Login</button>
      </p>
    </form>);
  }
}

LoginForm.defaultProps = {
  email: ''
}

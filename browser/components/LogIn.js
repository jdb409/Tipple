import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/user'

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  handleChange(evt) {
    const obj = {};
    
    obj[evt.target.name] = evt.target.value
    this.setState(obj)
  }

  handleSubmit(ev) {
    ev.preventDefault();
    
    this.props.login(this.state.email, this.state.password, this.props.history);
  }

  render() {
    const { email, password } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>

          <input value={email} name='email' type='email' onChange={handleChange} placeholder = 'Login Email' />

          <input value={password} name='password' type='password' onChange={handleChange} placeholder = 'Password' />
          <button className='btn btn-primary'>Login</button>
        </form>
      </div>
    );

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, history) => {
      dispatch(auth(email, password, history))
    }
  }
}
// export default Login;
export default connect(null, mapDispatchToProps)(LogIn);

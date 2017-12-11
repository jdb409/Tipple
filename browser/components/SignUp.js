import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../store/user'

class SignUp extends Component {
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

        this.props.signUp(this.state.email, this.state.password, this.props.history);
    }

    render() {
        const { email, password } = this.state;
        const { handleChange, handleSubmit } = this;
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input value={email} name='email' type='email' onChange={handleChange} placeholder='SignUp Email' />
                    <input value={password} name='password' type='password' onChange={handleChange} placeholder='Password' />
                    <button className='btn btn-primary'>Signup</button>
                </form>
            </div>
        );

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (email, password, history) => {
            dispatch(signUp(email, password, history))
        }
    }
}

export default connect(null, mapDispatchToProps)(SignUp);

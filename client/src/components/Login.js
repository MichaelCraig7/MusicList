import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <form onSubmit="">
                    <input
                        type="text"
                        placeholder='username'
                        name='username' />
                    <br />
                    <input
                        type="text"
                        placeholder='password'
                        name='password' />
                    <br />
                    <button>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
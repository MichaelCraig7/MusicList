import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    // componentDidMount() {
    //     axios.get('/api/users').then((res) => {
    //         this.setState( `/users/${res.data._id}` )
    //     })
    // }

    handleChange = (e) => {
        const inputName = e.target.name
        const userInput = e.target.value
        const newState = { ...this.state }
        newState[ inputName ] = userInput
        this.setState( newState )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/users', this.state).then((res) => {
            console.log(res.data);
            this.props.history.push(`/users/${res.data._id}`)
        })
    }

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        value={this.state.username}
                        onChange={this.handleChange} />
                    <br />
                    <input
                        type="text"
                        placeholder='Password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange} />
                    <br />
                    <button type='submit'>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
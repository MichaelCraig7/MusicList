import React, { Component } from 'react'
import axios from 'axios'
// import SearchResults from './SearchResults'


class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        const inputName = e.target.name
        const userInput = e.target.value
        const newState = { ...this.state }
        newState[inputName] = userInput
        this.setState(newState)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/users', this.state).then((res) => {
            console.log(res);
            return(
            this.props.history.push(`/user/${res.data.newUser._id}`)
        )})
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
                        type="password"
                        placeholder='Password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange} />
                    <br />
                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }
}

export default Login
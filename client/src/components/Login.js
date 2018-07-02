import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
// import SearchResults from './SearchResults'

const LoginStyles = styled.div`
    text-align: center;
    margin: 20% 0 20% 0;
    h1 {
        font-family: ironMaiden;
        color: #aaffff;
        font-size: 8em;
        text-shadow:    
            -2px -2px 0 #000,  
            3px -3px 0 #000,
            -3px 3px 0 #000,
            3px 3px 0 #000;
    }
    input {
        border-radius: 0;
        opacity: 0.45;
        border: none;
        border-bottom: 2px #013461 solid;
        margin-bottom: .5%;
        font-size: 1.75em;
        height: 40px;
        width: 23%;
    }
    button {
        text-decoration: none;
        background: none;
        border: none;
    }
    `

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
            return (
                this.props.history.push(`/user/${res.data.newUser._id}`)
            )
        })
    }

    render() {
        return (
            <LoginStyles>
                <h1>Music List</h1>
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
                    <button type='submit'></button>
                </form>
            </LoginStyles>
        )
    }
}

export default Login
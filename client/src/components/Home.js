import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import Login from './Login';

const HomeStyles = styled.div`
    text-align: center;
    margin: 20% 0 20% 0;
    background: url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b400f0e9fc87b74d11ab679e48673d9f&auto=format&fit=crop&w=2550&q=80') no-repeat center center fixed;

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
    a {
        color: #aaffff;
        font-family: 'Arial';
        margin: 30% 0 30% 0;
        text-decoration: none;
        font-size: 2em;
        text-shadow:    
            1px 1px 0 #000,  
        1px 1px 0 #000,
            1px 1px 0 #000,
        1px 1px 0 #000;
    }

`

class Home extends Component {


    render() {
        return (
            <HomeStyles>
                <h1>Music List</h1>
                <img src="/Users/michaelcraig/Documents/Project_3/MusicList/client/src/WDIProject3.psd" alt=''/>
                <br />
                <Link to="/login">ENTER</Link>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </Router>
            </HomeStyles>
        );
    }
}

export default Home;
import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import Login from './Login';

const HomeStyles = styled.div`
    text-align: center;
    button {
        background-color: #1cd860;
    }

`

class Home extends Component {


    render() {
        return (
            <HomeStyles>
                <h1>Music List</h1>
                <img src="http://www.iosicongallery.com/img/1024/spotify-music-2015-07-30.png" alt='' height="300" />
                <br/>
                <Link to="/login"><button>Enter</button></Link>
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
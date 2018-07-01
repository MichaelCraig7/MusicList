import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import Login from './Login';

const HomeStyles = styled.div`
    text-align: center;
    margin: 40% 0 60% 0;
    h1 {
        font-family: If;
        font-size: 3em;
        margin-bottom: 50px;
    }
    a {
        text-decoration: none;
        color: #1cd860;
        font-size: 2em;
    }

`

class Home extends Component {


    render() {
        return (
            <HomeStyles>
                <h1>Music List</h1>
                <img src="http://www.iosicongallery.com/img/1024/spotify-music-2015-07-30.png" alt='' height="300" />
                <br/>
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
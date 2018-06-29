import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NewUserLogin from './components/NewUserLogin'
import UserPage from './components/UserPage'
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist'
import styled from 'styled-components'


const AppStyles = styled.div`
  color: white;
  margin: 0;
  background-color: #252121;
  height: 100vh;
  h1 {
    margin: 0;
  }
`

class App extends Component {

  render() {

    return (
      <AppStyles>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/new" component={NewUserLogin} />
              <Route exact path="/user/:userId/results" component={SearchResults} />
              <Route exact path="/user/:userId" component={UserPage} />
              <Route exact path="/user/:userId/playlist/:playlistId" component={Playlist} />
            </Switch>
          </div>
        </Router>
      </AppStyles>
    );
  }
}

export default App;

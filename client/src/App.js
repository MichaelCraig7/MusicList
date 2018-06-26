import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NewUserLogin from './components/NewUserLogin'
import UserPage from './components/UserPage'
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/new" component={NewUserLogin} />
            <Route exact path="/user/:userId" component={UserPage} />
            <Route exact path="/user/:userId/results" component={SearchResults} />
            <Route exact path="/user/:userId/playlist" component={Playlist} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

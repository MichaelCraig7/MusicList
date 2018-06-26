import React, { Component } from 'react';
import { Link, Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import UserPage from './components/UserPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={Login} />
            <Route exact path="/user/:userId" component={UserPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

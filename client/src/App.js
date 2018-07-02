import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NewUserLogin from './components/NewUserLogin'
import UserPage from './components/UserPage'
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPlus, faTimesCircle, faPencilAlt, faCaretRight} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faPlus, faTimesCircle, faPencilAlt, faCaretRight)


const AppStyles = styled.div`
  color: white;
  margin: 0;
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

import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NewUserLogin from './components/NewUserLogin'
import UserPage from './components/UserPage'
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist'
import styled from 'styled-components'
// import axios from 'axios'


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

  state = {
    data: {},
    user: '',
    playlists: [],
    query: '',
  }

  // getUsername() {
  //   const userId = this.state
  //   axios.get(`/api/users/${userId}`).then((res) => {
  //     console.log('getusername', res);
  //     return (
  //       this.setState({
  //         user: res.data.showUser.username,
  //         data: res.data
  //       }))
  //   })
  // }

  // getPlaylists() {
  //   const userId = this.props.match.params.userId

  //   axios.get(`/api/users/${userId}/playlists`).then((res) => {
  //     // console.log('getplaylists', res);
  //     return (
  //       this.setState({
  //         playlists: res.data.playlists,
  //         title: res.data.playlists[0].title
  //       }))
  //   })
  // }

  // componentDidMount() {
  //   this.getUsername()
  //   // this.getPlaylists()
  // }

  render() {

    // const PlaylistPayload = (props) => (
    //   <Playlist data={this.state} {...props}/>
    // )
    // const UserPagePayload = (props) => (
    //   <UserPage data={this.state} {...props}/>
    // )

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

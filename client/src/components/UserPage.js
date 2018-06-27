import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import Playlist from './Playlist';


const UserPageStyles = styled.div`
    a {
        text-decoration: none;
        color: white
    }
`

class UserPage extends Component {

    state = {
        data: {},
        user: '',
        playlists: [],
        query: '',
    }

    onSubmitQuery(e) {
        this.setState({
            query: e.target.value
        })
    }

    getUsername() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`).then((res) => {
            console.log('getusername', res);
            return (
                this.setState({
                    user: res.data.showUser.username,
                    data: res.data
                }))
        })
    }

    getPlaylists() {
        const userId = this.props.match.params.userId

        axios.get(`/api/users/${userId}/playlists`).then((res) => {
            // console.log('getplaylists', res);
            return (
                this.setState({
                    playlists: res.data.playlists,
                    title: res.data.playlists[0].title
                }))
        })
    }

    getseomthingelse() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}/playlists`).then((res) => {
            // console.log('getplaylists', res);
            return (
                this.setState({
                    playlists: res.data.playlists
                }))
        })
    }

    componentDidMount() {
        this.getUsername()
        this.getPlaylists()
    }

    render() {
        if (this.state.data.showUser === undefined) {
            return null
        }

        const PlaylistPayload = (props) => (
            <Playlist
                userPageState={this.state} {...props} />
        )

        console.log(this.state.data.showUser);
        const user = this.state.user
        const userImage = this.state.data.showUser.userImage
        const userId = this.props.match.params.userId
        const userNameUrl = `/user/${userId}`

        return (
            <UserPageStyles>
                <Link to={userNameUrl}><img src={userImage} alt='' height='50' width='50' />{user}</Link>
                <form onSubmit={this.onSubmitQuery}>
                    <input type='text' placeholder='Search' />
                    <input type='submit' value='Search' />
                </form>

                <h1><img src={userImage} alt='' height='50' width='50' />{user}</h1>
                <br />
                <br />
                <br />
                <br />
                <hr />
                <h1>Playlists</h1>
                <div>
                    {this.state.playlists.map(playlist => {
                        console.log(this.state);
                        const playlistUrl = `/user/${userId}/playlist/${playlist._id}`
                        return (
                            <div key={playlist._id}>
                                <Link to={playlistUrl} >
                                    <img src={playlist.image} alt='' height='150px' width='150' />
                                </Link>
                                <br />
                                <Link to={playlistUrl} >
                                    {playlist.title}
                                </Link>
                            </div>
                        )
                    })}
                    <Route exact path="/user/:userId/playlist/:playlistId" render={PlaylistPayload} />
                </div>
            </UserPageStyles>
        );
    }
}

export default UserPage;
import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const UserPageStyles = styled.div`
    a {
        text-decoration: none;
        color: white
    }
`

class UserPage extends Component {

    state = {
        user: {},
        playlists: [],
        query: ''
    }

    onSubmitQuery(e) {
        this.setState({
            query: e.target.value
        })
    }

    getUsername() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`).then(res => {
            this.setState({
                user: res.data.showUser,
                playlists: res.data.showUser.playlists
            })
        })
    }

    newPlaylist = () => {
        const userId = this.props.match.params.userId
        axios.post(`/api/users/${userId}/playlists`).then(() => {
            return axios.get(`/api/users/${userId}`)
                .then(res => {
                    this.setState({
                        playlists: res.data.showUser.playlists
                    })
                })
        })
    }

    deletePlaylist = (playlistId) => {
        const userId = this.props.match.params.userId
        axios.delete(`/api/users/${userId}/playlists/${playlistId}`)
            .then(() => {
                return axios.get(`/api/users/${userId}`)
                    .then(res => {
                        this.setState({
                            user: res.data.showUser,
                            playlists: res.data.showUser.playlists
                        })
                    })
            })
    }

    componentDidMount() {
        this.getUsername()
    }

    render() {

        if (!this.state.user._id) {
            return 'Loading'
        }

        const username = this.state.user.username || ''
        const user = this.state.user || {}
        const userId = this.props.match.params.userId
        const userImage = this.state.user.userImage || ''
        const userNameUrl = `/user/${userId}`
        const playlists = this.state.playlists
        console.log(playlists)

        return (
            <UserPageStyles>
                <Link to={userNameUrl}>
                    <img src={userImage} alt='' height='50' width='50' />{username}
                </Link>
                <form onSubmit={this.onSubmitQuery}>
                    <input type='text' placeholder='Search' />
                    <input type='submit' value='Search' />
                </form>
                <h1><img src={userImage} alt='' height='50' width='50' />{user.username}</h1>
                <br />
                <br />
                <br />
                <br />
                <hr />
                <h1>Playlists</h1>
                <button onClick={this.newPlaylist}>New Playlist</button>
                <div>
                    {playlists.map(playlist => {
                        const playlistUrl = `/user/${userId}/playlist/${playlist._id}`
                        return (
                            <div key={playlist._id}>
                                <Link to={playlistUrl} >
                                    <img src={playlist.image} alt='' height='150' width='150' />
                                </Link>
                                <br />
                                <Link to={playlistUrl} >
                                    {playlist.title}
                                </Link>
                                <button onClick={() => this.deletePlaylist(playlist._id)}>DELETE</button>
                            </div>
                        )
                    })}
                </div>
            </UserPageStyles >
        );
    }
}

export default UserPage;
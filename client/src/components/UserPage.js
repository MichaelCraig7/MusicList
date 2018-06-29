import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// Key: 7b7aa74dbe9515ecbe0deae7a9575a78

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
        query: '',
        toggleEdit: false
    }

    toggleEdit() {
        const editPlaylist = !this.state.toggleEdit
        this.setState({
            editPlaylist
        })
    }

    handleChange = (event, playlistId) => {
        const playlistArray = [...this.state.playlists]
        console.log(playlistId);

        const editedPlaylist = playlistArray.find(playlist => playlist._id === playlistId)
        console.log(editedPlaylist);

        const inputName = event.target.name
        const userInput = event.target.value
        editedPlaylist[inputName] = userInput
        this.setState({ playlists: playlistArray })
    }

    editPlaylist = (playlistId) => {
        const userId = this.props.match.params.userId
        const playlistEdit = this.state.playlists.find(playlist => playlist._id === playlistId)
        axios.patch(`/api/users/${userId}/playlists/${playlistId}`, playlistEdit)
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

    deleteUser = () => {
        const userId = this.props.match.params.userId
        console.log(userId);
        
        axios.delete(`/api/users/${userId}`)
            .then(() => {
                return (
                    this.props.history.push(`/login`)
                )
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
        console.log(this.props.history);

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
                <div>
                    <Link to={userNameUrl}>
                        <img src={userImage} alt='' height='50' width='50' />{username}
                    </Link>
                    <button onClick={this.deleteUser}>X</button>

                </div>
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
                                {this.state.editPlaylist
                                    ?
                                    <div>
                                        <img src={playlist.image} alt='' height='150' width='150' />
                                        <form onSubmit={() => this.editPlaylist(playlist._id)}>
                                            <input
                                                type="text"
                                                name='title'
                                                value={playlist.title}
                                                onChange={(event) => this.handleChange(event, playlist._id)}
                                            />
                                            <button type='submit'>UPDATE</button>
                                        </form>
                                    </div>
                                    :
                                    <div>
                                        <Link to={playlistUrl} >
                                            <img src={playlist.image} alt='' height='150' width='150' />
                                        </Link>
                                        <br />
                                        <Link to={playlistUrl} >
                                            {playlist.title}
                                        </Link>
                                        <button onClick={() => this.deletePlaylist(playlist._id)}>DELETE</button>
                                        <button onClick={() => this.toggleEdit()}>EDIT</button>
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
            </UserPageStyles >
        );
    }
}

export default UserPage;
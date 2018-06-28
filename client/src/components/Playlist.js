import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'



class Playlist extends Component {

    state = {
        user: {},
        songs: [],
        playlists: [],
        query: ''
    }

    onSubmitQuery(e) {
        this.setState({
            query: e.target.value
        })
    }

    getData() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`).then(res => {
            this.setState({
                user: res.data.showUser,
                playlists: res.data.showUser.playlists
            })
        })
    }

    getSongs() {
        const userId = this.props.match.params.userId
        const playlistId = this.props.match.params.playlistId
        axios.get(`/api/users/${userId}/playlists/${playlistId}`)
        .then(res => {
            console.log(res.data.playlist)
                this.setState({
                    songs: res.data.playlist.songs
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

    deleteSong = (songId) => {
        const userId = this.props.match.params.userId
        const playlistId = this.props.match.params.playlistId
        axios.delete(`/api/users/${userId}/playlists/${playlistId}/songs/${songId}`)
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
        this.getData()
        this.getSongs()
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
        const songs = this.state.songs || []
        console.log(this.state.songs)

        return (
            <div>
                <Link to={userNameUrl}>
                    <img src={userImage} alt='' height='50' width='50' />{username}
                </Link>
                <form onSubmit={this.onSubmitQuery}>
                    <input type='text' placeholder='Search' />
                    <input type='submit' value='Search' />
                </form>
                <div>
                    {songs.map(song => {
                        const songTitle = song.title
                        const songArtist = song.artist
                        const songAlbum = song.album
                        console.log(song._id)
                        return (
                            <div key={song._id}>
                                <img src={song.albumImage} alt='' height='200'/>
                                <p>Title: {songTitle}</p>
                                <p>Artist: {songArtist}</p>
                                <p>Album: {songAlbum}</p>
                                <button onClick={() => this.deleteSong(song._id)}>DELETE</button>
                                <hr/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Playlist;
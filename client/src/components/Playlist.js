import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'



class Playlist extends Component {

    state = {
        user: {},
        playlistTitle: '',
        songs: [],
        playlists: [],
        query: '',
        musiXMatch: []
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
                this.setState({
                    songs: res.data.playlist.songs,
                    playlistTitle: res.data.playlist.title
                })
            })
    }

    deleteSong = (songId) => {
        const userId = this.props.match.params.userId
        const playlistId = this.props.match.params.playlistId
        axios.delete(`/api/users/${userId}/playlists/${playlistId}/songs/${songId}`)
            .then(() => {
                return axios.get(`/api/users/${userId}/`)
                    .then(res => {
                        this.setState({
                            user: res.data.showUser,
                            playlists: res.data.showUser.playlists
                        })
                    })
            })
            .then(() => {
                return axios.get(`/api/users/${userId}/playlists/${playlistId}`)
                    .then(res => {
                        this.setState({
                            songs: res.data.playlist.songs
                        })
                    })
            })
    }

    componentDidMount() {
        axios.get('http://api.musixmatch.com/ws/1.1/track.search?apikey=7b7aa74dbe9515ecbe0deae7a9575a78&q_track=Dire%20straits%20Sultans%20of%20Swing&page_size=10').then(res => {
            console.log(res.data)
            this.setState({ musiXMatch: res.data })
        })
        this.getData()
        this.getSongs()
    }

    // componentDidMount() {
    //     this.getData()
    //     this.getSongs()
    //     // this.setState(this.getData, this.getSongs)
    // }

    render() {

        if (!this.state.user._id) {
            return 'Loading'
        }

        const username = this.state.user.username || ''
        const userId = this.props.match.params.userId
        const userImage = this.state.user.userImage || ''
        const userNameUrl = `/user/${userId}`
        const songs = this.state.songs || []
        const playlistTitle = this.state.playlistTitle
        console.log(this.state)

        return (
            <div>
                <Link to={userNameUrl}>
                    <img src={userImage} alt='' height='50' width='50' />{username}
                </Link>
                <form onSubmit={this.onSubmitQuery}>
                    <input type='text' placeholder='Search' />
                    <input type='submit' value='Search' />
                </form>
                <h4>Playlist</h4>
                <h1>{playlistTitle}</h1>
                <div>
                    {songs.map(song => {
                        const songTitle = song.title
                        const songArtist = song.artist
                        const songAlbum = song.album
                        return (
                            <div key={song._id}>
                                <img src={song.albumImage} alt='' height='200' />
                                <p>Title: {songTitle}</p>
                                <p>Artist: {songArtist}</p>
                                <p>Album: {songAlbum}</p>
                                <button onClick={() => this.deleteSong(song._id)}>DELETE</button>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </div >
        );
    }
}

export default Playlist;
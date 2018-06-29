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
        musiXMatch: [],
        url: '',
        searchResults: {},
        showHide: false
    }

    handleSearchInput = (e) => {
        const searchResults = { ...this.state.searchResults }
        const inputName = e.target.name
        const userInput = e.target.value
        console.log("what is this?", this);

        searchResults[inputName] = userInput
        this.setState({
            searchResults
        })
    }

    handleSubmit = (e) => {
        axios.post('/api/index/musix', this.state.searchResults).then((res) => {
            console.log(res);
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

    getSongsFromAPI = () => {
        axios.get('/api/index/musix')
            .then(res => {
                // req.query.search = this.state.searchResults.query
                console.log('getSongsFromAPI', this.state.searchResults.query)
                this.setState({
                    musiXMatch: res.data.data.message.body.track_list
                })
            })
    }

    componentDidMount() {
        this.getData()
        this.getSongs()
    }

    buttonFunctionCalls = () => {
        this.handleSubmit()
        this.getSongsFromAPI()
    }

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
        const musiXMatch = this.state.musiXMatch
        // console.log(this.state)

        return (
            <div>

                <Link to={userNameUrl}>
                    <img src={userImage} alt='' height='50' width='50' />{username}
                </Link>

                <div>
                    <input
                        type='text'
                        name='query'
                        placeholder='Search'
                        onChange={this.handleSearchInput}
                    />
                    <button onClick={this.buttonFunctionCalls}>Submit</button>
                </div>

                <div>
                    {this.state.showHide

                        ?

                        <div>
                            {musiXMatch.map(results => {
                                console.log(results);
                                const trackName = results.track.track_name
                                return (
                                    <div>
                                        <p>{trackName}</p>
                                    </div>
                                )
                            })}
                        </div>

                        :

                        <div>
                            <h4>Playlist</h4>
                            <h1>{playlistTitle}</h1>

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
                    }
                </div>

            </div >
        );
    }
}

export default Playlist;
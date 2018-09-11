import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PlaylistPage = styled.div`
    background: linear-gradient(#111e2f, #01243a);
    opacity: .83;
    height: 100vh;
    width: 82.5vw; 
    justify-content: center;
    margin: 1% 7.5% 1% 7.5%;
    border-radius: 1.5%;
    font-family: Arial;
`

const SearchBarStyles = styled.div`
    button {
        vertical-align: 20px;
        background: white;
        border: none;
        color: grey;
    }
    input {
        text-align: left;
        opacity: 0.45;
        border: none;
    }
`

const UserNameTop = styled.div`
    text-align: right;
    padding: 10px 10px 0 0; 
    a {
        vertical-align: 20px;
        text-decoration: none;
        color: white;
        font-size: 20px;
        padding-right: 7px;
    }
    img {
        vertical-align: -30%;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        margin-right: 7px;
    }

    .trash {
        color: grey;
    }
`

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

    showHide() {
        const editPlaylist = !this.state.showHide
        this.setState({
            editPlaylist
        })
    }

    handleSearchInput = (e) => {
        const searchResults = { ...this.state.searchResults }
        const inputName = e.target.name
        const userInput = e.target.value
        console.log("User Input", this);

        searchResults[inputName] = userInput
        this.setState({
            searchResults
        })
    }

    handleSubmit = (e) => {
        // axios.post(`/api/index/musix`, this.state.searchResults).then((res) => {
        //     console.log(res);
        // })
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
        const userId = this.props.match.params.userId
        const playlistId = this.props.match.params.playlistId
        axios.get(`/api/users/${userId}/playlists/${playlistId}/songs?search=${this.state.searchResults.query}`)
            .then(res => {
                console.log('getSongsFromAPI', this.state.searchResults.query)
                console.log('getSongsFromAPI', res)
                this.setState({
                    musiXMatch: res.data.data.message.body.track_list
                })
            })
        // .then(() => {
        //     this.showHide()
        // })
    }

    addSongToPlaylist = (songInfo) => {
        const userId = this.props.match.params.userId
        const playlistId = this.props.match.params.playlistId
        console.log(this.state.songs)
        axios.post(`/api/users/${userId}/playlists/${playlistId}/songs`, songInfo).then(() => {
            return axios.get(`/api/users/${userId}/playlists/${playlistId}/songs?search=${this.state.searchResults.query}`)
                .then(res => {
                    console.log(res)
                    this.setState({
                        playlists: res.data.data.message.body.track_list
                    })
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

        return (
            <PlaylistPage>

                <SearchBarStyles>
                    <input
                        type='text'
                        name='query'
                        placeholder='Search'
                        onChange={this.handleSearchInput}
                    />
                    <button onClick={this.buttonFunctionCalls}><FontAwesomeIcon icon="caret-right" /></button>
                </SearchBarStyles>

                <UserNameTop>
                    <Link to={userNameUrl}>
                        <img src={userImage} alt='' />{username}
                    </Link>
                    <a className='trash' onClick={this.deleteUser}><FontAwesomeIcon icon="trash" /></a>

                </UserNameTop>

                <div>
                    {/* {this.state.getSongsFromAPI */}

                    {/* ? */}

                    <div>
                        {musiXMatch.map((results, i) => {
                            console.log(results);
                            const trackName = results.track.track_name
                            const artistName = results.track.artist_name
                            const albumArt = results.track.album_coverart_100x100
                            const albumTitle = results.track.album_name
                            const newSong = {
                                // image: albumArt,
                                title: trackName,
                                artist: artistName,
                                album: albumTitle
                            }
                            return (
                                <div key={i}>
                                    <br />
                                    {/* <img src={albumArt} alt='' /> */}
                                    <h3>Title: {trackName}</h3>
                                    <p>Artist: {artistName}</p>
                                    <p>Album: {albumTitle}</p>
                                    <button onClick={() => this.addSongToPlaylist(newSong)}>Add to Playlist</button>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>

                    {/* : */}

                    <div>
                        <h4>Playlist</h4>
                        <h1>{playlistTitle}</h1>

                        {songs.map(song => {
                            const songTitle = song.title
                            const songArtist = song.artist
                            const songAlbum = song.album
                            return (
                                <div key={song._id}>
                                    {/* <img src={song.albumImage} alt='' /> */}
                                    <p>Title: {songTitle}</p>
                                    <p>Artist: {songArtist}</p>
                                    <p>Album: {songAlbum}</p>
                                    <button onClick={() => this.deleteSong(song._id)}>DELETE</button>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                    {/* } */}
                </div>

            </PlaylistPage >
        );
    }
}

export default Playlist;
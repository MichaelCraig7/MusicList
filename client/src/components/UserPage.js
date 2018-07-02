import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BackgroundStyles = styled.div`
    /* background: linear-gradient(rgb(52, 52, 52), rgb(7, 7, 7));
    height: 100vh;
    width: 100vw; */
`

const UserPageStyles = styled.div`
    margin: 1% 7.5% 1% 7.5%;
    font-family: Arial;
    a {
        text-decoration: none;
        color: white
    }
    body {
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
    button {
        vertical-align: 20px;
    }
    .trash {
        color: grey;
    }
`

const UserNameMiddle = styled.div`
    margin-bottom: 7.5%;
    display: flex;
    img {
        border-radius: 50%;
        vertical-align: -10px;
        margin-right: 15px;
        height: 250px;
        width: 250px;
    }
    h1 {
        vertical-align: -20px;
        font-size: 4em;
    }
`

const PlaylistHeading = styled.div`
    display: inline;
    font-size: 3em;
    div {
        border-bottom: 2px solid white;
        padding-bottom: 2.5%;
    }
    a {
        padding-left: 10px;
        font-size: .4em;
        vertical-align:40%;
        color: grey;
    }
`

const GeneralWrapper = styled.div`
        padding: 2.5%;
        margin: 0;
        img {
            align-self: center;
            height: 15em;
            width: 15em;
            margin: 30px 20px 0px 20px;
        }
        .playlistInfo {
            text-decoration: none;
            color: white;
            margin-left: 20px;
        }
        .editIcon {
            float: right;
            margin-right: 20px;
        }
`

const PlaylistList = styled.div`
    float: left;
    form {
        text-decoration: none;
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
            <BackgroundStyles>
                <UserPageStyles>
                    <UserNameTop>
                        <Link to={userNameUrl}>
                            <img src={userImage} alt='' />{username}
                        </Link>
                        <a className='trash' onClick={this.deleteUser}><FontAwesomeIcon icon="trash" /></a>
                    </UserNameTop>

                    <UserNameMiddle>
                        <img src={userImage} alt='' />
                        <h1>{user.username}</h1>
                    </UserNameMiddle>

                    <PlaylistHeading>
                        <div>Playlists
                        <a onClick={this.newPlaylist}><FontAwesomeIcon icon="plus" /></a>
                        </div>
                    </PlaylistHeading>

                    <GeneralWrapper>
                        {playlists.map(playlist => {
                            const playlistUrl = `/user/${userId}/playlist/${playlist._id}`
                            return (
                                <div key={playlist._id}>
                                    {this.state.editPlaylist
                                        ?
                                        <PlaylistList>
                                            <img src={playlist.image} alt='' />
                                            <form className='playlistInfo'onSubmit={() => this.editPlaylist(playlist._id)}>
                                                <input
                                                    type="text"
                                                    name='title'
                                                    value={playlist.title}
                                                    onChange={(event) => this.handleChange(event, playlist._id)}
                                                />
                                                <a type='submit'></a>
                                                <a className='playlistInfo' onClick={() => this.toggleEdit()}><FontAwesomeIcon className="editIcon" icon="pencil-alt" /></a>
                                                <a onClick={() => this.deletePlaylist(playlist._id)}><FontAwesomeIcon className='editIcon' icon="trash" /></a>
                                            </form>
                                        </PlaylistList>
                                        :
                                        <PlaylistList>
                                            <Link to={playlistUrl} >
                                                <img src={playlist.image} alt='' />
                                            </Link>
                                            <br />
                                            <div>
                                                <Link className='playlistInfo' to={playlistUrl} >
                                                    {playlist.title}
                                                </Link>
                                                <a className='playlistInfo' onClick={() => this.toggleEdit()}><FontAwesomeIcon className="editIcon" icon="pencil-alt" /></a>
                                            </div>
                                        </PlaylistList>
                                    }
                                </div>
                            )
                        })}
                    </GeneralWrapper>
                </UserPageStyles >
            </BackgroundStyles>
        );
    }
}

export default UserPage;
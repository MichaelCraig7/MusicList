import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




// Key: 7b7aa74dbe9515ecbe0deae7a9575a78

// const UserPageStyles = styled.div`
//     a {
//         text-decoration: none;
//         color: white
//     }
// `

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
        a {
            text-decoration: none;
            color: white;
            margin: 0px 20px 30px 20px;
            align-self: center;
        }
        img {
            height: 16em;
            width: 16em;
            margin: 30px 20px 0px 20px;
    }
`

const PlaylistList = styled.div`
    float: left;
    div {
        margin: 0px 20px 0px 20px;
    }
    .icons{

    }
`

const PlaylistEdit = styled.div`
    align-self: center;
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
            <div>
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
                                    <PlaylistEdit>
                                        <img src={playlist.image} alt='' />
                                        <form onSubmit={() => this.editPlaylist(playlist._id)}>
                                            <input
                                                type="text"
                                                name='title'
                                                value={playlist.title}
                                                onChange={(event) => this.handleChange(event, playlist._id)}
                                            />
                                            <a type='submit'><FontAwesomeIcon icon="plus" /></a>
                                        </form>
                                    </PlaylistEdit>
                                    :
                                    <PlaylistList>
                                        <Link to={playlistUrl} >
                                            <img src={playlist.image} alt='' />
                                        </Link>
                                        <br />
                                        <div>
                                            <Link to={playlistUrl} >
                                                {playlist.title}
                                            </Link>
                                            <a className='icons' onClick={() => this.toggleEdit()}><FontAwesomeIcon icon="pencil-alt" /></a>
                                            <a className='icons' onClick={() => this.deletePlaylist(playlist._id)}><FontAwesomeIcon icon="times-circle" /></a>
                                        </div>
                                    </PlaylistList>
                                }
                            </div>
                        )
                    })}
                </GeneralWrapper>
            </div >
        );
    }
}

export default UserPage;
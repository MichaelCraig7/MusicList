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
        console.log(this.state.user);
        const user = this.state.user
        return (
            <UserPageStyles>
                {/* <Link to=`/user/:userId`>{user}</Link> */}
                <form onSubmit={this.onSubmitQuery}>
                    <input type='text' placeholder='Search' />
                    <input type='submit' value='Search' />
                </form>
                <h1>{user}</h1>
                <br />
                <br />
                <br />
                <br />
                <hr />
                <h1>Playlists</h1>
                <div>
                    {this.state.playlists.map(playlist => {
                        console.log(this.state);
                        return (
                            <div key={playlist._id}>
                                <Link to='/user/:userId/playlist/:playlistId' >
                                    <img src={playlist.image} alt='' height='150px' width='150' />
                                </Link>
                                <br />
                                <Link to='/user/:userId/playlist/:playlistId' >
                                    {playlist.title}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </UserPageStyles>
        );
    }
}

export default UserPage;
import React, { Component } from 'react';
import axios from 'axios'

class UserPage extends Component {

    state = {
        user: {},
        playlists: {
            title: '',
            image: '',
            songs: []
        },
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
            console.log('getplaylists', res.data.playlists[0].title);
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
            console.log('getplaylists', res);
            return (
                this.setState({
                    playlists: res.data.playlists
                }))
        })
    }

    componentDidMount() {
        this.getPlaylists()
        this.getUsername()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitQuery}>
                    <input type='text' placeholder='Search' />
                    <input type='submit' value='Search' />
                </form>
                <h1>User Page</h1>
                <br />
                <br />
                <br />
                <br />
                <hr />
                <h1>Playlists</h1>
            </div>
        );
    }
}

export default UserPage;
import React, { Component } from 'react';
import axios from 'axios'



class Playlist extends Component {

    state = {
        data: {},
        user: '',
        playlists: [],
        query: '',
    }

    onSubmitQuery(e) {
        this.setState({
            query: e.target.value
        })
    }

    populateState() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`).then((res) => {
            return (
                this.setState({
                    user: res.data.showUser.username,
                    data: res.data,
                }))
        })
    }

    getPlaylists() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}/playlists`).then((res) => {
            return (
                this.setState({
                    playlists: res.data.playlists,
                    title: res.data.playlists[0].title
                }))
        })
    }

    componentDidMount() {
        this.populateState()
    }

    render() {
        if (this.state.data.showUser === undefined) {
            return null
        }

        console.log(this.state.data.showUser.playlists[0].image)
        console.log(this)


        const user = this.state.user
        const userImage = this.state.data.showUser.userImage
        // const playlistImage = 
        const userId = this.props.match.params.userId
        const userNameUrl = `/user/${userId}`

        return (
            <div>
                {/* <Link to={userNameUrl}><img src={userImage} alt='' height='50' width='50' />{user}</Link> */}
                {/* <img src={} /> */}
                <h1>Playlist Page</h1>
            </div>
        );
    }
}

export default Playlist;
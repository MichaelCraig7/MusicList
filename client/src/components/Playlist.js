import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'



class Playlist extends Component {

    // state = {
    //     userPageState: {}
    // }

    // componentDidMount() {
    //     axios.get('/api/users').then((res) => {
    //         this.setState({
    //             userPageState: res.data
    //         })
    //     })
    // }

    render() {
        // const fixThings = this.state.userPageState || []

        // if (this.state === {}) {
        //     return null
        // }

        console.log(this)


        // const user = this.state.user
        // const userImage = this.state.userPageState.user.userImage
        // const userId = this.props.match.params.userId
        // const userNameUrl = `/user/${userId}`

        return (
            <div>
                {/* <Link to={userNameUrl}><img src={userImage} alt='' height='50' width='50' />{user}</Link> */}
                <h1>Playlist Page</h1>
            </div>
        );
    }
}

export default Playlist;
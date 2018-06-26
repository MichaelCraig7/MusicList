import React, { Component } from 'react';


class UserPage extends Component {

    state = {
        query: '',

    }

    onSubmitQuery(e) {
        this.setState({
            query: e.target.value
        })
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
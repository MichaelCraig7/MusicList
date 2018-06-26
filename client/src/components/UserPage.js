import React, { Component } from 'react';

class UserPage extends Component {
    render() {
        return (
            <div>
                <form action="">
                    <input
                        type="text"
                        placeholder='Search' />
                    <button onSearch=''>Search</button>
                </form>
                <h1>User Page</h1>
                <br/>
                <br/>
                <br/>
                <br/>
                <hr/>
                <h1>Playlists</h1>
            </div>
        );
    }
}

export default UserPage;
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SearchStyles = styled.div`
    a {
        color: white;
        text-decoration: none;
    }
`

class SearchResults extends Component {
    render() {
        return (
            <SearchStyles>
                <div>
                    <form action="">
                        <input
                            type="text"
                            placeholder='Search'
                        />
                        <button onSearch=''>Search</button>
                        <Link to="/user/:userId">Username</Link>
                        {/* <Link key={user._id} to={`/user/${user._id}`}>{user.userName}</Link> */}
                    </form>
                    <h1>Search Results Page</h1>
                </div>
            </SearchStyles>
        );
    }
}

export default SearchResults;
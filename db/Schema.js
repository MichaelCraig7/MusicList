const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
    title: {
        type: String
    },
    artist: {
        type: String
    },
    album: {
        type: String
    },
    albumImage: {
        type: String
    },
    genre: {
        type: String
    },
    dateAdded: {
        type: Date
    }
})

const PlaylistSchema = new Schema({
    title: {
        type: String,
        default: 'My Playlist'
	},
    artist: {
        type: String,
	},
	image: {
        type: String,
        default: 'https://picsum.photos/200/300/?random'
    },
    album: {
        type: String,
    },
    dateCreated: Date,
    songs: [ SongSchema ]
})	

const UserSchema = new Schema({
    username: {
        type: String,
        default: 'Lazy User'
    },
    password: {
        type: String
    },
    userImage: {
        type: String,
        default: 'http://placekitten.com/200/300'
    },
    playlists: [ PlaylistSchema ]
})

const UserModel = mongoose.model('user', UserSchema)
const PlaylistModel = mongoose.model('playlist', PlaylistSchema)
const SongModel = mongoose.model('song', SongSchema)

module.exports = {
	UserModel,
    PlaylistModel,
    SongModel
}
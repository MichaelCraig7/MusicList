const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        default: 'https://picsum.photos/200/300/?random'
    },
    playlists: [ userPlaylists ]
})

const PlaylistSchema = new Schema({
	title: {
        type: String,
        default: 'My Playlist'
	},
	image: {
        type: String,
        default: 'https://picsum.photos/200/300/?random'
	},
    dateCreated: Date,
    songs: [ songsInPlaylist ]
})	

const SongSchema = new Schema({
	userName: {
		type: String
	},
	password: {
		type: String
	}
})

const UserModel = mongoose.model('user', UserSchema)
const PlaylistModel = mongoose.model('playlist', PlaylistSchema)
const SongModel = mongoose.model('song', SongSchema)

module.exports = {
	UserModel,
    PlaylistModel,
    SongModel
}
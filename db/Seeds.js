require('dotenv').config()
const mongoose = require('mongoose')
const { UserModel, PlaylistModel, SongModel } = require('./schema')
mongoose.connect(process.env.MONGODB_URI)

const Johnny = new UserModel({
    username: 'MusicIsFun',
    password: 'passywordy',
    userImage: 'http://placekitten.com/200/300',
    playlists: [ AmSad, AmANGRY ]
})

const Barb = new UserModel({
    username: 'Hello I am Barb',
    password: 'wordpass',
    userImage: 'http://placekitten.com/200/300',
    playlists: [ AmHappy ]
})

const AmSad = new PlaylistModel({
    title: 'My Sadness Knows No Bounds',
    image: 'https://ih1.redbubble.net/image.331436707.7782/pp%2C185x205-pad%2C210x230%2Cf8f8f8.lite-1.jpg',
    dateCreated: Date,
    songs: [ EverybodyHurts, Alone ]
})

const AmANGRY = new PlaylistModel({
    title: 'My Anger Knows No Bounds',
    image: 'http://i0.kym-cdn.com/entries/icons/facebook/000/021/565/angry.jpg',
    dateCreated: Date,
    songs: [ MiseryBusiness ]
})

const AmHappy = new PlaylistModel({
    title: 'I am a happy camper',
    image: 'https://i.imgur.com/FCAS0cy.jpg',
    dateCreated: Date,
    songs: [ Happy ]
})

const EverybodyHurts = new SongModel({
    title: 'Everybody Hurts',
    artist: 'REM',
    album: 'Automatic for the People',
    albumImage: 'https://images-na.ssl-images-amazon.com/images/I/514L2l8bMvL.jpg',
    genre: 'Alternative/Indie',
    dateAdded: Date
})

const Alone = new SongModel({
    title: 'Alone',
    artist: 'Heart',
    album: 'Bad Animals',
    albumImage: 'https://images-na.ssl-images-amazon.com/images/I/61yOkLYdyuL._SY355_.jpg',
    genre: 'Rock',
    dateAdded: Date
})

const MiseryBusiness = new SongModel({
    title: 'Misery Business',
    artist: 'Paramore',
    album: 'Riot!',
    albumImage: 'https://upload.wikimedia.org/wikipedia/en/2/28/Paramore_-_Riot%21.png',
    genre: 'Alternative/Indie',
    dateAdded: Date
})

const Happy = new SongModel({
    title: 'Happy',
    artist: 'Pharrell',
    album: 'Happy',
    albumImage: 'https://i.pinimg.com/originals/bb/20/6f/bb206f4c1147baa856eb1ab5d9578a5f.jpg',
    genre: 'Pop',
    dateAdded: Date
})

UserModel.remove({})
  .then(() => Johnny.save())
  .then(() => Barb.save())
  .then(() => console.log('Successful Save'))
  .then(() => mongoose.connection.close())
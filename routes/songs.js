const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel, PlaylistModel, SongModel } = require('../db/Schema.js')
const axios = require('axios')

router.get('/', function (req, res) {
    console.log(req.query.search);
    axios.get(`https://api.musixmatch.com/ws/1.1/track.search?apikey=7b7aa74dbe9515ecbe0deae7a9575a78&q_track=${req.query.search}&page_size=15`)
        .then(response => {
            res.send({
                data: response.data
            })
        })
});

router.post('/', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const playlist = await user.playlists.id(req.params.playlistId)
    const newSong = await new SongModel(req.body)
    playlist.songs.push(newSong)
    user.save()
    res.send({
        newSong
    })
})

router.delete('/:songId', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const playlist = await user.playlists.id(req.params.playlistId)
    const song = playlist.songs.id(req.params.songId)
    song.remove()
    user.save()
    res.send({
        playlist
    })
})


module.exports = router
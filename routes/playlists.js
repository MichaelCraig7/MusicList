const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel, PlaylistModel } = require('../db/Schema.js')

router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const playlists = user.playlists
    res.send({
        playlists
    })
})

router.get('/:playlistId', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const playlist = user.playlists.id(req.params.playlistId)
    res.send({
        playlist
    })
})

router.post('/', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const newPlaylist = await new PlaylistModel(req.body)
    user.playlists.push(newPlaylist)
    user.save()
    res.send({
        newPlaylist
    })
})

router.patch('/:playlistId', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const playlist = user.playlists.id(req.params.playlistId)
    playlist.title = req.body.title
    playlist.image = req.body.image
    playlist.dateCreated = req.body.dateCreated
    playlist.songs = req.body.songs
    user.save()
    res.send({
        playlist
    })
})

module.exports = router
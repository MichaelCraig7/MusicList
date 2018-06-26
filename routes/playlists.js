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
    res.send({
        newPlaylist
    })
    console.log('****', newPlaylist)
})

module.exports = router
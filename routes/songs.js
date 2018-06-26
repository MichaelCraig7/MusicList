const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel, PlaylistModel, SongModel } = require('../db/Schema.js')

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
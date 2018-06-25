const express = require('express')
const router = express.Router({mergeParams: true})
const { UserModel, PlaylistModel } = require('../db/Schema.js')

router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const playlists = await user.playlists
    res.send(playlists)

})

module.exports = router
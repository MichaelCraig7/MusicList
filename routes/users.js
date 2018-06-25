var express = require('express')
var router = express.Router()
const { UserModel } = require('../db/Schema.js')

/* GET users listing. */
router.get('/', async (req, res) => {
  const user = await UserModel.find()
  res.send({
    user
  })
});

router.get('/:id', async (req, res) => {
  const showUser = await UserModel.findById(req.params.id)
  res.send({
    showUser
  })
})

router.post('/', async (req, res) => {
  const newUser = await new UserModel(req.body).save()
  res.send({
    newUser
  })
})

router.patch('/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id)
  user.username = req.body.username
  user.password = req.body.password
  user.userImage = req.body.userImage
  const savedUser = await user.save()
  res.send({
    user: savedUser
  })
})

router.delete('/:id', async (req, res) => {
  await UserModel.findByIdAndRemove(req.params.id)
  const findUser = await UserModel.find()
  res.send({
    user: findUser
  })
})
module.exports = router;

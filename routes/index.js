var express = require('express');
const axios = require('axios')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/musix', function (req, res) {
  console.log(req.query.search);
  axios.get(`https://api.musixmatch.com/ws/1.1/track.search?apikey=7b7aa74dbe9515ecbe0deae7a9575a78&q_track=${req.query.search}&page_size=15`)
    .then(response => {
      res.send({
        data: response.data
      })
    })
});

router.post('/musix', async (req, res) => {
  console.log(req.query.search);
  const newUser = await new UserModel(req.body).save()
  res.send({
    newUser
  })
})

module.exports = router;

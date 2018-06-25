require("dotenv").config();
const express = require('express');
const path = require('path');
const logger = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI); //mongodb://localhost/idea-board
// will need to change ‘idea-board’
// will need to change ‘idea-board’
// will need to change ‘idea-board’

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully');
});
// If the connection throws an error
connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

const playlistsRouter = require('./routes/playlists')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/client/build/'));
app.use('/api/users/:userId/playlists', playlistsRouter);
app.use('/api/users', usersRouter);
app.use('/api/index', indexRouter);

app.get('/*', (req,res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})

module.exports = app;
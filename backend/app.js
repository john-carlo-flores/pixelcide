const express = require('express');
const session = require('express-session');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const db = require('./configs/db.config');

const socket = require('./socket');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const cardsRouter = require('./routes/cards');

const app = express();

// Create HTTP server.
const server = http.createServer(app);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionMiddleware = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
});

app.use(sessionMiddleware);
socket(sessionMiddleware, server);

app.use('/', indexRouter(db));
app.use('/users', usersRouter(db));
app.use('/games', gamesRouter(db));
app.use('/cards', cardsRouter(db));

module.exports = { app, server };

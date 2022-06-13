const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const db = require('./configs/db.config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const cardsRouter = require('./routes/cards');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter(db, jwt));
app.use('/users', usersRouter(db));
app.use('/games', gamesRouter(db));
app.use('/cards', cardsRouter(db));

module.exports = app;

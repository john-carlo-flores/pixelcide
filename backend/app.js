var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const db = require("./configs/db.config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cardsRouter = require("./routes/cards");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter(db));
app.use("/cats", usersRouter(db));
app.use("/cards", cardsRouter(db));

module.exports = app;

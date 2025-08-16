var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Bring in the database
require('./app_server/models/db');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var aboutRouter = require('./app_server/routes/about');
var mealsRouter = require('./app_server/routes/meals');
var roomsRouter = require('./app_server/routes/rooms');
var newsRouter = require('./app_server/routes/news');
var contactRouter = require('./app_server/routes/contact');

var app = express();

var hbs = require('hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Set the default layout
app.set('view options', { layout: 'layouts/layout' });

hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Register Handlebars helpers
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/about', aboutRouter);
app.use('/meals', mealsRouter);
app.use('/rooms', roomsRouter);
app.use('/news', newsRouter);
app.use('/contact', contactRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

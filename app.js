var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//ten router
app.use('/us', usersRouter);
var historyRouter = require('./routes/history');
app.use('/shopcart',shoprouter)
var prorouter=require('./routes/product')
app.use('/product',prorouter)
var oderrouter=require('./routes/oder')
app.use('/oder',oderrouter)

const database=require('./config/db')
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
database.connect()        
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

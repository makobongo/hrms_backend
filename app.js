var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const dotenv = require('dotenv');
var helmet = require('helmet');
var compression = require('compression');
var cors = require('cors');
dotenv.config()

// setting default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

// get the default connection
var db = mongoose.connection;

// bind connection to error event(to get notifications of connection errors)
db.on('error', console.error.bind(console, 'mongoDB Connection error'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var applicantRouter = require('./routes/applicant');
var hrRouter = require('./routes/hr');
var suRouter = require('./routes/su');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet())
app.use(cors())
app.use(compression())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/applicant', applicantRouter);
app.use('/hr', hrRouter);
app.use('/su', suRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

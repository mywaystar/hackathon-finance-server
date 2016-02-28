const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const accounts = require('./routes/accounts');
const clients = require('./routes/clients');
const login = require('./routes/login');
const history = require('./routes/history');
const isin = require('./routes/isin');
const resume_history = require('./routes/resume_history');

const mysql = require("./routes/db")

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "content-Type,x-requested-with");
  next();
});

app.use(mysql.init_config);

app.use('/account', accounts);
app.use('/client/resume', resume_history);
app.use('/client', clients.router);
app.use('/login', login);
app.use('/history', history);
app.use('/isin', isin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(404);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .send('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

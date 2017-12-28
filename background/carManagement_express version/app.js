var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/RegisterUser');
var RegisterCar = require('./routes/RegisterCar');


var app = express();


//用於存取資料庫
var mysql = require('mysql');
var config = {
  host: '140.119.163.197',
  port: '3306',
  user: 'root',
  password: 'nccutest',
  database: 'carPlatform'
}

var web3 = require('web3')

var con = mysql.createConnection(config);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db state
app.use(function(req, res, next) {
    req.con = con;
    next();
});

app.use('/', require('./routes/RegisterUser'));
app.use('/index', require('./routes/RegisterUser'));
app.use('/RegisterCar', require('./routes/RegisterCar'));
app.use('/RegisterUser', require('./routes/RegisterUser'));
// app.use('/login2', require('./routes/login2'));
// app.use('/UPDcoursesignals', require('./routes/UPDcoursesignals'));
// app.use('/showUnits', require('./routes/showUnits'));
// app.use('/showReports', require('./routes/showReports'));
// app.use('/test', require('./routes/test'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

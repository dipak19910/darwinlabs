import express from 'express';
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
import Config from "./config";
var index = require('./routes/index');
var users = require('./routes/users');
var Images = require('./routes/Images');
var Search = require('./routes/Search');
var mongoose = require('mongoose');
 mongoose.connect(`mongodb://${Config.MONGO_URL}:27017/${Config.DATABASE}`,error=>{
     console.log(error);
 });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public',express.static(__dirname+ '/public'));
app.use('/local-image',express.static(__dirname + "/local-image", {
    setHeaders: (res, path, stat) => {
        res.set({
            "Connection": "keep-alive",
            "Cache-Control": "max-age=" + (86400000 * 7) + ",public",
            "Expires": new Date(Date.now() + (86400000 * 365)).toUTCString()
        });
    }
}));

app.use((req, res, next) => {
    for (var key in Config) {
        req[key] = Config[key];
        res[key] = Config[key];
    }
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/images', Images);

app.use('/search', Search);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

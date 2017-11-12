var express = require('express');
var http = require('http');
var path = require('path');
var compression = require('compression')
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var favicon = require('serve-favicon');

var sql = require('mssql');
var con = require('./SQLConfig.js');
var connection = new sql.Connection(con.config);
//store the connection
sql.globalConnection = connection;

var app = express();

// all environments
app.set('port', 2525);
app.set('views', path.join(__dirname, 'public/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

var stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public/dist')));
app.use(express.static(path.join(__dirname, 'public/dist')));

// development only
//if ('development' == app.get('env')) {
//    app.use(express.errorHandler());
//}

var index = require('./routes/index.js');

app.use('/', index);

connection.connect(err => {
    if (err) {
        console.log('Failed to open a SQL Database connection.', err.stack);
    }
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});

connection.on('error', function (err) {
    console.log('Sql Connection Error.', err);
});
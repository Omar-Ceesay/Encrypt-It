var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8080;

var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

require('./routes/routes.js')(app);

http.listen(port);
console.log('Server running on port: ' + port);

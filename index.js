var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('client/build'));

var server = http.createServer(app);
server.listen(1337);

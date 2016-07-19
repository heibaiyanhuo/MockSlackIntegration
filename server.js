
var http = require('http');
var express = require('express')
var app = express();

var server = http.createServer(app).listen(9999);

app.use('/', express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
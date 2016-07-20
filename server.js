
var http = require('http');
var express = require('express')
var app = express();

var server = http.createServer(app).listen(9999);

var CommandParser = require('./CommandParser.js')

app.use('/', express.static(__dirname + '/'));

app.all('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/commandParse', function(req, res){
    var cparser = new CommandParser();
    console.log(req.query.commandArray[2]);
    var result = cparser.commandParse(req.query.commandArray);
    return result;
})
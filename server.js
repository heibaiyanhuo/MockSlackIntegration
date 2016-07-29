
var http = require('http');
var express = require('express')
var app = express();

var server = http.createServer(app).listen(9999);

var request = require('request');

var Invoker = require('./Invoker.js');
var CommandParser = require('./CommandParser.js');
var DataParser = require('./DataParser.js');


var invo = new Invoker();
var dparser = new DataParser();


var _under_search = false;
var _under_question = false;
var answerID = [];
var qid = "";

app.use('/', express.static(__dirname + '/'));

app.all('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/commandParse', function(req, res){
    var command = req.query.command;


    var cparser = new CommandParser();
    var options = [];

    cparser.init(command);

    switch(cparser.command) {
        case 'search':  
            options = invo.search(cparser.content);
            getSearchResult(options, res);
            break;
        case 'detail':
            qid = cparser.content;
            options = invo.detail(qid);
            getQuestionDetail(options, res);
            break;
        case 'answer':
            if(_under_question) {
                console.log(answerID);
                if(answerID.length >= 0){
                    options = invo.answer(answerID[0]);
                    getQuestionAnswers(options, res);
                } else {
                    var result = {
                        type: 'noAnswer',
                        content: 'There has been no answer'
                    }
                    res.end(JSON.stringify(result));
                }
            }
            break;
        case 'comment':
            if(_under_question) {

            }
            break;
        case 'more':
            if(_under_search) { 
                if(dparser.displayed == dparser.data.length) {
                    var result = {
                        type: 'noMoreResult',
                        content: 'There is no more result'
                    }
                    res.end(JSON.stringify(result));
                } else {
                    var result = {
                        type: 'moreResult',
                        content: dparser.getInfo()
                    }
                    res.end(JSON.stringify(result));
                }
            }
            break;
        case 'done':
            dparser.init([]);
            _under_search = false;
            _under_question = false;
            var result = {
                type: 'done',
                content: 'You have done your work'
            }
            res.end(JSON.stringify(result));
            break;           
        default:
            var result = {
                type: 'error',
                content: 'Sorry, I cannot understand'
            }
            res.end(JSON.stringify(result));
    }

    


})

function getSearchResult(options, res) {

    _under_search = true;

    request(options, function (error, response, body) {
        var info = JSON.parse(body);

        dparser.init(info.list);
        

        var result = {
            type: 'searchResult',
            content: dparser.getInfo() 
        }

        res.end(JSON.stringify(result));
    })

}

function getQuestionDetail(options, res) {

    _under_question = true;

    request(options, function (error, response, body) {
        var info = JSON.parse(body);
        
        answerID = info.answers;



        var result = {
            type: 'detail',
            content: info
        }

        res.end(JSON.stringify(result));
    })

}

function getQuestionAnswers(options, res) {

    request(options, function (error, response, body) {
        var info = JSON.parse(body);
        
        

        var result = {
            type: 'answer',
            content: info
        }

        res.end(JSON.stringify(result));
    });

}

function CommandParser() {};



CommandParser.prototype.commandParse = function(command) {

    
    var request = require('request');

    var options = {
        url: 'https://ahdev.es.ebay.com/services/v2/question.json?q=' + command[2],
        method: 'GET',
        auth: {
            'user': '',
            'pass': ''
        },
        rejectUnauthorized: false
    }

    
    request(options, function (error, response, body) {

        var info = JSON.parse(body);
        var result =  info.list[1].title;
        
        return result;
    })

}

module.exports = CommandParser;
    var result;
    var request = require('request');

    var options = {
        url: 'https://ahdev.es.ebay.com/services/v2/question.json?q=' + '123',
        method: 'GET',
        auth: {
            'user': 'zdi_support_answerhub@ebay.com',
            'pass': 'zdisupport'
        },
        rejectUnauthorized: false
    }

    
    request(options, function (error, response, body) {

        var info = JSON.parse(body);
        var result = info.list[1].title;
        // console.log();
        // result =  info.list[1].length;

        
        console.log(result);
    })
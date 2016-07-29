function Invoker(){
    this.auth = {
        'user': 'zdi_support_answerhub@ebay.com',
        'pass': 'zdisupport'
    }
}

Invoker.prototype.search = function(text) {
    var options = {
        url: 'https://ahdev.es.ebay.com/services/v2/question.json?q=' + text,
        method: 'GET',
        auth: this.auth,
        rejectUnauthorized: false
    }
    return options;
}

Invoker.prototype.detail = function(qid) {
    var options = {
        url: 'https://ahdev.es.ebay.com/services/v2/question/' + qid + '.json',
        method: 'GET',
        auth: this.auth,
        rejectUnauthorized: false
    }
    return options;
}

Invoker.prototype.answer = function(aid) {
    var options = {
        url: 'https://ahdev.es.ebay.com/services/v2/answer/' + aid + '.json',
        method: 'GET',
        auth: this.auth,
        rejectUnauthorized: false
    }
    return options;
}

Invoker.prototype.qcomment = function(qid) {
    var options = {
        url: 'https://ahdev.es.ebay.com/services/v2/node/' + qid + '/comment.json',
        method: 'GET',
        auth: this.auth,
        rejectUnauthorized: false
    }
    return options;
}

module.exports = Invoker;
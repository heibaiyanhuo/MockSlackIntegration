let chatBlock = $('#chat');



function commandListener() {
    $('#command').keydown(function(event) {
        var chatInput = $(this);
        if (event.keyCode == 13){
            var text = chatInput.val();
            if (text == "") return;
            commandParsePre(text);

            chatInput.val("");
        }

    });

}

function createMessageDiv(text, owner) {
    var content = $('<div>').addClass('media').addClass('message').addClass('newMessage');
    var avatar = $('<div>').addClass('media-left');
    var textarea = $('<div>').addClass('media-body');
    avatar.html('<a href="javascript:void(0)"><img class="media-object" src="resources/img/' + owner +'.png"></a>');

    var now = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
    var time = $('<small>').addClass('media-heading').html('<b>'+ owner + '  </b>' + now);
    var command = $('<div>').html(text);

    textarea.append(time).append(command);
    content.append(avatar).append(textarea);

    chatBlock.append(content);
    chatBlock.scrollTop(chatBlock[0].scrollHeight);
    return;
}

function commandParsePre(command) {



    
    createMessageDiv(command, 'Me');
    switch(command){
        case 'help':
            let text_help = '<h5>Type <b>search</b> to searching for your problems on AnswerHub<h5><br />' + 
                            '<h5>Type <b>commit</b> to commit your problems on AnswerHub</h5><br />' +
                            '<h5>Type <b>more</b> if you want to get more result when searching for a problem</h5><br />' +
                            '<h5>Type <b>done</b> if you want to finish the process of searching or commiting</h5><br />'
            createMessageDiv(text_help, 'AH Bot');
            break;
        case 'clear':
            $('.newMessage').remove();
            return;           
        default:
            sendCommand(command);
            return;
    }
}


function sendCommand(command) {
    $.ajax({
        method: 'GET',
        url: '/commandParse',
        data: {
            'command': command
        },
        success: function (data) {
            var result = JSON.parse(data);
            
            switch(result.type) {
                case 'done':
                case 'error':
                case 'noMoreResult':
                case 'noAnswer':
                    createMessageDiv(result.content, 'AH bot');
                    break;
                case 'searchResult':
                case 'moreResult':
                    let text = '';
                    for(var key in result.content) {
                        text += (key + ':  ' + result.content[key] + '<br />');
                    }
                    createMessageDiv(text, 'AH bot');
                    break;
                case 'detail':
                    createMessageDiv('The question was created by <b>' + result.content.author.username + '</b> on <b>' + result.content.creationDateFormatted + '</b>', 'AH bot');
                    createMessageDiv(result.content.bodyAsHTML, 'AH bot');
                    break;
                case 'answer':
                    let add = '<p>Created by <b>' + result.content.author.username + '</b> on <b>' + result.content.creationDateFormatted + '</b><br />'
                    createMessageDiv(add + result.content.bodyAsHTML, 'AH bot');
                    break;
                default:
                    break;

            }

            
        }
    });
}

Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(document).ready(function() {
        commandListener();

    }
);
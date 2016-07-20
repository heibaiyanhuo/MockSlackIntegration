let chatBlock = $('#chat');

function commandListener() {
    $('#command').keydown(function(event) {
        var chatInput = $(this);
        if (event.keyCode == 13){
            var text = chatInput.val();
            if (text == "") return;
            commandParsePre(text);
            // var now = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
            // block.append(createMessageDiv(text, now));
            // block.scrollTop(block[0].scrollHeight);
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
    var command = $('<p>').html(text);

    textarea.append(time).append(command);
    content.append(avatar).append(textarea);

    chatBlock.append(content);
    chatBlock.scrollTop(chatBlock[0].scrollHeight);
    return;
}

function commandParsePre(command) {
    var commandArray = command.split(' ');
    createMessageDiv(command, 'Me');
    switch(commandArray[0]){
        case 'ah':
            sendCommand(commandArray);
            break;
        case 'clear':
            $('.newMessage').remove();
            return;
        default:
            createMessageDiv('Sorry, I cannot understand', 'AH Bot');
            return;
    }
}


function sendCommand(commandArray) {
    $.ajax({
        method: 'GET',
        url: '/commandParse',
        data: {
            'commandArray': commandArray
        },
        success: function (data) {
            createMessageDiv(data, 'AH bot');
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

function CommandParser() {
    this.command = "";
    this.content = "";
};

CommandParser.prototype.init = function(text) {

    

    this.command = text.split(" ")[0];

    if(this.command.length < text.length){
        this.content = text.substr(this.command.length);
    }
    return;
}

module.exports = CommandParser;
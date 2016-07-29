function DataParser() {
    this.data = [];
    this.displayed = 0;
};


DataParser.prototype.init = function (data) {
    this.data = data;
    this.displayed = 0;
}

DataParser.prototype.getInfo = function(){



    var toDisplay = (5 < (this.data.length - this.displayed))?5:(this.data.length - this.displayed);

    var result = {};


    for(var i = 0; i < toDisplay; i++) {
        result["ID_" + this.data[this.displayed + i].id] = this.data[this.displayed + i].title;
    }

    this.displayed += toDisplay;

    return result;
}


module.exports = DataParser;
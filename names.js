var data = require('./data/emoji.json');

var _names;

module.exports = function getNames(){
    _names = _names || Object.keys(data);
    return _names;
}



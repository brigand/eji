var data = require('./data/emoji.json');
var getNames = require('./names');
var debug = require('debug')('eji-correct');

module.exports = function(input){
    var inputParts = input.split(/[^a-z]+/g).filter(Boolean);
    var lev = require('levenshtein');
    var names = getNames();

    // help lev out by checking for existence of the name in a segment
    var score = function(name, distance){
        var nameParts = name.split(/[^a-z]+/g).filter(Boolean);
        var x = distance;
        debug('scoring ' + name + ' for input ' + input + ' with lev ' + distance);
        if (nameParts.indexOf(input) !== -1) {
            x = x / 2 - 3;
            debug('nameParts: ' + JSON.stringify(nameParts));
            debug('input in nameParts, adjusted to ' + x);
        }

        var index = name.indexOf(input);
        var startsWith = index === 0;
        var endsWith = index !== -1 && index === name.length - input.length;
        if (startsWith || endsWith) {
            debug('startsWith: ' + startsWith);
            debug('endsWith: ' + endsWith);
            x -= input.length;
            debug('adjusted to ' + x);
        }
        return x;
    };

    var distances = names.map(function(name) {
        return [name, Number(new lev(input, name))];
    })
    .sort(function(x, y) {
       return score(x[0], x[1]) - score(y[0], y[1]); 
    });
    return distances.slice(0, 10).map(function(parts){ return parts[0]; });
}


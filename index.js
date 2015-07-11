var data = require('./data/emoji.json');
var getNames = require('./names');
var utils = require('./utils');
var correct = require('./correct');

function isEmoji(str) {
    if (str[0] >= 'a' && str[1] <= 'z') return false;
    return true;
}

module.exports = function convert(rawInput){
    var input = rawInput.toLowerCase().trim();

    var res = isEmoji(input) ? emojiToName(input) : nameToEmoji(input);
    display(res);
}

function emojiToName(input){
    var names = getNames();
    var name = utils.find(names, function(name){
        return data[name] === input;
    });

    return {input: input, match: name, type: 'name', alternatives: []};
}

function nameToEmoji(input){
    var result = data[input];
    var alternatives = correct(input);
    return {input: input, match: result, type: 'emoji', alternatives: alternatives};
}

var write = function(s){ process.stderr.write(s) };
var writePrimary = function(s){
    if (!process.stdout.isTTY) write(s);
    process.stdout.write(s);
};

var line = function(){ process.stderr.write('\n') };

function display(res) {
    if (res.type === 'emoji') {
        if (res.match) {
            write('This is what you\'re looking for: ');
            writePrimary(res.match); 
            line(); line();
            write('But maybe also these:'); line();
            displayAlternatives(res.alternatives);
        }
        else {
            write('Not sure what a "' + res.input + '" is. ');
            write('Maybe you meant one of these:');
            line();
            displayAlternatives(res.alternatives);
            process.exit(1);
        }
    }
    else if (res.type === 'name') {
        if (res.match) {
            write('The code for this emoji is ');
            writePrimary(':' + res.match + ':');
            line();
        }
        else {
            write('I\'m not an expert but "' + res.input + '" doesn\'t ');
            write('look like an emoji to me');
            line();
            process.exit(1);
        }
    }
}


function displayAlternatives(alternatives){
    if (!alternatives || !alternatives.length) return;

    var maxNameLength = alternatives.reduce(function(a, b){
        return Math.max(a, b.length);
    }, -Infinity);

    var rightPad = function(s){
        return s + Array(maxNameLength + 4 - s.length).join(' ');
    }
    alternatives.forEach(function(name) {
        write(' - ');
        write(rightPad(name));
        write(data[name]);
        line();
    });
}


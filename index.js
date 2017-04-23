/**
 * Usage: index.js [Count]
 *
 * Where Count, optional, is a number > 1
 */

'use strict';

const _ = require('lodash');

const charCodeA = "A".charCodeAt(0);

function generateRandomInteger(exclusiveMax) {
    return Math.floor(Math.random() * exclusiveMax);
}

function generateRandomDigit() {
    return generateRandomInteger(10);
}

function generateRandomLetter() {
    return String.fromCharCode(charCodeA + generateRandomInteger(26));
}

function generateRandomName() {
    return [
        generateRandomLetter(), generateRandomDigit(),
        generateRandomLetter(), generateRandomDigit(),
    ].join('');
}

function generateUniqueRandomNames(count, letterBlacklist=[]) {
    let names = [], name;

    for (let i = 0, tries = 0, maxTries = 10 * count;
         i < count && tries < maxTries;
         i++, tries++) {

        name = generateRandomName();

        // If we don't like this name for some reason, skip it
        if ((name.indexOf('O') >= 0 && name.indexOf('0') >= 0)  // have both 'O' and '0'
            || _.sum(letterBlacklist, letter => 1 + name.indexOf(letter)) > 0  // found blacklisted letter
            || _.indexOf(names, name) >= 0) {  // already have this name

            // Skip this name, generate a new one
            i--;
            continue;
        }
        names.push(name);
    }
    return names;
}

/*
 * Main
 */

let count = Math.max(1, parseInt(process.argv[2] || 10)),
    blacklist = ['W'],  // 3-syllable letters are no fun
    names = generateUniqueRandomNames(count, blacklist);

console.log('\nRobot names:\n');
console.log(_.map(names, name => '  '+name+'\n').join(''));

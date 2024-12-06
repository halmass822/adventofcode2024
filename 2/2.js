const fs = require("fs");
const readline = require("readline");

const filepath = "./2.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

function isSafe(input) {
    const levels = input.match(/\d+/g).map(x => +x);
    let isSafe = true;
    let prevLevel;
    let prevDir = null;
    for(let i in levels) {
        if(!prevLevel) {
            prevLevel = levels[i];
        } else {
            const diff = Math.abs(levels[i] - prevLevel);
            const currentDir = levels[i] > prevLevel;
            if( diff > 3 || diff < 1 || (prevDir !== null && prevDir !== currentDir)) { //checks difference and direction, ignoring inital prevdir state of null
                isSafe = false;
                break;
            }
            prevDir = currentDir;
            prevLevel = levels[i];
        }
    }
    return isSafe;
}

function isSafe2(input) {
    const levels = input.match(/\d+/g).map(x => +x);
    let badLevels = 0;
    let prevLevel;
    let prevDir = null;
    for(let i in levels) {
        if(!prevLevel) {
            prevLevel = levels[i];
        } else {
            const diff = Math.abs(levels[i] - prevLevel);
            const currentDir = levels[i] > prevLevel;
            if( diff > 3 || diff < 1 || (prevDir !== null && prevDir !== currentDir)) { //checks difference and direction, ignoring inital prevdir state of null
                badLevels++;
                // console.log(levels[i]);
            } else {
                prevDir = currentDir;
                prevLevel = levels[i];
            }
        }
    }
    if(badLevels > 1) console.log(input, badLevels);
    return badLevels <= 1 ? true : false;
}

let counter = 0;
let counter2 = 0;

rl.on('line', (line) => {
    if(isSafe(line)) {
        counter ++;
    } 
    if(isSafe2(line)) {
        counter2 ++;
    }
})

rl.on('close', () => {
    console.log(counter);
    console.log(counter2);
})
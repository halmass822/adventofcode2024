const fs = require("fs");
const readline = require("readline");

const filepath = "./3eg.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

function parseInput(input) {
    const commands = input.match(/mul\(\d+,\d+\)/g);
    let counter = 0;
    commands.forEach((x) => counter += Number(x.match(/\d+/g)[0]) * Number(x.match(/\d+/g)[1]) );
    return counter;
}

function parseInput2(input) {
    const commands = input.match( /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g );
    console.log(commands);
    let counter = 0;
    let doInstruction = true;
    for(let i in commands) {
        const command = commands[i];
    }
}

let counter = 0;

rl.on('line', (line) => {
    counter += parseInput2(line);
});

rl.on('close', () => {
    console.log(counter);
});
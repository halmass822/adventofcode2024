const fs = require("fs");
const readline = require("readline");

const filepath = "./3.txt";
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
    let counter = 0;
    let doInstruction = true;
    for(let i in commands) {
        const command = commands[i];
        if(command === "do()") {
            doInstruction = true;
            console.log("commands enabled");
        } else if(command === "don't()") {
            doInstruction = false
            console.log("commands disabled");
        } else {
            if(doInstruction) {
                counter += ( Number(command.match(/\d+/g)[0]) * Number(command.match(/\d+/g)[1]) );
                console.log(command, "enabled");
            } else {
                console.log(command, " disabled");
            }
        }
        command === "do()" ? doInstruction = true :
        command === "don't()" ? doInstruction = false :
        doInstruction ? counter += ( Number(command.match(/\d+/g)[0]) * Number(command.match(/\d+/g)[1]) ) : console.log(command, " disabled");
    }
    return counter;
}

let counter = 0;

rl.on('line', (line) => {
    counter += parseInput2(line);
});

rl.on('close', () => {
    console.log(counter);
});
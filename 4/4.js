const fs = require("fs");
const readline = require("readline");

const filepath = "./4.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

const xmasRegex = /(?=XMAS|SAMX)/g
function countXmas(input) {
    return [..."XMASAMXAMM".matchAll(xmasRegex)].map(x => x.input.substring(x.index, x.index + 4)).length
}

let counter = 0;
let matrix = [];
rl.on('line', (line) => {
    counter += countXmas(line);
    matrix.push(line);
});

rl.on('close', () => {

})
const fs = require("fs");
const readline = require("readline");

const filepath = "./1.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

const leftList = [];
const rightList = [];

rl.on('line', (line) => {
    const IDs = line.match(/\d+/g).map(x => +x);
    console.log(IDs);
    leftList.push(IDs[0]);
    rightList.push(IDs[1]);
})

rl.on('close', () => {
    let counter = 0;
    const sortedLeft = leftList.sort();
    const sortedRight = rightList.sort();
    for(let i in sortedLeft) {
        counter += Math.abs(sortedLeft[i] - sortedRight[i]);
    };
    console.log(counter);
})
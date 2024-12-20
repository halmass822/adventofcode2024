const fs = require("fs");
const readline = require("readline");

const filepath = "./5.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

class pageOrderRule {
    constructor(inputString) {
        [this.firstPage, this.secondPage] = inputString.match(/\d+/g);
    }

    checkOrder(inputPages) {
        if(!inputPages.includes(this.firstPage) || !inputPages.includes(this.secondPage)) return true;
        return inputPages.indexOf(this.firstPage) < inputPages.indexOf(this.secondPage);
    }
}

const rules = [];
let counter = 0;

rl.on('line', (line) => {
    if(line.includes("|")) {
        rules.push(new pageOrderRule(line));
    } else if(line !== "") {
        if(rules.every((rule) => rule.checkOrder(line))) {
            const pages = line.match(/\d+/g);
            counter += Number( pages[Math.floor(pages.length / 2)] );
            // counter += Number( line.match(/\d+/g)[Math.floor(line.length / 2)] )
        }
    }
});

rl.on('close', () => {
    console.log(counter);
})
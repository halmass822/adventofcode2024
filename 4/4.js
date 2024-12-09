const fs = require("fs");
const readline = require("readline");

const filepath = "./4eg.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

const xmasRegex = /(?=XMAS|SAMX)/g
function countXmas(input) {
    return [...input.matchAll(xmasRegex)].map(x => x.input.substring(x.index, x.index + 4)).length;
};

function generateStringsFromVertical(inputArray) {
    let outputArray = [];
    let arrayHeight = inputArray.length;
    let arrayWidth = inputArray[0].length;
    for(let i = 0; i < arrayWidth; i++) {
        let generatedString = "";
        for(let j = 0; j < arrayHeight; j++) {
            generatedString += inputArray[j].substring(i, i + 1);
        };
        outputArray.push(generatedString);
    }
    return outputArray;
}

function generateStringsFromDiagonal(inputArray) {
    //first index will be 3, ends at array width - 4
    //vertical index will -- until 0, horizontal index will ++ until it equals starting vertical index
    let outputArray = [];
    let arrayHeight = inputArray.length;
    let arrayWidth = inputArray[0].length;
    //top left to bottom left
    for(let i = arrayHeight - 1; i >= 3; i--) {
        let generatedString = "";
        for(let j = 0; j <= i; j++) {
            generatedString += inputArray[i - j].substring(j,j + 1);
        }
        console.log(generatedString);
        outputArray.push(generatedString);
    };
    
}

let counter = 0;
let matrix = [];
rl.on('line', (line) => {
    counter += countXmas(line);
    matrix.push(line);
});

rl.on('close', () => {
    console.log(counter);
    const verticalStrings = generateStringsFromVertical(matrix);
    const diagonalStrings = generateStringsFromDiagonal(matrix);
    console.log(verticalStrings);
    for(let i = 0; i < verticalStrings.length; i++) {
        counter += countXmas(verticalStrings[i]);
    };
    console.log(counter);
})
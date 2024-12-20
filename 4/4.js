const fs = require("fs");
const readline = require("readline");

const filepath = "./4.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

const xmasRegex = /(?=XMAS|SAMX)/g
function countXmas(input) {
    const result = [...input.matchAll(xmasRegex)].map(x => x.input.substring(x.index, x.index + 4)).length;
    if(Math.random() > 0.95) console.log(input, result); //for randomly logging 5% of the results
    return result;
};

function countXmasVertical(inputArray) {
    let arrayHeight = inputArray.length;
    let arrayWidth = inputArray[0].length;
    let counter = 0;
    for(let i = 0; i < arrayWidth; i++) {
        let generatedString = "";
        for(let j = 0; j < arrayHeight; j++) {
            generatedString += inputArray[j].substring(i, i + 1);
        };
        counter += countXmas(generatedString);
    }
    return counter;
}

function countXmasDiagonal(inputArray) {

    const arrayHeight = inputArray.length;
    const arrayWidth = inputArray[0].length;

    let counter = 0;

    for(let i = 0; i < arrayHeight; i++) { //loop will analyze starting at each corner
        let generatedStrings = ["", "", "", ""]; //one string for each corner
        for(let j = 0; j <= i; j++) {
            generatedStrings[0] += inputArray[i - j].substring(j, j + 1); //topleft corner
            generatedStrings[1] += inputArray[i - j].substring(arrayWidth - 1 - j, arrayWidth - j); //topright corner
            if(i !== 9) { //ignores the duplicates generated at the end
                generatedStrings[2] += inputArray[arrayHeight - 1 - i + j].substring(j, j + 1); //bottom left corner
                generatedStrings[3] += inputArray[arrayHeight - 1 - i + j].substring(arrayWidth - 1 - j, arrayWidth - j); //bottom right corner
            }
        }

        for(let i in generatedStrings) {
            counter += countXmas(generatedStrings[i]);
        }
    }

    return counter;

}



let counter = 0;
let matrix = [];

rl.on('line', (line) => {
    counter += countXmas(line);
    matrix.push(line);
});

rl.on('close', () => {
    counter += countXmasVertical(matrix);
    counter += countXmasDiagonal(matrix);

    console.log("total", counter);
})
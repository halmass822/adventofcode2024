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
    // //first index will be 3, ends at array width - 4
    // //vertical index will -- until 0, horizontal index will ++ until it equals starting vertical index
    // let outputArray = [];
    // const arrayHeight = inputArray.length;
    // const arrayWidth = inputArray[0].length;

    // //bottom left to top right step 1
    // for(let i = arrayHeight - 1; i >= 3; i--) {
    //     let generatedString = "";
    //     for(let j = 0; j <= i; j++) {
    //         generatedString += inputArray[i - j].substring(j,j + 1);
    //     }
    //     outputArray.push(generatedString);
    // };

    // //step 2
    // for(let i = 1; i <= arrayWidth - 4; i++) {
    //     let generatedString = "";
    //     for(let j = 0; j <= arrayHeight - i; j++) {
    //         generatedString += inputArray[arrayHeight - 1 - j].substring(i + j, i + j + 1);
    //     }
    //     outputArray.push(generatedString);
    // };

    // console.log(outputArray);

    const arrayHeight = inputArray.length;
    const arrayWidth = inputArray[0].length;
    
    //diagonal in the upwards-right direction

    for(let i = 0; i < arrayHeight; i++) {
        let generatedString1 = ""; //for the upwards-right direction
        let generatedString2 = ""; //for the upwards-left direction
        const iOperand = i % 10; //increments each step below the matrix
        for(let j = 0; j <= i && i < arrayHeight; j++) {
            console.log(i,j);
            generatedString1 += inputArray[i - j].substring(j, j + 1);
            // console.log(inputArray[arrayHeight - 1 - j]);
            console.log(inputArray[arrayHeight - 1 - j].substring(arrayWidth - 1 - j, arrayWidth - j))
            // generatedString2 += inputArray[arrayHeight - 1 - i - j].substring(arrayWidth - 1 - j, arrayWidth - j);
        }
        // for(let j = 1; i >= arrayHeight && j + iOperand < arrayHeight; j++) { // bottom left to bottom right
        //     generatedString1 += inputArray[arrayHeight - j].substring(j + iOperand,j + iOperand + 1);
        // }
        // console.log("hmm", generatedString1);
        // console.log("hmmmm",generatedString2);

    }

} //9,1 8,2 8,3



let counter = 0;
let matrix = [];
rl.on('line', (line) => {
    counter += countXmas(line);
    matrix.push(line);
});

rl.on('close', () => {
    const verticalStrings = generateStringsFromVertical(matrix);
    const diagonalStrings = generateStringsFromDiagonal(matrix);
    for(let i = 0; i < verticalStrings.length; i++) {
        counter += countXmas(verticalStrings[i]);
    };
})
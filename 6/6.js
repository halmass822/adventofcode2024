const { exit } = require("process");

const fs = require("fs");
const readline = require("readline");

const filepath = "./6eg.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

function getNewCoords(currentCoords, direction) {
    switch (direction) {
        case "N":
            return [currentCoords[0],currentCoords[1] + 1];
        case "E":
            return [currentCoords[0] + 1,currentCoords[1]];
        case "S":
            return [currentCoords[0],currentCoords[1] - 1];
        case "W":
            return [currentCoords[0] - 1,currentCoords[1]];
        default:
            throw new Error("Invalid guard direction input");
    }
};

function checkIfCoordObstructed(matrix, coords) {
    if(matrix[coords[1]].charAt(coords[0]) === "#") return true;
};

const directionsArray = ["W","S","E","N"] //to handle turning left

function patrol(initialCoords, matrix) {
    const matrixWidth = matrix[0].length;
    const matrixHeight = matrix.length;
    let currentCoords = initialCoords;
    let guardDirection = "N";

    let visitedCoords = [];

    setTimeout(() => { //10 second timeout
        exit();
    }, 10000);

    do {
        const newCoords = getNewCoords(currentCoords, guardDirection);
        if(checkIfCoordObstructed(newCoords)) {
            currentCoords = directionsArray[directionsArray.indexOf(guardDirection) - 1 % 4];
        }
        
    } while (currentCoords[0] < matrixHeight && currentCoords[1] < matrixWidth);
};

let matrix = [];
let lineCounter = 0;
let initialCoords;

rl.on('line', (line) => {
    const guardPosition = line.indexOf("^");
    if(guardPosition > 0) initialCoords = [guardPosition, lineCounter];
    matrix.push(line);
    lineCounter++
});

rl.on('close', () => {
    console.log(initialCoords, matrix);
})

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

function checkIfCoordObstructed(inputMatrix, coords) {
    console.log(inputMatrix, coords);
    if(inputMatrix[coords[1]].charAt(coords[0]) === "#") return true;
};

const directionsArray = ["W","S","E","N"] //to handle turning left

function patrol(initialCoords, inputMatrix) {
    const matrixWidth = matrix[0].length;
    const matrixHeight = matrix.length;
    let currentCoords = initialCoords;
    let guardDirection = "N";

    let visitedCoords = [];

    setTimeout(() => { //10 second timeout
        console.log("loop timed out!");
        exit();
    }, 10000);

    do {
        console.log(currentCoords, guardDirection);
        const newCoords = getNewCoords(currentCoords, guardDirection);
        if(currentCoords[0] >= matrixHeight && currentCoords[1] >= matrixWidth) console.log("foo");
        if(checkIfCoordObstructed(inputMatrix, newCoords)) {
            guardDirection = directionsArray[directionsArray.indexOf(guardDirection) - 1 % 4];
            console.log("obstruction at ", newCoords, "\nnew direction: ", guardDirection);
        } else {
            if(visitedCoords.find(x => x[0] === newCoords[0] && x[1] === newCoords[1])) visitedCoords.push(newCoords);
            currentCoords = newCoords;
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
    patrol(initialCoords, matrix);
})

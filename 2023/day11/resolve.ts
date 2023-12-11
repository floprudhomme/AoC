import fs from "fs";

const content = (await fs.promises.readFile("./input.txt", {
    encoding: "utf-8",
})).replaceAll("\r", "");


type Position = {
    x: number,
    y: number
}


let galaxiesPosition: Position[] = [];

let board = content.split("\n").map(line => line.split(""));

let lineIdxWithoutGalaxy: number[] = [];
let columnIdxWithoutGalaxy: number[] = [];


function expandUniverse() {
    for (let i = 0; i < board.length; i++) {
        if (!board[i].includes("#")) {
            lineIdxWithoutGalaxy.push(i);
        }
    }
    for (let x = 0; x < board[0].length; x++) {
        let columnWithGalaxy = false;
        for (let y = 0; y < board.length; y++) {
            if (board[y][x] === "#") {
                columnWithGalaxy = true;
                break;
            }
        }
        if (!columnWithGalaxy) {
            columnIdxWithoutGalaxy.push(x);
        }
    }
}

function getAllGalaxiesPositions() {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] === "#") {
                galaxiesPosition.push({ x, y });
            }
        }
    }
}

function calcDistance(from: Position, to: Position, expand: number): number {
    let maxY = Math.max(from.y, to.y);
    let minY = Math.min(from.y, to.y);
    let maxX = Math.max(from.x, to.x);
    let minX = Math.min(from.x, to.x);
    return (maxY - minY) + (lineIdxWithoutGalaxy.filter(elt => elt > minY && elt < maxY).length * (expand - 1)) + (maxX - minX) + (columnIdxWithoutGalaxy.filter(elt => elt > minX && elt < maxX).length * (expand - 1));
}

function part1(expand: number) {


    let distances: number[] = [];
    for (let startGalaxy = 0; startGalaxy < galaxiesPosition.length; startGalaxy++) {
        for (let endGalaxy = startGalaxy + 1; endGalaxy < galaxiesPosition.length; endGalaxy++) {
            let currentDistance = calcDistance(galaxiesPosition[startGalaxy], galaxiesPosition[endGalaxy], expand);
            distances.push(currentDistance);
        }
    }
    
    return distances.reduce((a, b) => a + b);
}

expandUniverse();
getAllGalaxiesPositions();

console.log("Part 1 : " + part1(2));
console.log("Part 2 : " + part1(1000000));


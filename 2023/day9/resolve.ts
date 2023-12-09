import fs from "fs";

const content = (await fs.promises.readFile("./input.txt", {
    encoding: "utf-8",
})).replaceAll("\r", "");

function part1(isPart2: boolean = false) {
    function checkIfZeros(currentCalc: number[][]): boolean {
        for (let elt of currentCalc[currentCalc.length - 1]) {
            if (elt !== 0) {
                return false;
            }
        }
        return true;
    }

    let sum = 0;
    let lines = content.split("\n");
    let calcsList: number[][][] = [];
    lines.forEach(elt => calcsList.push([elt.split(" ").map(c => Number(c))]));
    for (let i = 0 ; i < calcsList.length ; i++) {
        let currentCalc = calcsList[i];
        while (!checkIfZeros(currentCalc)) {
            let newLine = [];
            for (let j = 0 ; j < currentCalc[currentCalc.length - 1].length - 1 ; j++) {
                newLine.push(currentCalc[currentCalc.length - 1][j + 1] - currentCalc[currentCalc.length - 1][j]);
            }
            currentCalc.push(newLine);
        }
        currentCalc[currentCalc.length - 1].push(0);
        for (let i = currentCalc.length - 2 ; i >= 0 ; i--) {
            if (isPart2) {
                currentCalc[i].unshift(currentCalc[i][0] - currentCalc[i + 1][0]);
            } else {
                currentCalc[i].push(currentCalc[i][currentCalc[i].length - 1] + currentCalc[i + 1][currentCalc[i + 1].length - 1]);
            }
        }
    }
    
    if (isPart2) {
        sum = calcsList.map(elt => elt[0][0]).reduce((a,b) => a + b);
    } else {
        sum = calcsList.map(elt => elt[0][elt[0].length - 1]).reduce((a,b) => a + b);
    }
    return sum;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part1(true));


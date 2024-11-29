import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    let map: Record<number, Record<number, number>> = {0: {0: 1}};
    let currentPos: number[] = [0, 0];
    for (let move of content) {
        if (move === ">") {
            currentPos[0]++;
        } else if (move === "<") {
            currentPos[0]--;
        } else if (move === "^") {
            currentPos[1]++;
        } else if (move === "v") {
            currentPos[1]--;
        }

        if (map[currentPos[0]] === undefined) {
            map[currentPos[0]] = {};
        }
        
        if (map[currentPos[0]][currentPos[1]] === undefined) {
            map[currentPos[0]][currentPos[1]] = 0;
        }
        map[currentPos[0]][currentPos[1]]++;
    }
    
    return Object.values(map).reduce((acc, elt) => acc + Object.keys(elt).length, 0);
}

function part2() {
    let map: Record<number, Record<number, number>> = {0: {0: 1}};
    let currentPos: number[][] = [[0, 0], [0, 0]];
    let turn = 0;
    for (let move of content) {
        if (move === ">") {
            currentPos[turn][0]++;
        } else if (move === "<") {
            currentPos[turn][0]--;
        } else if (move === "^") {
            currentPos[turn][1]++;
        } else if (move === "v") {
            currentPos[turn][1]--;
        }

        if (map[currentPos[turn][0]] === undefined) {
            map[currentPos[turn][0]] = {};
        }
        
        if (map[currentPos[turn][0]][currentPos[turn][1]] === undefined) {
            map[currentPos[turn][0]][currentPos[turn][1]] = 0;
        }
        map[currentPos[turn][0]][currentPos[turn][1]]++;
        turn = (turn + 1) % 2;
    }
    
    return Object.values(map).reduce((acc, elt) => acc + Object.keys(elt).length, 0);
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
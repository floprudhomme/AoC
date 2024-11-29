import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    let step = 0;
    for (let i = 0; i < content.length; i++) {
        if (content[i] === '(') {
            step++;
        } else if (content[i] === ')') {
            step--;
        }
    }
    return step;
}

function part2() {
    let step = 0;
    for (let i = 0; i < content.length; i++) {
        if (content[i] === '(') {
            step++;
        } else if (content[i] === ')') {
            step--;
        }
        if (step < 0) {
            return i + 1;
        }
    }
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
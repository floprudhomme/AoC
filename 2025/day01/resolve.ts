import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    const lines = content.split("\n");
    let current = 50;
    let total = 0;
    for (const line of lines) {
        const direction = line[0];
        const change = parseInt(line.slice(1));
        if (direction === "L") {
            current -= change;
        } else if (direction === "R") {
            current += change;
        }
        current = current % 100;
        if (current === 0) {
            total++;
        }
    }
    return total;
}

function part2() {
    return 0;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
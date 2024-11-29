import fs from "fs";
import crypto from "crypto";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    let i = 0;
    while (true) {
        const hash = crypto.createHash('md5').update(content + i).digest('hex');
        if (hash.startsWith("00000")) {
            break;
        }
        i++;
    }
    
    return i;
}

function part2() {
    let i = 0;
    while (true) {
        const hash = crypto.createHash('md5').update(content + i).digest('hex');
        if (hash.startsWith("000000")) {
            break;
        }
        i++;
    }
    
    return i;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
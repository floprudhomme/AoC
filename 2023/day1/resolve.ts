import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    let lines = content.split("\n");
    let sum = 0; 
    for (let line of lines) {
        var ptrn = /[0-9]/mg;

        var match;
        let matched = []
        while ((match = ptrn.exec(line)) != null) {
            matched.push(match)
        }
        sum += Number(matched[0][0] + matched[matched.length - 1][0])
    }
    return sum;
}

function part2() {
    const map: Record<string, string> = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    }
    let lines = content.split("\n");
    let sum = 0;
    
    for (let line of lines) {
        let modifiedLine = line;
        for (let key in map) {
            modifiedLine = modifiedLine.replaceAll(key, key + map[key] + key);
        }
        var ptrn = /[0-9]/mg;

        var match;
        let matched = []
        while ((match = ptrn.exec(modifiedLine)) != null) {
            matched.push(match)
        }
        sum += Number(matched[0][0] + matched[matched.length - 1][0])
    }
    return sum;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
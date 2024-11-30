import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    let lines = content.split("\n");
    let nbNice = 0;
    for (let line of lines) {
        let nice = true;
        let vowels = 0;
        let haveDoubleLetter = false;
        for (let letterIdx = 0 ; letterIdx < line.length ; letterIdx++) {
            if ((line[letterIdx] === "a" && letterIdx < line.length - 1 && line[letterIdx + 1] === "b")
                || (line[letterIdx] === "c" && letterIdx < line.length - 1 && line[letterIdx + 1] === "d")
                || (line[letterIdx] === "p" && letterIdx < line.length - 1 && line[letterIdx + 1] === "q")
                || (line[letterIdx] === "x" && letterIdx < line.length - 1 && line[letterIdx + 1] === "y")) {
                nice = false;
                break;
            }

            if (letterIdx < line.length - 1 && line[letterIdx] === line[letterIdx + 1]) {
                haveDoubleLetter = true;
            }

            if ("aeiou".includes(line[letterIdx])) {
                vowels++;
            }
        }

        if (nice && vowels >= 3 && haveDoubleLetter) {
            nbNice++;
        }
    }
    
    return nbNice;
}

function part2() {
    let lines = content.split("\n");
    let nbNice = 0;
    for (let line of lines) {
        let haveDoublePair = false;
        let haveRepeatLetter = false;
        for (let letterIdx = 0 ; letterIdx < line.length - 1 ; letterIdx++) {
            for (let j = letterIdx + 2 ; j < line.length ; j++) {
                if (line[letterIdx] === line[j] && line[letterIdx + 1] === line[j + 1]) {
                    haveDoublePair = true;
                    break;
                }
            }
            if (letterIdx < line.length - 2 && line[letterIdx] === line[letterIdx + 2]) {
                haveRepeatLetter = true;
            }
        }

        if (haveDoublePair && haveRepeatLetter) {
            nbNice++;
        }
    }
    return nbNice;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
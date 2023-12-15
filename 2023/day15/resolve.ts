import fs from "fs";

const content = (await fs.promises.readFile("./input.txt", {
    encoding: "utf-8",
})).replaceAll("\r", "");

function calcHash(str: string): number {
    let sumStr = 0;
    for (let i = 0 ; i < str.length ; i++) {
        sumStr += str.charCodeAt(i);
        sumStr *= 17;
        sumStr %= 256;
    }
    return sumStr;
}

function part1() {
    return content.split(",").map(elt => calcHash(elt)).reduce((a, b) => a + b, 0);
}

type Lens = {
    label: string;
    focal: number;
}
type Box = Lens[];

function part2() {
    let elts = content.split(",");
    let sum = 0;

    let boxes: Box[] = Array.from(new Array(256), () => []);

    for (let elt of elts) {
        if (elt.indexOf("=") >= 0) {
            let label = elt.split("=")[0];
            let focal = Number(elt.split("=")[1]);

            let boxId = calcHash(label);
            let currentLabelIdx = boxes[boxId].findIndex(elt => elt.label === label);
            if (currentLabelIdx >= 0) {
                boxes[boxId][currentLabelIdx].focal = focal;
            } else {
                boxes[boxId].push({ label, focal });
            }
        } else if (elt.indexOf("-") >= 0) {
            let label = elt.split("-")[0];
            let boxId = calcHash(label);
            let currentLabelIdx = boxes[boxId].findIndex(elt => elt.label === label);
            if (currentLabelIdx >= 0) {
                boxes[boxId].splice(currentLabelIdx, 1);
            }
        }
    }

    for (let boxIdx = 0 ; boxIdx < boxes.length ; boxIdx++) {
        for (let lensIdx = 0 ; lensIdx < boxes[boxIdx].length ; lensIdx++) {
            sum += (boxIdx + 1) * (lensIdx + 1) * boxes[boxIdx][lensIdx].focal;
        }
    }

    return sum;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());


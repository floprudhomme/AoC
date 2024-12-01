import fs from "fs";

const content: string = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    let lines: string[] = content.split("\n");
    let leftList: number[] = [];
    let rightList: number[] = [];
    for (let line of lines) {
        let [value1, value2] = line.match(/\d+/g)!.map((x) => parseInt(x));
        leftList.push(value1);
        rightList.push(value2);
    }
    leftList = leftList.sort((a, b) => a - b);
    rightList = rightList.sort((a, b) => a - b);
    
    let distance = 0;
    for (let i = 0 ; i < leftList.length ; i++) {
        distance += Math.abs(leftList[i] - rightList[i]);
    }
    return distance;
}

function part2() {
    let lines: string[] = content.split("\n");
    let list: Record<string, Record<number, number>> = {
        "left": {},
        "right": {}
    };
    for (let line of lines) {
        let [value1, value2] = line.match(/\d+/g)!.map((x) => parseInt(x));
        if (list["left"][value1] === undefined) {
            list["left"][value1] = 0;
        }
        if (list["right"][value2] === undefined) {
            list["right"][value2] = 0;
        }
        list["left"][value1]++;
        list["right"][value2]++;
    }

    let similarityScore = 0;
    for (let value of Object.keys(list["left"]).map(x => parseInt(x))) {
        let rightOcc = list["right"][value] || 0;
        similarityScore += list["left"][value] * (value * rightOcc);
    }

    return similarityScore;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
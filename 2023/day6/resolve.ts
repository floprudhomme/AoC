import fs from "fs";

const content = (await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
})).replaceAll("\r", "");

function part1(replaceValue: string) {
    let values: number[][] = [];
    for (let line of content.split("\n")) {
        let elts = line.split(":")[1].replaceAll(/[ ]+/gm, replaceValue).trim().split(" ");
        let i = 0;
        for (let elt of elts) {
            if (values[i] == undefined) {
                values.push([Number(elt)]);
            } else {
                values[i].push(Number(elt));
            }
            i++;
        }
    }

    return values.map(elt => {
        let sum = 0;
        for (let i = 0 ; i < elt[0] ; i++) {
            if (i * (elt[0] - i) > elt[1]) {
                sum++;
            } 
        }
        return sum;
    }).reduce((a,b) => a * b);
}

console.log("Part 1 : " + part1(" "));
console.log("Part 2 : " + part1(""));
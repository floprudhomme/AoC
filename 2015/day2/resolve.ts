import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    const lines = content.split("\n");

    let totalPaper = 0;
    for (let line of lines) {
        let dimensions = line.split("x");
        let l = parseInt(dimensions[0]);
        let w = parseInt(dimensions[1]);
        let h = parseInt(dimensions[2]);

        let sides = [l * w, w * h, h * l];
        sides.sort((a, b) => a - b);

        let paper = 2 * sides[0] + 2 * sides[1] + 2 * sides[2] + sides[0];

        totalPaper += paper;
    }
    return totalPaper;
}

function part2() {
    const lines = content.split("\n");

    let totalRibbon = 0;
    for (let line of lines) {
        let dimensions = line.split("x").map(elt => parseInt(elt)).sort((a, b) => a - b);
        let ribbon = dimensions[0] * 2 + dimensions[1] * 2 + dimensions[0] * dimensions[1] * dimensions[2];

        totalRibbon += ribbon;
    }
    return totalRibbon;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
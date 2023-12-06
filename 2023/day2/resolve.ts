import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});
const lines = content.split("\n");

function part1() {
    const ballsAvailable: Record<string, number> = {
        "blue": 14,
        "green": 13,
        "red": 12
    }
    let sumIds = 0;
    for (const line of lines) {
        const id = line.split(":")[0].split(" ")[1];
        const sets = line.split(":")[1].split(";")
        let setsArePossible: boolean = sets.map(elt => {
            let colorsArePossible = elt.trim().split(",").map(e => {
                let current = e.trim().split(" ");
                let currentColorIsPossible = ballsAvailable[current[1]] >= Number(current[0]);
                return currentColorIsPossible;
            });
            return (colorsArePossible.indexOf(false) < 0);
        }).filter(e => !e).length === 0;
        if (setsArePossible) {
            sumIds += Number(id);
        }
    }
    return sumIds;
}

function part2() {
    let sumPower = 0;

    lines.map(line => {
        let ballsNecessary: Record<string, number> = {
            "red": 0,
            "green": 0,
            "blue": 0
        }
        line.split(":")[1].trim().split(";").map(set => {
            set.trim().split(",").map(elt => {
                elt = elt.trim();
                const color = elt.split(" ")[1]
                const numb = Number(elt.split(" ")[0])

                if (ballsNecessary[color] < numb) {
                    ballsNecessary[color] = numb;
                }
            })
        });
        sumPower += (ballsNecessary["blue"] * ballsNecessary["green"] * ballsNecessary["red"]);
    });
    return sumPower;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
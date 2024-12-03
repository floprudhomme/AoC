import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    let mulList = content.match(/mul\(\d{1,3},\d{1,3}\)/g) || [];
    let res = 0;
    for (let mul of mulList) {
        let [value1, value2] = mul.match(/\d+/g)!.map((x) => parseInt(x));
        res += value1 * value2;
    }
    return res;
}

function part2() {
    let mulList = content.match(/(do\(\))|(mul\(\d{1,3},\d{1,3}\)|(don't\(\)))/g) || [];
    let res = 0;
    let enable = true;
    for (let mul of mulList) {
        if (mul === "do()") {
            enable = true;
            continue;
        } else if (mul === "don't()") {
            enable = false;
            continue;
        }
        if (enable) {
            let [value1, value2] = mul.match(/\d+/g)!.map((x) => parseInt(x));
            res += value1 * value2;
        }
    }
    return res;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
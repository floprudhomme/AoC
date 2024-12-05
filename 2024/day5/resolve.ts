import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

let rulesMap: Record<number, number[]> = {};

function isRightOrder(values: number[]): boolean {
    for (let i = 0 ; i < values.length ; i++) {
        let currentValue = values[i];
        for (let j = i + 1 ; j < values.length ; j++) {
            if (rulesMap[currentValue] === undefined || !rulesMap[currentValue].includes(values[j])) {
                return false;
            }
        }
    }
    return true;
}

function part1() {

    let [rules, orders] = content.split("\n\n");
    for (let rule of rules.split("\n")) {
        let [value1, value2] = rule.split("|").map((x) => parseInt(x));
        if (rulesMap[value1] === undefined) {
            rulesMap[value1] = [];
        }
        rulesMap[value1].push(value2);
    }
    let res = 0;
    for (let order of orders.split("\n")) {
        let values = order.split(",").map((x) => parseInt(x));
        let isOkay = isRightOrder(values);
        if (isOkay) {
            res += values[Math.floor(values.length / 2)];
        }
    }
    return res;
}

function part2() {
    let [rules, orders] = content.split("\n\n");
    for (let rule of rules.split("\n")) {
        let [value1, value2] = rule.split("|").map((x) => parseInt(x));
        if (rulesMap[value1] === undefined) {
            rulesMap[value1] = [];
        }
        rulesMap[value1].push(value2);
    }
    let res = 0;
    for (let order of orders.split("\n")) {
        let values = order.split(",").map((x) => parseInt(x));
        if (!isRightOrder(values)) {
            values.sort((a, b) => {
                return rulesMap[a]?.includes(b) ? -1 : 1;
            });
            res += values[Math.floor(values.length / 2)];
        }
    }
    return res;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
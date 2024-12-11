import fs from "fs";
import { transform } from "typescript";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    function transform(stones: number[]): number[] {
        let newStones: number[] = [];
        for (let i = 0 ; i < stones.length ; i++) {
            if (stones[i] === 0) {
                newStones.push(1);
            } else if (stones[i].toString().length % 2 === 0) {
                let currentNb = stones[i].toString();
                let nbLeft = parseInt(currentNb.substring(0, currentNb.length / 2));
                let nbRight = parseInt(currentNb.substring(currentNb.length / 2));
                newStones.push(nbLeft);
                newStones.push(nbRight);
            } else {
                newStones.push(stones[i] * 2024);
            }

        }
        return newStones;
    }

    let stones = content.split(" ").map((stone) => parseInt(stone));

    let blinkNb = 25;

    for (let i = 0 ; i < blinkNb ; i++) {
        stones = transform(stones);
    }
    return stones.length;
}

function part2() {
    let cache: Record<number, Record<number, number>> = {};
    let stones = content.split(" ").map((stone) => parseInt(stone));

    function transform(stoneValue: number, currentBlink: number = 0) {
        if (currentBlink === 75) {
            return 1;
        }
        if (cache[stoneValue] === undefined) {
            cache[stoneValue] = {};
        }
        if (cache[stoneValue][currentBlink] !== undefined) {
            return cache[stoneValue][currentBlink];
        }
        let result = 0;
        if (stoneValue === 0) {
            result = transform(1, currentBlink + 1);
        } else if (stoneValue.toString().length % 2 === 0 && stoneValue.toString().length > 0) {
            let currentNb = stoneValue.toString();
            let nbLeft = parseInt(currentNb.substring(0, currentNb.length / 2));
            let nbRight = parseInt(currentNb.substring(currentNb.length / 2));
            result = transform(nbLeft, currentBlink + 1) + transform(nbRight, currentBlink + 1);
        } else {
            result = transform(stoneValue * 2024, currentBlink + 1);
        }
        cache[stoneValue][currentBlink] = result;
        return result;
    }

    let count = 0;
    for (let i = 0 ; i < stones.length ; i++) {
        let currentStone = stones[i];
        count += transform(currentStone);
    }

    return count;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
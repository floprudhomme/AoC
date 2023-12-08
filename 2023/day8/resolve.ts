import fs from "fs";

const content = (await fs.promises.readFile("./input.txt", {
    encoding: "utf-8",
})).replaceAll("\r", "");

function part1() {
    const movement: string[] = content.split("\n\n")[0].split("");
    const map: Map<string, { "L": string, "R": string }> = new Map<string, { "L": string, "R": string }>();
    content.split("\n\n")[1].split("\n").forEach(
        elt => {
            const origin = elt.split("=")[0].trim();
            const LR = elt.split("=")[1].replaceAll(/\(|\)| /gm, "").split(",");
            map.set(origin, { "L": LR[0], "R": LR[1] });
        }
    );

    let count = 0;
    let currentPosition = "AAA";
    while (currentPosition != "ZZZ") {
        currentPosition = map.get(currentPosition)![(movement[count % movement.length] as "R" | "L")];
        count++;
    }

    return count;
}

function part2() {
    const calculateLCM = (...arr: number[]) => {
        const gcd2 = (a: number, b: number): number => {
           // Greatest common divisor of 2 integers
           if(!b) return b===0 ? a : NaN;
              return gcd2(b, a%b);
        };
        const lcm2 = (a: number, b: number): number => {
           // Least common multiple of 2 integers
           return a * b / gcd2(a, b);
        }
        // Least common multiple of a list of integers
        let n = 1;
        for(let i = 0; i < arr.length; ++i){
           n = lcm2(arr[i], n);
        }
        return n;
     };

    const movement: string[] = content.split("\n\n")[0].split("");
    const map: Map<string, { "L": string, "R": string }> = new Map<string, { "L": string, "R": string }>();
    let startingPosition: string[] = [];
    content.split("\n\n")[1].split("\n").forEach(
        elt => {
            const origin = elt.split("=")[0].trim();
            const LR = elt.split("=")[1].replaceAll(/\(|\)| /gm, "").split(",");
            map.set(origin, { "L": LR[0], "R": LR[1] });
            if (origin.endsWith("A")) {
                startingPosition.push(origin);
            }
        }
    );

    let count = 0;
    let loopPeriod: number[] = []

    for (let currentPosition of startingPosition) {
        count = 0;
        while (!currentPosition.endsWith("Z")) {
            currentPosition = map.get(currentPosition)![(movement[count % movement.length] as "R" | "L")];
            count++;
        }
        loopPeriod.push(count);
    }

    return calculateLCM(...loopPeriod);
}


console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());


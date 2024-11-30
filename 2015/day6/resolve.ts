import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {

    function applyCommand(cmd: "toggle"|"on"|"off", start: number[], end: number[]) {
        for (let i = start[0]; i <= end[0]; i++) {
            for (let j = start[1]; j <= end[1]; j++) {
                if (cmd === "toggle") {
                    table[i][j] = 1 - table[i][j];
                } else if (cmd === "on") {
                    table[i][j] = 1;
                } else {
                    table[i][j] = 0;
                }
            }
        }
    }

    let commands = content.split("\n");

    let table = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

    for (let command of commands) {
        let [start, end] = command.match(/\d+,\d+/g)!.map((x) => x.split(",").map((x) => parseInt(x)));
        let cmd = command.match(/toggle|on|off/)![0] as "toggle"|"on"|"off";
        applyCommand(cmd, start, end);
    }

    let count = 0;
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
            count += table[i][j];
        }
    }
    
    return count;
}

function part2() {
    function applyCommand(cmd: "toggle"|"on"|"off", start: number[], end: number[]) {
        for (let i = start[0]; i <= end[0]; i++) {
            for (let j = start[1]; j <= end[1]; j++) {
                if (cmd === "toggle") {
                    table[i][j] = table[i][j] + 2;
                } else if (cmd === "on") {
                    table[i][j] = table[i][j] + 1;
                } else {
                    table[i][j] = Math.max(table[i][j] - 1, 0);
                }
            }
        }
    }

    let commands = content.split("\n");

    let table = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

    for (let command of commands) {
        let [start, end] = command.match(/\d+,\d+/g)!.map((x) => x.split(",").map((x) => parseInt(x)));
        let cmd = command.match(/toggle|on|off/)![0] as "toggle"|"on"|"off";
        applyCommand(cmd, start, end);
    }

    let count = 0;
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
            count += table[i][j];
        }
    }
    
    return count;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
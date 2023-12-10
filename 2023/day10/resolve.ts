import fs from "fs";

const content = (await fs.promises.readFile("./input.txt", {
    encoding: "utf-8",
})).replaceAll("\r", "");

type Position = {
    x: number,
    y: number
}

function transformStart(x: number, y: number): string {
    let accessibleTubes: string[] = [];
    if (x !== 0) {
        // check left
        if (board[y][x - 1] === "F" || board[y][x - 1] === "L" || board[y][x - 1] === "-") {
            accessibleTubes.push("LEFT");
        }
    }
    if (x !== board[y].length - 1) {
        // check right
        if (board[y][x + 1] === "J" || board[y][x + 1] === "7" || board[y][x + 1] === "-") {
            accessibleTubes.push("RIGHT");
        }
    }
    if (y !== 0) {
        // check top
        if (board[y - 1][x] === "F" || board[y - 1][x] === "7" || board[y - 1][x] === "|") {
            accessibleTubes.push("TOP");
        }
    }
    if (y !== board.length - 1) {
        // check bottom
        if (board[y + 1][x] === "J" || board[y + 1][x] === "L" || board[y + 1][x] === "|") {
            accessibleTubes.push("BOTTOM");
        }
    }

    if (accessibleTubes.includes("TOP") && accessibleTubes.includes("RIGHT")) {
        return "L";
    } else if (accessibleTubes.includes("TOP") && accessibleTubes.includes("BOTTOM")) {
        return "|";
    } else if (accessibleTubes.includes("TOP") && accessibleTubes.includes("LEFT")) {
        return "J";
    } else if (accessibleTubes.includes("RIGHT") && accessibleTubes.includes("BOTTOM")) {
        return "F";
    } else if (accessibleTubes.includes("RIGHT") && accessibleTubes.includes("LEFT")) {
        return "-";
    } else if (accessibleTubes.includes("BOTTOM") && accessibleTubes.includes("LEFT")) {
        return "7";
    }
    return "S";
}

let board = content.split("\n").map(line => line.split(""));
let lines = content.split("\n");

let countStep = content.split("\n").map(line => line.split("").map(c => -1));

const startPosition: Position = { x: -1, y: -1 };
for (let y = 0; y < lines.length; y++) {
    let currentLine = lines[y].split("");
    for (let x = 0; x < currentLine.length; x++) {
        if (currentLine[x] === "S") {
            startPosition.x = x;
            startPosition.y = y;
            board[y][x] = transformStart(x, y);
            break;
        }
    }
}

function pretty() {
    for (let i = 0; i < board.length; i++) {
        let line = "";
        for (let j = 0; j < board[i].length; j++) {
            line += board[i][j];
        }
        console.log(
            line
                .replaceAll('|', '│')
                .replaceAll('-', '─')
                .replaceAll('L', '└')
                .replaceAll('J', '┘')
                .replaceAll('7', '┐')
                .replaceAll('F', '┌')
                .replaceAll('S', '█')
        )
    }
}


function part1() {
    

    move(startPosition.x, startPosition.y);

    function move(x: number, y: number, currentStepCount = 0): void {
        if (countStep[y][x] !== -1 && currentStepCount > countStep[y][x]) {
            return;
        }
        countStep[y][x] = currentStepCount;
        if (board[y][x] === "L") {
            move(x + 1, y, currentStepCount + 1);
            move(x, y - 1, currentStepCount + 1);
        } else if (board[y][x] === "|") {
            move(x, y - 1, currentStepCount + 1);
            move(x, y + 1, currentStepCount + 1);
        } else if (board[y][x] === "J") {
            move(x - 1, y, currentStepCount + 1);
            move(x, y - 1, currentStepCount + 1);
        } else if (board[y][x] === "F") {
            move(x + 1, y, currentStepCount + 1);
            move(x, y + 1, currentStepCount + 1);
        } else if (board[y][x] === "-") {
            move(x - 1, y, currentStepCount + 1);
            move(x + 1, y, currentStepCount + 1);
        } else if (board[y][x] === "7") {
            move(x - 1, y, currentStepCount + 1);
            move(x, y + 1, currentStepCount + 1);
        }
    }

    let max = 0;

    for (let i = 0; i < countStep.length; i++) {
        for (let j = 0; j < countStep[i].length; j++) {
            if (max < countStep[i][j]) {
                max = countStep[i][j];
            }
        }
    }


    return max;
}

function part2() {
    let sum = 0;

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (countStep[y][x] === -1) {
                board[y][x] = ".";
            }
        }
    }

    function getVerticalTubesCountToLeft(x: number, y: number): number {
        const verticalTubes: string[] = ["|", "L", "J"]; // Can be | L J OR | 7 F. S has been replaced by the right value.
        let nbVertical = 0;
        for (let idx = 0 ; idx < x ; idx++) {
            if (verticalTubes.includes(board[y][idx])) {
                nbVertical++;
            }
        }
        return nbVertical;
    }
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] === ".") {
                if (getVerticalTubesCountToLeft(x, y) % 2 === 1) {
                    sum += 1;
                    board[y][x] = "I";
                }
            }
        }
    }

    return sum;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());


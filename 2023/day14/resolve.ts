import fs from "fs";

const content = (await fs.promises.readFile("./input.txt", {
    encoding: "utf-8",
})).replaceAll("\r", "");

function log(board: string[][]) {
    let line = "";
    for (let y = 0 ; y < board.length ; y++) {
        for (let x = 0 ; x < board[y].length ; x++) {
            line += board[y][x];
        }
        line += "\n";
    }
    console.log(line);
}

function part1() {
    let sum = 0;
    let board = content.split("\n").map(elt => elt.split(""));
    log(board);
    for (let y = 0 ; y < board.length ; y++) {
        for (let x = 0 ; x < board[y].length ; x++) {
            if (board[y][x] === "O") {
                let up = y - 1;
                while (up >= 0 && board[up][x] === ".") {
                    board[up][x] = "O";
                    board[up + 1][x] = ".";
                    up--;
                }
            }
        }
    }
    for (let y = 0 ; y < board.length ; y++) {
        for (let x = 0 ; x < board[y].length ; x++) {
            if (board[y][x] === "O") {
                sum += board.length - y;
            }
        }
    }
    log(board);
    return sum;
}

function part2() {
    function transpose(currentBoard: string[][]): string[][] {
        return currentBoard[0].map((_, colIndex) => currentBoard.map(row => row[colIndex]))
    }
    function goUp(currentBoard: string[][]) {
        for (let y = 0 ; y < currentBoard.length ; y++) {
            for (let x = 0 ; x < currentBoard[y].length ; x++) {
                if (currentBoard[y][x] === "O") {
                    let up = y - 1;
                    while (up >= 0 && currentBoard[up][x] === ".") {
                        currentBoard[up][x] = "O";
                        currentBoard[up + 1][x] = ".";
                        up--;
                    }
                }
            }
        }
        return currentBoard;
    }

    function doOneCycle() {
        board = goUp(board);
        board = transpose(goUp(transpose(board)));
        board = goUp(board.reverse()).reverse();
        board = transpose(goUp(transpose(board.map(elt => elt.reverse())))).map(elt => elt.reverse());
    }

    let sum = 0;
    let board = content.split("\n").map(elt => elt.split(""));
    let posStr: string[] = [];
    let currentStr: string = "";
    for (let y = 0 ; y < board.length ; y++) {
        for (let x = 0 ; x < board[y].length ; x++) {
            if (board[y][x] === "O") {
                currentStr += y + x;
            }
        }
    }
    let i = 0;
    let idxBeginLoop = -1;
    posStr.push(currentStr);
    while (true) {
        doOneCycle();
        i++;
        currentStr = "";
        for (let y = 0 ; y < board.length ; y++) {
            for (let x = 0 ; x < board[y].length ; x++) {
                if (board[y][x] === "O") {
                    currentStr += y + x;
                }
            }
        }
        if (posStr.includes(currentStr)) {
            idxBeginLoop = posStr.indexOf(currentStr);
            break;
        }
        posStr.push(currentStr);
    }
    let loopDuration = i - idxBeginLoop;
    let stay = (1000000000 - idxBeginLoop) % loopDuration;
    for (let j = 0 ; j < stay ; j++) {
        doOneCycle();
    }

    for (let y = 0 ; y < board.length ; y++) {
        for (let x = 0 ; x < board[y].length ; x++) {
            if (board[y][x] === "O") {
                sum += board.length - y;
            }
        }
    }
    
    return sum;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());

